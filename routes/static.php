<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PageController;

Route::get('/about', [PageController::class, 'about'])->name('page.about');
Route::get('/contact', [PageController::class, 'contact'])->name('page.contact');
Route::get('/faq', [PageController::class, 'faq'])->name('page.faq');
Route::get('/cookies', [PageController::class, 'cookies'])->name('page.cookies');
Route::get('/privacy', [PageController::class, 'privacy'])->name('page.privacy');
Route::get('/terms', [PageController::class, 'terms'])->name('page.terms');
Route::get('/shipping', [PageController::class, 'shipping'])->name('page.shipping');
Route::get('/concepto', [PageController::class, 'concepto'])->name('page.concepto');