<?php

namespace App\Http\Controllers;

use App\Helpers\ListHelper;
use App\Models\AosProducts;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    function index(Request $request) {
        // Recuperar el ordenamiento de la solicitud
        $orderBy = $request->input('orderBy', null);
        
        switch ($orderBy) {
            case 'price_asc':
                $orderColumn = 'price';
                $orderDirection = 'asc';
                break;
            case 'price_desc':
                $orderColumn = 'price';
                $orderDirection = 'desc';
                break;
            case 'name_asc':
                $orderColumn = 'part_number';
                $orderDirection = 'asc';
                break;
            case 'name_desc':
                $orderColumn = 'part_number';
                $orderDirection = 'desc';
                break;
            default:
                $orderColumn = 'part_number';
                $orderDirection = 'asc';
                break;
        }

        // Recuperar el tamaño de página de la solicitud
        $pageSize = $request->input('pageSize', '12');
        if ($pageSize === 'all') {
            $pageSize = -1; // Obtener todos los productos
        } elseif (is_numeric($pageSize) && in_array($pageSize, ['12', '24', '48'])) {
            $pageSize = (int)$pageSize;
        } else {
            $pageSize = 12; // Valor predeterminado
        }

        // Iniciar la consulta
        $query = AosProducts::with('custom')->orderBy($orderColumn, $orderDirection);

        // Aplicar filtros de categoría
        if ($request->has('categories') && is_array($request->categories) && count($request->categories) > 0) {
            $query->whereIn('category', $request->categories);
        }

        // Aplicar filtros de clase
        if ($request->has('classes') && is_array($request->classes) && count($request->classes) > 0) {
            $query->whereHas('custom', function($q) use ($request) {
                $q->whereIn('clase_c', $request->classes);
            });
        }

        // Aplicar filtro de precio mínimo
        if ($request->has('min_price') && is_numeric($request->min_price)) {
            $query->where('price', '>=', $request->min_price);
        }

        // Aplicar filtro de precio máximo
        if ($request->has('max_price') && is_numeric($request->max_price)) {
            $query->where('price', '<=', $request->max_price);
        }

        // Obtener los resultados paginados
        if($pageSize > 0) {
            $products = $query->paginate($pageSize)->withQueryString();
        } else {
            $products = $query->get();
        }

        // echo "<pre>";
        // var_dump($products->toArray());
        // echo "</pre>";
        // die();

        $categories = ListHelper::getERPList('categoria_0');
        $classes = ListHelper::getERPList('clase_list');

        return Inertia::render('products/index', [
            'products' => $products,
            'categories' => $categories,
            'classes' => $classes
        ]);
    }
}
