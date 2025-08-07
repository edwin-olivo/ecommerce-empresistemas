<?php
/**
 * Controlador de ofertas especiales
 */

class SalesController extends Controller {
    
    /**
     * Lista todas las ofertas especiales
     */
    public function index() {
        try {
            $productService = new ProductService();
            
            // Parámetros de filtrado y paginación
            $page = $_GET['page'] ?? 1;
            $limit = 12;
            $category = $_GET['category'] ?? null;
            $search = $_GET['search'] ?? null;
            $sortBy = $_GET['sortBy'] ?? 'name';
            
            // Obtener productos con filtros
            $products = $productService->getProducts([
                'page' => $page,
                'limit' => $limit,
                'category' => $category,
                'search' => $search,
                'sortBy' => $sortBy,
                'onlyOnSale' => true
            ]);

            // Procesar productos
            foreach ($products['data'] as &$product) {
                $product['category'] = $this->categories[$product['category']];
            }

            $data = [
                'title' => 'Productos - ' . APP_NAME,
                'products' => $products['data'],
                'pagination' => $products['pagination'],
                'currentFilters' => [
                    'category' => $category,
                    'search' => $search,
                    'sort' => $sortBy
                ]
            ];

            $this->view('sales/index', $data);
            
        } catch (Exception $e) {
            error_log("Error en ProductController::index: " . $e->getMessage());
            $this->view('errors/500', ['error' => $e->getMessage()]);
        }
    }
}