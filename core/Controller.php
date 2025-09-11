<?php

use Latte\Engine;

/**
 * Controlador base
 * Proporciona funcionalidades comunes a todos los controladores
 */

abstract class Controller
{
    protected $db;
    protected $categories;
    protected $brands;
    protected $subcategories;

    protected Engine $latte;

    public function __construct()
    {
        // Inicializar motor de plantillas
        $this->latte = new Engine();
        // Configurar directorio de caché
        $this->latte->setTempDirectory(__DIR__ . '/../temp/latte');
        // Configurar directorio de vistas
        $this->latte->setLoader(new Latte\Loaders\FileLoader(__DIR__ . '/../app/Views'));

        // Inicializar conexión a la base de datos
        $this->db = Database::getInstance();
        
        // Obtener categorías, marcas y subcategorías para el menú
        $this->categories = ListHelper::getCategories();
        $this->brands = ListHelper::getBrands();
        $this->subcategories = ListHelper::getSubcategories();
    }

    /**
     * Carga una vista
     */
    protected function view($view, $data = [])
    {
        $categories = $this->categories;
        $brands = $this->brands;
        $subcategories = $this->subcategories;

        // Extraer variables para la vista
        extract($data);

        // Bufferizar la salida
        ob_start();
        include "../app/Views/{$view}.php";
        $content = ob_get_clean();
        
        // Si es una petición AJAX, devolver solo el contenido
        if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && 
            strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest') {
            echo $content;
            return;
        }
        
        // Incluir el layout principal
        require_once "../app/Views/layout/main.php";
    }
    
    /**
     * Renderiza una plantilla Latte
     */
    protected function viewLatte($template, $params = [])
    {
        // Agregar categorías, marcas y subcategorías a los parámetros
        $params['categories'] = $this->categories;
        $params['brands'] = $this->brands;
        $params['subcategories'] = $this->subcategories;
        
        // Agregar constantes PHP que se usan comúnmente en las plantillas
        $params['APP_NAME'] = APP_NAME;
        
        // Registrar helpers para Latte
        $this->latte->addFilter('json', function ($value) {
            return json_encode($value, JSON_HEX_APOS | JSON_HEX_QUOT);
        });
        
        // Agregar función Router::url() para usar en plantillas Latte
        $this->latte->addFunction('url', function ($path) {
            return Router::url($path);
        });
        
        $this->latte->render("{$template}.latte", $params);
    }

    /**
     * Retorna JSON para APIs
     */
    protected function json($data, $statusCode = 200)
    {
        http_response_code($statusCode);
        header('Content-Type: application/json');
        echo json_encode($data);
        exit;
    }

    /**
     * Redirecciona a una URL
     */
    protected function redirect($url)
    {
        header("Location: " . Router::url($url));
        exit;
    }

    /**
     * Valida datos de entrada
     */
    protected function validate($data, $rules)
    {
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
    protected function sanitize($data)
    {
        if (is_array($data)) {
            return array_map([$this, 'sanitize'], $data);
        }

        return htmlspecialchars(trim($data), ENT_QUOTES, 'UTF-8');
    }

    /**
     * Verifica si la petición es AJAX
     */
    protected function isAjax()
    {
        // Detecta peticiones AJAX tradicionales y fetch (application/json)
        $isXmlHttpRequest = isset($_SERVER['HTTP_X_REQUESTED_WITH']) &&
            strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest';

        $isFetchJson = isset($_SERVER['CONTENT_TYPE']) &&
            strpos(strtolower($_SERVER['CONTENT_TYPE']), 'application/json') !== false;

        return $isXmlHttpRequest || $isFetchJson;
    }
}
