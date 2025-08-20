<?php
/**
 * Configuración general de la aplicación
 */

// Configuración de la base de datos
define('DB_HOST', 'localhost');
define('DB_NAME', 'db_name');
define('DB_USER', 'db_user');
define('DB_PASS', 'db_password');
define('DB_CHARSET', 'utf8mb4');

// Configuración de la aplicación
define('APP_NAME', 'Ecommerce MVC');
define('APP_URL', 'http://localhost');
define('APP_DEBUG', true);

// Configuración de WENZ HOU API
define('IMAGE_BASE_URL', 'https://wenzhou.erponweb.com.mx/customcode/redim.php');
define('IMAGE_PATH', 'imagenes/');
define('DIRECT_IMAGE_URL', 'https://wenzhou.erponweb.com.mx/imagenes/');

// Configuración de Stripe
define('STRIPE_PUBLIC_KEY', 'pk_test_your_stripe_public_key');
define('STRIPE_SECRET_KEY', 'sk_test_your_stripe_secret_key');

// Configuración de sesiones
define('SESSION_LIFETIME', 7200); // 2 horas

// Zona horaria
date_default_timezone_set('America/Mexico_City');

// Inicializar Composer
require_once __DIR__ . '/../vendor/autoload.php';

// Autoloader personalizado
spl_autoload_register(function ($class) {
    $directories = [
        '../app/Controllers/',
        '../app/Models/',
        '../app/Services/',
        '../core/'
    ];
    
    foreach ($directories as $directory) {
        $file = $directory . $class . '.php';
        if (file_exists($file)) {
            require_once $file;
            break;
        }
    }
});
