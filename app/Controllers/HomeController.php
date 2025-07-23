<?php
/**
 * Controlador principal del home
 */

class HomeController extends Controller {
    
    /**
     * Página principal del ecommerce
     */
    public function index() {
        try {
            // Obtener productos destacados
            $productService = new ProductService();
            $featuredProducts = $productService->getFeaturedProducts(8);

            // Obtener categorías
            $categoryService = new CategoryService();
            $categories = $categoryService->getAllCategories();
            
            $data = [
                'title' => 'Inicio - ' . APP_NAME,
                'featuredProducts' => $featuredProducts,
                'categories' => $categories,
                'pageClass' => 'home-page'
            ];
            
            $this->view('home/index', $data);
            
        } catch (Exception $e) {
            error_log("Error en HomeController::index: " . $e->getMessage());
            $this->view('errors/500', ['error' => $e->getMessage()]);
        }
    }
}
