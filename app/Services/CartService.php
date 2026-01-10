<?php

namespace App\Services;

use App\Helpers\CheckoutHelper;
use App\Models\AosProducts;
use App\Models\CartItem;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;

class CartService
{
    /**
     * Obtiene el número total de items en el carrito.
     */
    public function getCartItemCount(): int
    {
        $cartCount = 0;

        $items = $this->getItems();
        foreach ($items as $item) {
            $cartCount += $item->quantity;
        }

        return $cartCount;
    }

    /**
     * Obtiene los items del carrito con sus productos asociados.
     */
    public function getItems(): Collection
    {
        if (Auth::check()) {
            $cart = Auth::user()->cart;

            if ($cart) {
                $items = $cart->items()->with('product')->get();
                // Filtrar items con producto válido
                return $items->filter(static function ($item) {
                    return $item->product !== null;
                });
            }

            return collect([]);
        }

        return $this->getSessionCartItems();
    }

    /**
     * Obtiene los items del carrito de sesión.
     */
    private function getSessionCartItems(): Collection
    {
        $sessionCart = session()->get('cart', []);

        if (empty($sessionCart)) {
            return collect([]);
        }

        $productIds = array_keys($sessionCart);
        $products = AosProducts::whereIn('id', $productIds)->get()->keyBy('id');

        $items = [];
        foreach ($sessionCart as $productId => $item) {
            if (!isset($products[$productId])) {
                continue;
            }

            $product = $products[$productId];
            $quantity = $item['quantity'];
            $items[] = new CartItem([
                'product_id' => $product->id,
                'quantity' => $quantity,
                'product' => $product,
            ]);
        }

        return collect($items);
    }

    /**
     * Agrega un producto al carrito.
     */
    public function addProduct(AosProducts $product)
    {
        if (Auth::check()) {
            $this->addToAuthenticatedCart($product);
        } else {
            $this->addToSessionCart($product);
        }
    }

    /**
     * Agrega un producto al carrito de usuario autenticado.
     */
    private function addToAuthenticatedCart(AosProducts $product)
    {
        $cart = Auth::user()->cart()->firstOrCreate([]);

        $cartItem = $cart->items()->where('product_id', $product->id)->first();

        if ($cartItem) {
            $cartItem->increment('quantity');
        } else {
            $cart->items()->create([
                'product_id' => $product->id,
                'quantity' => 1,
            ]);
        }
    }

    /**
     * Agrega un producto al carrito de sesión.
     */
    private function addToSessionCart(AosProducts $product)
    {
        $cart = session()->get('cart', []);

        if (isset($cart[$product->id])) {
            $cart[$product->id]['quantity']++;
        } else {
            $cart[$product->id] = [
                'product_id' => $product->id,
                'quantity' => 1,
            ];
        }

        session()->put('cart', $cart);
    }

    /**
     * Actualiza la cantidad de un producto en el carrito.
     */
    public function updateQuantity($itemId, int $quantity)
    {
        $quantity = max(1, $quantity); // Asegura que la cantidad sea al menos 1

        if (Auth::check()) {
            $cart = Auth::user()->cart;
            if ($cart) {
                $cartItem = $cart->items()->where('id', $itemId)->first();
                if ($cartItem) {
                    $cartItem->update(['quantity' => $quantity]);
                }
            }
        } else {
            $cart = session()->get('cart', []);

            if (isset($cart[$itemId])) {
                $cart[$itemId]['quantity'] = $quantity;
                session()->put('cart', $cart);
            }
        }
    }

    /**
     * Elimina un producto del carrito.
     */
    public function removeProduct($itemId)
    {
        if (Auth::check()) {
            $cart = Auth::user()->cart;
            if ($cart) {
                $cartItem = $cart->items()->where('id', $itemId)->first();
                if ($cartItem) {
                    $cartItem->delete();
                }
            }
        } else {
            $cart = session()->get('cart', []);

            if (isset($cart[$itemId])) {
                unset($cart[$itemId]);
                session()->put('cart', $cart);
            }
        }
    }

    /**
     * Vacía el carrito completamente.
     */
    public function clearCart()
    {
        if (Auth::check()) {
            $cart = Auth::user()->cart;
            if ($cart) {
                $cart->items()->delete();
            }
        } else {
            session()->forget('cart');
        }
    }

    /**
     * Calcula los totales del carrito.
     *
     * @return array
     */
    public function calculateTotals(): array
    {
        $items = $this->getItems();
        $itemTotals = [];

        foreach ($items as $item) {
            $price = $item->product->price;
            $quantity = $item->quantity;
            $itemTotals[] = CheckoutHelper::calculateTotalItem($price, $quantity, config('app.tax_shipping'));
        }

        $orderTotals = CheckoutHelper::calculateTotals($itemTotals);
        $subtotal = $orderTotals['subtotal'];
        $tax = $orderTotals['tax-amount'];
        $total = $orderTotals['total'];

        // Calcular el costo de envío
        $shipping = CheckoutHelper::shippingCost($total);
        $grandTotal = $total + $shipping;

        return [
            'subtotal' => $subtotal,
            'tax' => $tax,
            'shipping' => $shipping,
            'total' => $grandTotal,
        ];
    }

    /**
     * Fusiona el carrito de sesión con el carrito autenticado.
     * Se ejecuta cuando un usuario se autentica después de tener items en sesión.
     */
    public function mergeSessionCart()
    {
        if (!Auth::check()) {
            return;
        }

        $sessionCart = session()->get('cart', []);

        if (empty($sessionCart)) {
            return;
        }

        $cart = Auth::user()->cart()->firstOrCreate([]);

        foreach ($sessionCart as $productId => $sessionItem) {
            $existingItem = $cart->items()->where('product_id', $productId)->first();

            if ($existingItem) {
                // Si el item ya existe, sumamos las cantidades
                $existingItem->increment('quantity', $sessionItem['quantity']);
            } else {
                // Lo agregamos como nuevo item
                $cart->items()->create([
                    'product_id' => $productId,
                    'quantity' => $sessionItem['quantity'],
                ]);
            }
        }

        // Limpiar el carrito de sesión después de combinar
        session()->forget('cart');
    }
}
