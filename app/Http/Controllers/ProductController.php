<?php

namespace App\Http\Controllers;

use App\Helpers\ListHelper;
use App\Models\AosProducts;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    function index() {
        $products = AosProducts::with('custom')->orderBy('part_number', 'asc')->get();

        $categories = ListHelper::getERPList('categoria_0');
        $classes = ListHelper::getERPList('clase_list');

        return Inertia::render('products/index', [
            'initialProducts' => $products,
            'categories' => $categories,
            'classes' => $classes
        ]);
    }
}
