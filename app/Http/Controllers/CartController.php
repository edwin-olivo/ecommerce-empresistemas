<?php

namespace App\Http\Controllers;

use App\Http\Requests\CartItemRequest;
use App\Models\AosProducts;
use App\Services\CartService;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CartController extends Controller
{
    public function __construct(
        private CartService $cartService,
    ) {}

    /**
     * Muestra el carrito de compras del usuario.
     */
    public function index()
    {
        // Fusionar carrito de sesión si el usuario se acaba de autenticar
        if (Auth::check()) {
            $this->cartService->mergeSessionCart();
        }

        $items = $this->cartService->getItems();
        $totals = $this->cartService->calculateTotals();

        return Inertia::render('cart/index', [
            'cartContent' => $items,
            'subtotal' => $totals['subtotal'],
            'taxes' => $totals['tax'],
            'shipping' => $totals['shipping'],
            'total' => $totals['total'],
        ]);
    }

    /**
     * Agrega un producto al carrito.
     */
    public function add(AosProducts $product)
    {
        $this->cartService->addProduct($product);

        return redirect()->back()->with('success', '¡Producto añadido al carrito!');
    }

    /**
     * Actualiza la cantidad de un producto en el carrito.
     */
    public function update(CartItemRequest $request, $itemId)
    {
        $quantity = $request->input('quantity');
        $this->cartService->updateQuantity($itemId, $quantity);

        return redirect()->route('cart.index')->with('success', '¡Cantidad actualizada!');
    }

    /**
     * Elimina un producto del carrito.
     */
    public function remove($itemId)
    {
        $this->cartService->removeProduct($itemId);

        return redirect()->route('cart.index')->with('success', '¡Producto eliminado del carrito!');
    }

    /**
     * Vacía el carrito.
     */
    public function clear()
    {
        $this->cartService->clearCart();

        return redirect()->route('cart.index')->with('success', '¡Carrito vaciado!');
    }
}
