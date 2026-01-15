<?php

namespace App\Http\Controllers;

use App\Helpers\DataFieldsHelper;
use App\Services\AOS_InvoicesService;
use App\Services\CartService;
use App\Services\CheckoutService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class CheckoutController extends Controller
{
    public function __construct(
        private CartService $cartService,
    ) {}

    /**
     * Muestra la página de checkout para que el usuario pueda finalizar su compra.
     *
     * @return \Illuminate\Http\Response
     */
    public function checkout()
    {
        try {
            \Stripe\Stripe::setApiKey(env('STRIPE_SECRET_KEY'));

            $products = $this->cartService->getItems()->map(static function ($item) {
                return [
                    'part_number' => $item->product->part_number,
                    'price' => $item->product->price,
                    'quantity' => $item->quantity,
                    'custom' => $item->product->custom,
                ];
            });

            $lineItems = [];
            $totalPrice = 0;

            foreach ($products as $product) {
                $productData = [
                    'name' => $product['part_number'],
                ];

                if (!empty($product['custom']['url_imagen'])) {
                    $productData['images'] = [$product['custom']['url_imagen']];
                }

                $lineItems[] = [
                    'price_data' => [
                        'currency' => 'mxn',
                        'product_data' => $productData,
                        'unit_amount' => $product['price'] * 100,
                    ],
                    'quantity' => $product['quantity'],
                ];

                $totalPrice += $product['price'] * $product['quantity'];
            }

            if (empty($lineItems)) {
                return redirect()->back()->withErrors(['error' => 'Tu carrito está vacío']);
            }

            $session = \Stripe\Checkout\Session::create([
                'line_items' => $lineItems,
                'mode' => 'payment',
                'success_url' => route('checkout.success', [], true) . '?session_id={CHECKOUT_SESSION_ID}',
                'cancel_url' => route('checkout.cancel', [], true),
            ]);

            return response()->json(['url' => $session->url]);
        } catch (\Exception $e) {
            Log::error('Stripe Checkout Error: ' . $e->getMessage());
            return redirect()
                ->back()
                ->withErrors([
                    'error' => 'Error al iniciar el proceso de pago. Por favor, intenta nuevamente más tarde.',
                ]);
        }
    }

    /**
     * Maneja la lógica para mostrar la página de éxito después de completar el proceso de checkout.
     *
     * @param \Illuminate\Http\Request $request La solicitud HTTP recibida.
     * @return \Illuminate\Http\Response
     */
    public function success(Request $request)
    {
        try {
            \Stripe\Stripe::setApiKey(env('STRIPE_SECRET_KEY'));
            $sessionId = $request->get('session_id');

            if (!$sessionId) {
                throw new NotFoundHttpException('ID de sesión no proporcionado');
            }

            $session = \Stripe\Checkout\Session::retrieve($sessionId);
            if (!$session) {
                throw new NotFoundHttpException('Sesión de pago no encontrada');
            }

            // Guardar la orden en el sistema ERP
            $orderId = $this->saveOrderAfterPayment($session);

            $this->cartService->clearCart();

            $order = (new AOS_InvoicesService())->getOrderById($orderId);
            $order = DataFieldsHelper::parseDataFieldsArray($order->name_value_list);
            $order['amount_total'] = $session->amount_total / 100;

            return Inertia::render('products/checkout-success', [
                'customerEmail' => $session->customer_details?->email,
                'sessionId' => $sessionId,
                'order' => $order,
            ]);
        } catch (\Exception $e) {
            Log::error('Checkout Success Error: ' . $e->getMessage());
            throw new NotFoundHttpException('Error al procesar el pago completado');
        }
    }

    /**
     * Guarda la orden en el sistema ERP después de confirmar el pago en Stripe
     *
     * @param \Stripe\Checkout\Session $session Sesión de pago de Stripe
     * @return void
     * @throws \Exception Si falla al guardar la orden
     */
    private function saveOrderAfterPayment($session)
    {
        try {
            $user = Auth::user();
            $cartItems = $user->cart->items()->with('product')->get();

            if ($cartItems->isEmpty()) {
                redirect()
                    ->route('dashboard.orders')
                    ->withErrors('No se encontraron artículos en el carrito para procesar la orden.');
            }

            // Preparar datos de la orden
            $orderData = [
                'note' => 'Pago desde el ecommerce con Stripe. Session ID: ' . $session->id,
                'subtotal' => 0,
                'taxAmount' => 0,
                'total' => $session->amount_total / 100, // Convertir de centavos a pesos
                'paymentMethod' => 'Stripe', // O el que corresponda
                'items' => $cartItems->map(static function ($item) {
                    return [
                        'id' => $item->product_id,
                        'quantity' => $item->quantity,
                    ];
                })->toArray(),
            ];

            // Datos del usuario
            $userData = [
                'id' => '9e3747fb-a9fe-1486-bcbd-665e2de0abb0', // ID temporal hasta integrar usuarios ERP
                'name' => 'DEMO EMPRESISTEMAS 01', // Nombre temporal hasta integrar usuarios ERP
            ];

            // Dirección de envío
            $userAddress = [
                'id' => $user->address->id ?? '',
            ];

            // Guardar la orden
            $checkoutService = new CheckoutService();
            $orderId = $checkoutService->saveOrder(
                $orderData,
                $userData,
                $userAddress,
                $orderData['paymentMethod'],
                $session->id,
            );

            if (!$orderId) {
                throw new \Exception('Error al guardar la orden en el sistema');
            }

            Log::info('Orden guardada exitosamente: ' . $orderId);

            return $orderId;
        } catch (\Exception $e) {
            Log::error('Error saving order after payment: ' . $e->getMessage());
            throw $e;
        }
    }

    /**
     * Maneja el evento de cancelación de compra
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function cancel(Request $request)
    {
        $sessionId = $request->get('session_id');

        return Inertia::render('products/checkout-cancel', [
            'message' => 'Tu proceso de compra ha sido cancelado. Los artículos en tu carrito aún están guardados.',
            'sessionId' => $sessionId,
        ]);
    }
}
