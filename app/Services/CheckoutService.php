<?php

namespace App\Services;

use App\Helpers\CheckoutHelper;
use App\Helpers\DataFieldsHelper;
use App\Helpers\WerbService;
use App\Models\AosProducts;

class CheckoutService
{
    protected $orderId;
    protected $orderData = [
        'note' => '',
        'subtotal' => 0,
        'taxAmount' => 0,
        'total' => 0,
        'paymentMethod' => '',
        'items' => [],
    ];
    protected $userData = [
        'id' => '',
        'name' => '',
    ];
    protected $userAddress = [
        'id' => '',
    ];
    protected $itemData;

    protected $paymentMethod;
    protected $sessionId;
    protected $aosInvoicesService;

    public function __construct()
    {
        $this->orderId = null;
        $this->aosInvoicesService = new AOS_InvoicesService();
    }

    /**
     * Guarda una orden completa en el servicio web
     *
     * @param array $orderData Datos de la orden
     * @param array $userData Datos del usuario
     * @param array $userAddress Datos de dirección
     * @param string $paymentMethod Método de pago
     * @param string $sessionId ID de sesión de Stripe
     * @return string ID de la orden creada
     * @throws \Exception Si falla la operación
     */
    public function saveOrder($orderData, $userData, $userAddress, $paymentMethod, $sessionId = null)
    {
        try {
            $this->orderData = $orderData;
            $this->userData = $userData;
            $this->userAddress = $userAddress;
            $this->paymentMethod = $paymentMethod;
            $this->sessionId = $sessionId;
            $this->itemData = $this->getItemData($orderData['items']);

            $totals = CheckoutHelper::calculateOrderTotals($this->itemData);
            $this->orderData['subtotal'] = $totals['subtotal'];
            $this->orderData['taxAmount'] = $totals['tax-amount'];
            $this->orderData['total'] = $totals['total'];

            $fields = [
                'id' => '',
                'description' => $this->orderData['note'],
                'billing_account_id' => $this->userData['id'],
                'tipo_c' => 'Contado',
                'total_amt' => $this->orderData['subtotal'],
                'subtotal_amount' => $this->orderData['subtotal'],
                'discount_amount' => 0,
                'tax_amount' => $this->orderData['taxAmount'],
                'shipping_amount' => '',
                'total_amount' => $this->orderData['total'],
                'currency_id' => '-99',
                'almacendeventa_c' => config('app.store_1'),
                'cwe_cuentaweberp_id_c' => config('app.company_1_id'),
                'tipodecambio_c' => '1',
                'invoice_date' => date('Y-m-d', strtotime(config('app.less_hours_server') . ' hours')),
                'status' => $this->paymentMethod == 'Transfer' ? 'CuentaXLiquidar' : 'Liquidada',
                'saldopendiente_c' => $this->paymentMethod == 'Transfer' ? $this->orderData['total'] : 0,
                'tipodemoneda_c' => 'MN',
                'fechacompentrega_c' => date('Y-m-d', strtotime(config('app.less_hours_server') . ' hours')),
                'cancelar_c' => '0',
                'estatus_envio_c' => 'PREPARANDO',
                'de02_direccsenvio_id_c' => $this->userAddress['id'],
                'stripe_session_id_c' => $this->sessionId,
            ];

            $dataFields = DataFieldsHelper::buildDataFieldsArray($fields);
            $this->orderId = WerbService::saveDataWebService('AOS_Invoices', $dataFields);

            if (!$this->orderId) {
                throw new \Exception('Error al guardar la orden en el servicio web.');
            }

            $this->saveItemOrder($this->itemData);

            if ($this->paymentMethod !== 'Transfer') {
                $this->savePayment();
            }

            $this->pushOrderEcommerce();
            $this->updateOrderEcommerce();

            return $this->orderId;
        } catch (\Exception $e) {
            throw new \Exception('Error en CheckoutService::saveOrder: ' . $e->getMessage(), 0, $e);
        }
    }

    /**
     * Guarda los items de una orden
     *
     * @param array $items Items a guardar
     * @return void
     * @throws \Exception Si falla la operación
     */
    private function saveItemOrder($items)
    {
        foreach ($items as $item) {
            $fields = [
                'id' => '',
                'name' => $item['code'],
                'part_number' => $item['name'],
                'description' => $item['item_id'] == '0' ? $item['code'] : '',
                'product_qty' => $item['quantity'],
                'product_cost_price' => $item['price'],
                'product_list_price' => $item['price'],
                'product_discount' => 0,
                'product_discount_amount' => 0,
                'discount' => 'Percentage',
                'descuentoporclase' => 0,
                'product_unit_price' => $item['price'],
                'vat_amt' => $item['tax-amount'],
                'product_total_price' => $item['subtotal'],
                'vat' => $item['tax'],
                'parent_type' => 'AOS_Invoices',
                'product_id' => $item['item_id'],
                'parent_id' => $this->orderId,
                'currency_id' => 'MXN',
                'category' => $item['category'],
                'preciovendido' => $item['price'],
                'clavesat' => $item['clavesat'],
                'claveunidadsat' => $item['claveunidadsat'],
                'objeto_impuesto' => $item['tax-amount'] > 0 ? '02' : '01',
            ];

            $dataFields = DataFieldsHelper::buildDataFieldsArray($fields);
            WerbService::saveDataWebService('AOS_Products_Quotes', $dataFields);
        }
    }

    /**
     * Guarda el pago de una orden
     *
     * @return void
     * @throws \Exception Si falla la operación
     */
    private function savePayment()
    {
        $fields = [
            'id' => '',
            'pago' => $this->orderData['total'],
            'ts00_tesoreria_id_c' => config('app.bank_account'),
            'referencia' => 'Ecommerce: Venta #' . $this->orderId,
            'fecha_pago' => date('Y-m-d', strtotime(config('app.less_hours_server') . ' hours')),
            'forma_pago' => $this->paymentMethod == 'Transfer' ? '03' : '04',
            'monedapoliza' => 'MXN',
            'remisionesaplicadas' => $this->orderId,
            'cuentasaplicadas' => $this->userData['name'],
            'aos_invoices_id_c' => $this->orderId,
            'tipodecambio_c' => '1',
        ];

        $dataFields = DataFieldsHelper::buildDataFieldsArray($fields);
        $idPayment = WerbService::saveDataWebService('IV12_PolizadeCobros1', $dataFields);

        if ($idPayment) {
            $this->savePaymentDetail($idPayment);
        }
    }

    /**
     * Guarda el detalle del pago
     *
     * @param string $idPayment ID del pago
     * @return void
     * @throws \Exception Si falla la operación
     */
    private function savePaymentDetail($idPayment)
    {
        $fields = [
            'id' => '',
            'idpadre' => $idPayment,
            'tipodedocumento' => 'PolizadeCobro',
            'foliopoliza' => '',
            'saldopendiente' => $this->orderData['total'],
            'monedadocumento' => 'MXN',
            'tipodecambio' => '1',
            'montoasignado' => $this->orderData['total'],
            'idctaprov' => $this->userData['id'],
            'nombrectaprov' => $this->userData['name'],
            'monedapoliza' => 'MXN',
            'fechadepago' => date('Y-m-d', strtotime(config('app.less_hours_server') . ' hours')),
            'idcompraventa' => $this->orderId,
            'namecompraventa' => '',
            'orden' => '1',
            'montoingreso' => $this->orderData['total'],
            'account_id_c' => $this->userData['id'],
            'ts00_tesoreria_id_c' => config('app.bank_account'),
            'totalrem' => $this->orderData['total'],
            'tipoventa' => 'Contado',
        ];

        try {
            $venta = $this->aosInvoicesService->getOrderById($this->orderId);
            $venta = DataFieldsHelper::parseDataFieldsArray($venta);
            $fields['namecompraventa'] = $venta['name'] ?? '';
        } catch (\Exception $e) {
            // Continúa el proceso sin asignar el nombre si falla
            $fields['namecompraventa'] = '';
        }

        $dataFields = DataFieldsHelper::buildDataFieldsArray($fields);
        WerbService::saveDataWebService('IV12_PartidasPolCobroyPago', $dataFields);
    }

    /**
     * Procesa los items del carrito para la orden
     *
     * @param array $items Items del carrito
     * @return array Items procesados
     * @throws \Exception Si falla la operación
     */
    private function getItemData($items)
    {
        $itemData = [];
        $total = 0;

        foreach ($items as $item) {
            try {
                $product = AosProducts::with('custom')->find($item['id']);

                if (!$product) {
                    throw new \Exception('Producto no encontrado: ' . $item['id']);
                }

                // Validar que tasa_iva_c no sea NULL, usar 0 como valor por defecto
                $taxRate = (float) ($product->tasa_iva_c ?? 0);

                $priceInfo = CheckoutHelper::calculatePriceInfo($product->toArray());
                $price = $priceInfo['price_without_tax'];
                $totals = CheckoutHelper::calculateTotalItem($price, $item['quantity'], $taxRate);

                $itemData[] = [
                    'item_id' => $product->id,
                    'code' => $product->name,
                    'name' => $product->part_number,
                    'category' => $product->category,
                    'clavesat' => $product->clavesat_c,
                    'claveunidadsat' => $product->claveunidadsat_c,
                    'mark' => $product->marca_c,
                    'quantity' => $item['quantity'],
                    'price' => $price,
                    'tax' => $taxRate,
                    'tax-amount' => $totals['tax-amount'],
                    'subtotal' => $totals['subtotal'],
                    'total' => $totals['total'],
                    'type' => 'product',
                ];

                $total += $totals['total'];
            } catch (\Exception $e) {
                throw new \Exception('Error al procesar item: ' . $e->getMessage(), 0, $e);
            }
        }

        $shippingCost = CheckoutHelper::shippingCost($total);
        if ($shippingCost > 0) {
            $itemData[] = $this->addShippingCost($shippingCost);
        }

        return $itemData;
    }

    /**
     * Agrega el costo de envío como item
     *
     * @param float $shippingCost Costo de envío
     * @return array Item de envío
     */
    private function addShippingCost($shippingCost)
    {
        $porcentageTax = config('app.tax_shipping') / 100;
        $price = round($shippingCost / (1 + $porcentageTax), 2);
        $totals = CheckoutHelper::calculateTotalItem($price, 1, config('app.tax_shipping'));

        return [
            'item_id' => '0',
            'code' => 'Servicio de envío',
            'name' => 'Envio',
            'category' => '',
            'clavesat' => '',
            'claveunidadsat' => '',
            'quantity' => 1,
            'price' => $price,
            'tax' => config('app.tax_shipping'),
            'tax-amount' => $totals['tax-amount'],
            'subtotal' => $totals['subtotal'],
            'total' => $totals['total'],
            'type' => 'shipping',
        ];
    }

    /**
     * Marca la orden como enviada desde ecommerce
     *
     * @return void
     * @throws \Exception Si falla la operación
     */
    private function pushOrderEcommerce()
    {
        $dataFields = DataFieldsHelper::buildDataFieldsArray([
            'id' => $this->orderId,
            'ecommerce_c' => '1',
        ]);

        WerbService::saveDataWebService('AOS_Invoices', $dataFields);
    }

    /**
     * Actualiza la orden con el backup de ecommerce
     *
     * @return void
     * @throws \Exception Si falla la operación
     */
    private function updateOrderEcommerce()
    {
        $dataFields = DataFieldsHelper::buildDataFieldsArray([
            'id' => $this->orderId,
            'ecommercebkp_c' => '1',
        ]);

        WerbService::saveDataWebService('AOS_Invoices', $dataFields);
    }
}
