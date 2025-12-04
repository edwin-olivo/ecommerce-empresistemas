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
        return response()->json($wishlist);
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
}
