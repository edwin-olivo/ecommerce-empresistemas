<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;

Route::middleware('auth')->group(function () {
    // Rutas para el perfil del usuario (ordenes, historial, direcciones, etc.)
    Route::redirect('/dashboard', '/dashboard/orders');
    Route::get('/dashboard/orders', [DashboardController::class, 'orders'])->name('dashboard.orders');
    Route::get('/dashboard/addresses', [DashboardController::class, 'addresses'])->name('dashboard.addresses');
    Route::get('/dashboard/wishlist', [DashboardController::class, 'wishlist'])->name('dashboard.wishlist');
});
