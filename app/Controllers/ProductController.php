<?php

/**
 * Controlador de productos
 */

class ProductController extends Controller
{

    /**
     * Lista todos los productos
     */
    public function index()
    {
        try {
            $productService = new ProductService();

            // Parámetros de filtrado y paginación
            $page = $_GET['page'] ?? 1;
            $limit = 12;
            $category = $_GET['category'] ?? null;
            $subcategory = $_GET['subcategory'] ?? null;
            $brand = $_GET['brand'] ?? null;
            $search = $_GET['search'] ?? null;
            $sortBy = $_GET['sortBy'] ?? 'name';


            if (is_string($category)) {
                $category = [$category];
            }
            if (is_string($subcategory)) {
                $subcategory = [$subcategory];
            }
            if (is_string($brand)) {
                $brand = [$brand];
            }

            // Obtener productos con filtros
            $products = $productService->getProducts([
                'page' => $page,
                'limit' => $limit,
                'category' => $category,
                'subcategory' => $subcategory,
                'brand' => $brand,
                'search' => $search,
                'sortBy' => $sortBy
            ]);

            // Procesar productos
            foreach ($products['data'] as &$product) {
                $product['category'] = $this->categories[$product['category']];
            }

            $data = [
                'title' => 'Productos - ' . APP_NAME,
                'breadcrumbs' => [
                    ['label' => 'Inicio', 'url' => '/'],
                    ['label' => 'Productos', 'url' => '']
                ],
                'products' => $products['data'],
                'pagination' => $products['pagination'],
                'currentFilters' => [
                    'category' => $category,
                    'subcategory' => $subcategory,
                    'brand' => $brand,
                    'search' => $search,
                    'sort' => $sortBy
                ]
            ];

            // $this->view('products/index', $data);
            $this->viewLatte('products/index', $data);
        } catch (Exception $e) {
            error_log("Error en ProductController::index: " . $e->getMessage());
            $this->view('errors/500', ['error' => $e->getMessage()]);
        }
    }

    /**
     * Muestra un producto específico
     */
    public function show($id)
    {
        try {
            $productService = new ProductService();
            $product = $productService->getProductById($id);

            if (!$product) {
                $this->view('errors/404');
                return;
            }

            $data = [
                'title' => $product['name'] . ' - ' . APP_NAME,
                'product' => $product,
            ];

            $this->view('products/detail', $data);
        } catch (Exception $e) {
            error_log("Error en ProductController::show: " . $e->getMessage());
            $this->view('errors/500', ['error' => $e->getMessage()]);
        }
    }
}
