<?php

namespace App\Http\Controllers;

use App\Helpers\ListHelper;
use App\Models\AosProducts;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class ProductController extends Controller
{
    function index(Request $request)
    {
        $pageSize = $request->input('pageSize', '24');
        if (!in_array($pageSize, ['12', '24', '48', 'all'])) {
            $pageSize = '24';
            $request->merge(['pageSize' => $pageSize]);
        }

        $productsQuery = QueryBuilder::for(AosProducts::class)
            ->with('custom')
            ->allowedFilters([
                AllowedFilter::exact('categories', 'category'),
                AllowedFilter::scope('classes', 'whereClassIn'),
                AllowedFilter::callback('price', function ($query, $value) {
                    $prices = $value;
                    if (isset($prices[0]) && is_numeric($prices[0])) {
                        $query->where('price', '>=', $prices[0]);
                    }
                    if (isset($prices[1]) && is_numeric($prices[1])) {
                        $query->where('price', '<=', $prices[1]);
                    }
                }),
            ])
            ->allowedSorts([
                'price',
                'part_number', // Renombrado de 'name' para coincidir con la columna
            ])
            ->defaultSort('part_number'); // Orden por defecto

        if ($pageSize === 'all') {
            $products = $productsQuery->get();
        } else {
            $products = $productsQuery->paginate((int)$pageSize)->withQueryString();
        }

        $filter = $request->all(['sort', 'pageSize']);
        $filter += $this->extractFiltersFromRequest($request);

        return Inertia::render('products/index', [
            'products' => $products,
            'categories' => ListHelper::getERPList('categoria_0'),
            'classes' => ListHelper::getERPList('clase_list'),
            'filters' => $filter,
            'minPrice' => AosProducts::min('price') ?? 0,
            'maxPrice' => AosProducts::max('price') ?? 1000,
        ]);
    }

    function show($id)
    {
        try {
            $product = AosProducts::with('custom')->findOrFail($id);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            abort(404, 'Product not found');
        }

        return Inertia::render('products/product-page', [
            'product' => $product,
            'categories' => ListHelper::getERPList('categoria_0'),
            'classes' => ListHelper::getERPList('clase_list'),
            'types' => ListHelper::getERPList('product_type_dom'),
        ]);
    }

    function extractFiltersFromRequest($request)
    {
        $filtersInRequest = $request->all(['filter']);

        $filters = [];
        if (isset($filtersInRequest['filter'])) {
            foreach ($filtersInRequest['filter'] as $key => $value) {
                $filters["filter[$key]"] = $value;
            }
        }

        return $filters;
    }
}
