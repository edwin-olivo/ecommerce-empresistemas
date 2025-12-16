<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\WishlistController;
use App\Http\Controllers\AddressController;

Route::middleware('auth')->group(function () {
    // Rutas para el perfil del usuario (ordenes, historial, direcciones, etc.)
    Route::redirect('/dashboard', '/dashboard/orders');
    Route::get('/dashboard/orders', [DashboardController::class, 'orders'])->name('dashboard.orders');
    Route::get('/dashboard/addresses', [DashboardController::class, 'addresses'])->name('dashboard.addresses');

    Route::resource('/dashboard/wishlist', WishlistController::class)->names([
        'index' => 'wishlist.index',
        'store' => 'wishlist.store',
        'show' => 'wishlist.show',
        'update' => 'wishlist.update',
        'destroy' => 'wishlist.destroy',
    ]);

    // Rutas para agregar/remover productos de wishlist
    Route::post('/dashboard/wishlist/{wishlist}/add-product', [WishlistController::class, 'addProduct'])->name('wishlist.add-product');
    Route::delete('/dashboard/wishlist/{wishlist}/remove-product', [WishlistController::class, 'removeProduct'])->name('wishlist.remove-product');
});
