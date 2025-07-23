<?php
/**
 * Controlador principal de las categorías
 */

class CategoryController extends Controller {
    /**
     * Lista todos los productos
     */
    public function show($id) {
        try {
            $categoryService = new CategoryService();
            
            // Parámetros de filtrado y paginación
            $page = $_GET['page'] ?? 1;
            $limit = 12;
            $category = $id ?? null;
            $search = $_GET['search'] ?? null;
            $sortBy = $_GET['sort'] ?? 'name';
            
            // Obtener productos con filtros
            $products = $categoryService->getCategoryProducts([
                'page' => $page,
                'limit' => $limit,
                'category' => $category,
                'search' => $search,
                'sortBy' => $sortBy
            ]);
            
            // Obtener todas las categorías para el menú
            // $categories = $categoryService->getAllCategories();

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
            
            $this->view('category/show', $data);
            
        } catch (Exception $e) {
            error_log("Error en CategoryController::show: " . $e->getMessage());
            $this->view('errors/500', ['error' => $e->getMessage()]);
        }
    }
}