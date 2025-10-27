<?php

namespace App\Http\Controllers;

use App\Http\Requests\CartItemRequest;
use App\Models\AosProducts;
use App\Models\CartItem;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CartController extends Controller
{
    /**
     * Muestra la vista del carrito.
     */
    public function index()
    {
        $cartItems = [];
        $total = 0;

        if (Auth::check()) {
            $cart = Auth::user()->cart;
            if ($cart) {
                $cartItems = $cart->items()->with('product')->get();
                $total = $cartItems->sum(function ($item) {
                    return $item->product->price * $item->quantity;
                });
            }
        } else {
            $sessionCart = session()->get('cart', []);
            $cartItems = $sessionCart;
            $total = array_sum(array_map(function ($item) {
                return $item['price'] * $item['quantity'];
            }, $sessionCart));
        }

        return Inertia::render('cart/index', [
            'cartContent' => $cartItems,
            'total' => $total,
        ]);
    }

    /**
     * Agrega un producto al carrito.
     */
    public function add(AosProducts $product)
    {
        if (Auth::check()) {
            $user = Auth::user();
            $cart = $user->cart()->firstOrCreate([]); // Obtiene o crea el carrito

            $cartItem = $cart->items()->where('product_id', $product->id)->first();

            if ($cartItem) {
                $cartItem->increment('quantity');
            } else {
                $cart->items()->create([
                    'product_id' => $product->id,
                    'quantity' => 1
                ]);
            }
        } else {
            $cart = session()->get('cart', []);

            if (isset($cart[$product->id])) {
                $cart[$product->id]['quantity']++;
            } else {
                $cart[$product->id] = [
                    "name" => $product->name,
                    "quantity" => 1,
                    "price" => $product->price,
                ];
            }
            session()->put('cart', $cart);
        }

        return redirect()->back()->with('success', '¡Producto añadido al carrito!');
    }

    /**
     * Actualiza la cantidad de un producto en el carrito.
     */
    public function update(CartItemRequest $request, $itemId)
    {
        $quantity = $request->input('quantity');

        if (Auth::check()) {
            $cartItem = CartItem::where('id', $itemId)
                ->where('cart_id', Auth::user()->cart->id)
                ->firstOrFail();

            $cartItem->update(['quantity' => $quantity]);
        } else {
            $cart = session()->get('cart', []);

            if (isset($cart[$itemId])) {
                $cart[$itemId]['quantity'] = $quantity;
                session()->put('cart', $cart);
            }
        }

        return redirect()->route('cart.index')->with('success', '¡Cantidad actualizada!');
    }

    /**
     * Elimina un producto del carrito.
     */
    public function remove($itemId)
    {
        if (Auth::check()) {
            $cartItem = CartItem::where('id', $itemId)
                ->where('cart_id', Auth::user()->cart->id)
                ->firstOrFail();

            $cartItem->delete();
        } else {
            $cart = session()->get('cart', []);

            if (isset($cart[$itemId])) {
                unset($cart[$itemId]);
                session()->put('cart', $cart);
            }
        }

        return redirect()->route('cart.index')->with('success', '¡Producto eliminado del carrito!');
    }

    /**
     * Vacía el carrito.
     */
    public static function clear()
    {
        if (Auth::check()) {
            $cart = Auth::user()->cart;
            if ($cart) {
                $cart->items()->delete();
            }
        } else {
            session()->forget('cart');
        }

        return redirect()->route('cart.index')->with('success', '¡Carrito vaciado!');
    }
}
