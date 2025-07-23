<?php
/**
 * Controlador base
 * Proporciona funcionalidades comunes a todos los controladores
 */

abstract class Controller {
    protected $db;
    
    public function __construct() {
        $this->db = Database::getInstance();
    }
    
    /**
     * Carga una vista
     */
    protected function view($view, $data = []) {
        // Extraer variables para la vista
        extract($data);
        
        // Bufferizar la salida
        ob_start();
        include "../app/Views/{$view}.php";
        $content = ob_get_clean();
        
        // Incluir layout principal
        include '../app/Views/layout/main.php';
    }
    
    /**
     * Retorna JSON para APIs
     */
    protected function json($data, $statusCode = 200) {
        http_response_code($statusCode);
        header('Content-Type: application/json');
        echo json_encode($data);
        exit;
    }
    
    /**
     * Redirecciona a una URL
     */
    protected function redirect($url) {
        header("Location: " . Router::url($url));
        exit;
    }
    
    /**
     * Valida datos de entrada
     */
    protected function validate($data, $rules) {
        $errors = [];
        
        foreach ($rules as $field => $rule) {
            $value = $data[$field] ?? null;
            
            if (strpos($rule, 'required') !== false && empty($value)) {
                $errors[$field] = "El campo {$field} es requerido";
                continue;
            }
            
            if (strpos($rule, 'email') !== false && !filter_var($value, FILTER_VALIDATE_EMAIL)) {
                $errors[$field] = "El campo {$field} debe ser un email válido";
            }
            
            if (strpos($rule, 'min:') !== false) {
                $min = (int) substr($rule, strpos($rule, 'min:') + 4);
                if (strlen($value) < $min) {
                    $errors[$field] = "El campo {$field} debe tener al menos {$min} caracteres";
                }
            }
        }
        
        return $errors;
    }
    
    /**
     * Sanitiza datos de entrada
     */
    protected function sanitize($data) {
        if (is_array($data)) {
            return array_map([$this, 'sanitize'], $data);
        }
        
        return htmlspecialchars(trim($data), ENT_QUOTES, 'UTF-8');
    }
    
    /**
     * Verifica si la petición es AJAX
     */
    protected function isAjax() {
        return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && 
               strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest';
    }
}
