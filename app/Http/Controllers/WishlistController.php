<?php

namespace App\Http\Controllers;

use App\Models\Whishlist;
use App\Models\Wishlist;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WishlistController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $wishlists = Wishlist::where('user_id', auth()->id())->get();
        return Inertia::render('dashboard/wishlist', ['wishlists' => $wishlists]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        Wishlist::create([
            'user_id' => auth()->id(),
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
        ]);

        return redirect(route('wishlist'))->with('success', 'Lista de deseos creada exitosamente');
    }

    /**
     * Display the specified resource.
     */
    public function show(Wishlist $wishlist)
    {
        return Inertia::render('dashboard/wishlist-show', ['wishlist' => $wishlist->load('products.product')]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Wishlist $wishlist)
    {

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $wishlist->update($validated);

        return redirect(route('wishlist'))->with('success', 'Lista de deseos actualizada exitosamente');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Wishlist $wishlist)
    {
        $wishlist->delete();
        return redirect()->back()->with('success', 'Lista de deseos eliminada exitosamente');
    }

    /**
     * Add a product to a wishlist.
     */
    public function addProduct(Request $request, Wishlist $wishlist)
    {
        $validated = $request->validate([
            'product' => 'required|exists:aos_products,id',
        ]);

        // Check if product already exists in wishlist
        $exists = $wishlist->products()->where('product_id', $validated['product'])->exists();

        if ($exists) {
            return response()->json(['message' => 'El producto ya está en la lista de deseos'], 422);
        }

        $wishlist->products()->create([
            'product_id' => $validated['product'],
        ]);

        return response()->json(['message' => 'Producto agregado a la lista de deseos'], 201);
    }

    /**
     * Remove a product from a wishlist.
     */
    public function removeProduct(Request $request, Wishlist $wishlist)
    {
        $validated = $request->validate([
            'product' => 'required|exists:aos_products,id',
        ]);

        $wishlist->products()
            ->where('product_id', $validated['product'])
            ->delete();

        return response()->json(['message' => 'Producto removido de la lista de deseos']);
    }
}
