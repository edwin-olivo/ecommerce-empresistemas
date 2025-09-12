<?php

namespace App\Http\Controllers;

use App\Models\AosProducts;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    function index() {
        $products = AosProducts::with('custom')->take(32)->orderBy('part_number', 'asc')->get();
        return Inertia::render('products/index', [
            'initialProducts' => $products
        ]);
    }
}
