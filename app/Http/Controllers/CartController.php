<?php

namespace App\Http\Controllers;

use App\Models\AosProducts;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    private $cart = [];

    // Muestra el contenido del carrito
    public function index()
    {
        $cartContent = $this->cart;
        $total = array_sum(array_column($cartContent, 'price'));

        return Inertia::render('cart/index', [
            'cartContent' => $cartContent,
            'total' => $total,
        ]);
    }

    // Agrega un producto al carrito
    public function add(Request $request)
    {
        $product = AosProducts::find($request->id);

        $this->cart[] = [
            'id' => $product->id,
            'name' => $product->name,
            'price' => $product->price,
            'quantity' => $request->quantity,
            'attributes' => []
        ];

        return redirect()->route('cart.index')->with('success', '¡Producto agregado al carrito!');
    }

    // Actualiza la cantidad de un producto
    public function update(Request $request, $itemId)
    {
        $itemIndex = array_search($itemId, array_column($this->cart, 'id'));

        if ($itemIndex !== false) {
            $this->cart[$itemIndex]['quantity'] = $request->quantity;
        }

        return redirect()->route('cart.index');
    }

    // Elimina un producto del carrito
    public function remove($itemId)
    {
        $itemIndex = array_search($itemId, array_column($this->cart, 'id'));

        if ($itemIndex !== false) {
            unset($this->cart[$itemIndex]);
        }

        return redirect()->route('cart.index');
    }
}