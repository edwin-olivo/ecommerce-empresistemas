<?php

/**
 * Controlador para gestión del carrito de compras
 */

class CartController extends Controller
{

    /**
     * Muestra el carrito de compras
     */
    public function index()
    {
        $data = [
            'title' => 'Carrito de Compras - ' . APP_NAME,
            'pageClass' => 'cart-page'
        ];

        $this->view('cart/index', $data);
    }

    /**
     * Retorna los datos del carrito (AJAX)
     */
    public function get()
    {
        try {
            if (!$this->isAjax()) {
                http_response_code(405);
                $this->json(['error' => 'Método no permitido'], 405);
                return;
            }

            // Aquí se obtendrían los datos del carrito
            $productService = new ProductService();
            $cartRaw = $_POST['cartData'] ?? file_get_contents('php://input');

            // return $this->json($cartRaw);

            $cartDataInput = json_decode($cartRaw, true);

            // echo var_dump($cartDataInput);

            $items = [];
            $total = 0.00;

            if (is_array($cartDataInput) && isset($cartDataInput['cartData'])) {
                foreach ($cartDataInput['cartData'] as $cartItem) {
                    $productId = $cartItem['productId'] ?? null;
                    $quantity = $cartItem['quantity'] ?? 1;

                    if ($productId && $quantity > 0) {
                        $product = $productService->getProductById($productId);
                        if ($product) {
                            $productPrice = 0;

                            if ($product['promo_price'] && $product['promo_price'] > 0) {
                                $productPrice = $product['promo_price'];
                            } else if($product['sale_price'] && $product['sale_price'] > 0) {
                                $productPrice = $product['sale_price'];
                            } else {
                                $productPrice = $product['price'];
                            }

                            $itemTotal = $productPrice * $quantity;

                            $items[] = [
                                'id' => $product['id'],
                                'name' => $product['name'],
                                'price' => $productPrice * 1,
                                'image_url' => "", // $product['image_url'],
                                'quantity' => $quantity,
                                'subtotal' => $itemTotal,
                                'stock' => ($product['stock'] ?? 99)
                            ];
                            $total += $itemTotal;
                        }
                    }
                }
            }

            $cartData = [
                'success' => true,
                'items' => $items,
                'count' => count($items),
                'subtotal' => round($total, 2),
                'total' => round($total, 2)
            ];

            $this->json($cartData);
        } catch (Exception $e) {
            error_log("Error en CartController::get: " . $e->getMessage());
            $this->json(['error' => 'Error interno del servidor'], 500);
        }
    }

    /**
     * Agrega un producto al carrito (AJAX)
     */
    public function add()
    {
        try {
            if (!$this->isAjax()) {
                http_response_code(405);
                $this->json(['error' => 'Método no permitido'], 405);
                return;
            }

            $input = json_decode(file_get_contents('php://input'), true);
            $productId = $input['productId'] ?? null;
            $quantity = $input['quantity'] ?? 1;

            if (!$productId || $quantity < 1) {
                $this->json(['error' => 'Datos inválidos'], 400);
                return;
            }

            // Verificar que el producto existe
            $productService = new ProductService();
            $product = $productService->getProductById($productId);

            if (!$product) {
                $this->json(['error' => 'Producto no encontrado'], 404);
                return;
            }

            if ($product['stock'] < $quantity) {
                $this->json(['error' => 'Stock insuficiente'], 400);
                return;
            }

            $this->json([
                'success' => true,
                'message' => 'Producto agregado al carrito',
                'product' => [
                    'id' => $product['id'],
                    'name' => $product['name'],
                    'price' => $product['price'],
                    'image_url' => $product['image_url']
                ]
            ]);
        } catch (Exception $e) {
            error_log("Error en CartController::add: " . $e->getMessage());
            $this->json(['error' => 'Error interno del servidor'], 500);
        }
    }

    /**
     * Remueve un producto del carrito (AJAX)
     */
    public function remove()
    {
        try {
            if (!$this->isAjax()) {
                http_response_code(405);
                $this->json(['error' => 'Método no permitido'], 405);
                return;
            }

            $input = json_decode(file_get_contents('php://input'), true);
            $productId = $input['productId'] ?? null;

            if (!$productId) {
                $this->json(['error' => 'ID de producto requerido'], 400);
                return;
            }

            $this->json([
                'success' => true,
                'message' => 'Producto eliminado del carrito'
            ]);
        } catch (Exception $e) {
            error_log("Error en CartController::remove: " . $e->getMessage());
            $this->json(['error' => 'Error interno del servidor'], 500);
        }
    }

    /**
     * Actualiza cantidad de un producto en el carrito (AJAX)
     */
    public function update()
    {
        try {
            if (!$this->isAjax()) {
                http_response_code(405);
                $this->json(['error' => 'Método no permitido'], 405);
                return;
            }

            $input = json_decode(file_get_contents('php://input'), true);
            $productId = $input['productId'] ?? null;
            $quantity = $input['quantity'] ?? null;

            if (!$productId || $quantity === null || $quantity < 0) {
                $this->json(['error' => 'Datos inválidos'], 400);
                return;
            }

            $this->json([
                'success' => true,
                'message' => 'Carrito actualizado'
            ]);
        } catch (Exception $e) {
            error_log("Error en CartController::update: " . $e->getMessage());
            $this->json(['error' => 'Error interno del servidor'], 500);
        }
    }
}
