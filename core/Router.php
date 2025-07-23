<?php
/**
 * Sistema de enrutamiento personalizado
 * Maneja las rutas de la aplicación estilo framework
 */

class Router {
    private $routes = [];
    private $params = [];
    
    /**
     * Agrega una ruta al sistema
     */
    public function add($route, $controller, $action, $method = 'GET') {
        $this->routes[] = [
            'route' => $route,
            'controller' => $controller,
            'action' => $action,
            'method' => strtoupper($method)
        ];
    }
    
    /**
     * Despacha la petición actual
     */
    public function dispatch() {
        $uri = $this->getUri();
        $method = $_SERVER['REQUEST_METHOD'];
        
        foreach ($this->routes as $route) {
            if ($route['method'] !== $method) {
                continue;
            }
            
            if ($this->match($route['route'], $uri)) {
                $controller = $route['controller'];
                $action = $route['action'];
                
                if (!class_exists($controller)) {
                    throw new Exception("Controller $controller no encontrado");
                }
                
                $controllerInstance = new $controller();
                
                if (!method_exists($controllerInstance, $action)) {
                    throw new Exception("Método $action no encontrado en $controller");
                }
                
                // Pasar parámetros al controlador
                call_user_func_array([$controllerInstance, $action], $this->params);
                return;
            }
        }
        
        // Ruta no encontrada
        http_response_code(404);
        include '../app/Views/errors/404.php';
    }
    
    /**
     * Obtiene la URI actual limpia
     */
    private function getUri() {
        $uri = $_SERVER['REQUEST_URI'];
        
        // Remover query string
        if (($pos = strpos($uri, '?')) !== false) {
            $uri = substr($uri, 0, $pos);
        }
        
        // Remover la parte del directorio del proyecto
        $basePath = str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME']));
        if ($basePath !== '/') {
            $uri = substr($uri, strlen($basePath));
        }
        
        return $uri ?: '/';
    }
    
    /**
     * Verifica si la ruta coincide con la URI
     */
    private function match($route, $uri) {
        $this->params = [];
        
        // Convertir ruta con parámetros a regex
        $routeRegex = preg_replace('/\{([^}]+)\}/', '([^/]+)', $route);
        $routeRegex = '#^' . $routeRegex . '$#';
        
        if (preg_match($routeRegex, $uri, $matches)) {
            // Extraer parámetros
            array_shift($matches); // Remover match completo
            $this->params = $matches;
            return true;
        }
        
        return false;
    }
    
    /**
     * Genera URL para una ruta
     */
    public static function url($path = '') {
        return APP_URL . $path;
    }
}
