<?php

namespace App\Http\Controllers;

use App\Models\Whishlist;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WhishlistController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $whishlists = Whishlist::where('user_id', auth()->id())->get();
        return Inertia::render('dashboard/wishlist', ['whishlists' => $whishlists]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $whishlist = Whishlist::create($request->all());
        return response()->json($whishlist, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Whishlist $whishlist)
    {
        return response()->json($whishlist);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Whishlist $whishlist)
    {
        $whishlist->update($request->all());
        return response()->json($whishlist);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Whishlist $whishlist)
    {
        $whishlist->delete();
    }
}
