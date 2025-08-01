<?php
/**
 * Clase principal de la aplicación
 * Maneja el enrutamiento y la inicialización del sistema
 */

class App {
    private $router;
    
    public function __construct() {
        session_start();
        $this->router = new Router();
        $this->initializeRoutes();
        $this->run();
    }
    
    /**
     * Inicializa las rutas de la aplicación
     */
    private function initializeRoutes() {
        // Rutas principales
        $this->router->add('/', 'HomeController', 'index');
        $this->router->add('/home', 'HomeController', 'index');
        
        // Rutas de productos
        $this->router->add('/productos', 'ProductController', 'index');
        $this->router->add('/productos/{id}', 'ProductController', 'show');
        
        // Rutas del carrito
        $this->router->add('/carrito', 'CartController', 'index');
        $this->router->add('/carrito/datos', 'CartController', 'get', 'POST');
        $this->router->add('/carrito/agregar', 'CartController', 'add');
        $this->router->add('/carrito/remover', 'CartController', 'remove');
        $this->router->add('/carrito/actualizar', 'CartController', 'update');

        // Rutas de contacto
        $this->router->add('/contacto', 'ContactController', 'index');
    }
    
    /**
     * Ejecuta la aplicación
     */
    private function run() {
        try {
            $this->router->dispatch();
        } catch (Exception $e) {
            if (APP_DEBUG) {
                echo "<h1>Error:</h1>";
                echo "<p>" . $e->getMessage() . "</p>";
                echo "<pre>" . $e->getTraceAsString() . "</pre>";
            } else {
                http_response_code(500);
                include '../app/Views/errors/500.php';
            }
        }
    }
}
