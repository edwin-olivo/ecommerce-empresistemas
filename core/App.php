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

        // Rutas de categorías (llevaran a la lista de productos)
        $this->router->add('/categorias', 'ProductController', 'index');
        
        // Rutas del carrito
        $this->router->add('/carrito', 'CartController', 'index');
        $this->router->add('/carrito/datos', 'CartController', 'get', 'POST');
        $this->router->add('/carrito/agregar', 'CartController', 'add');
        $this->router->add('/carrito/remover', 'CartController', 'remove');
        $this->router->add('/carrito/actualizar', 'CartController', 'update');

        // Rutas de pago
        $this->router->add('/pago/confirmar', 'PaymentController', 'confirm', 'POST');
        $this->router->add('/pago/exito', 'PaymentController', 'success');
        $this->router->add('/pago/cancelar', 'PaymentController', 'cancel');
        $this->router->add('/pago/webhook', 'PaymentController', 'webhook', 'POST');

        // Rutas de ofertas especiales
        $this->router->add('/ofertas', 'SalesController', 'index');

        // Rutas de contacto
        $this->router->add('/contacto', 'ContactController', 'index');

        // Rutas de autenticación
        $this->router->add('/login', 'AuthController', 'login');
        $this->router->add('/login', 'AuthController', 'processLogin', 'POST');
        $this->router->add('/logout', 'AuthController', 'logout');
        $this->router->add('/registro', 'AuthController', 'register');
        $this->router->add('/registro', 'AuthController', 'processRegister', 'POST');
        
        // Rutas de perfil de usuario
        $this->router->add('/perfil', 'UserController', 'profile');
        $this->router->add('/perfil', 'UserController', 'updateProfile', 'POST');
        $this->router->add('/perfil/direccion', 'UserController', 'updateAddress', 'POST');
        $this->router->add('/perfil/password', 'UserController', 'updatePassword', 'POST');
        $this->router->add('/perfil/preferencias', 'UserController', 'updatePreferences', 'POST');
        $this->router->add('/perfil/ordenes', 'UserController', 'orders');
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
