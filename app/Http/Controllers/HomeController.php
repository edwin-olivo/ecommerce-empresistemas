<?php

namespace App\Http\Controllers;

use App\Helpers\ListHelper;
use App\Models\AosProducts;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        // Obtener productos destacados (últimos 8 productos o los que tengan mejor puntuación)
        $featuredProducts = AosProducts::with('custom')
            ->orderBy('date_entered', 'desc')
            ->take(8)
            ->get();

        // Obtener categorías
        $categories = ListHelper::getERPList('categoria_0') ?? [];

        return Inertia::render('home', [
            'featured_products' => $featuredProducts,
            'categories' => $categories,
        ]);
    }
}
