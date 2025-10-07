<?php
/**
 * Configuración general de la aplicación
 */

// Inicializar Composer
require_once __DIR__ . '/../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

// Configuración de la base de datos
define('DB_HOST', $_ENV['DB_HOST']);
define('DB_NAME', $_ENV['DB_NAME']);
define('DB_USER', $_ENV['DB_USER']);
define('DB_PASS', $_ENV['DB_PASS']);
define('DB_CHARSET', $_ENV['DB_CHARSET']);

// Configuración de la aplicación
define('APP_NAME', $_ENV['APP_NAME']);
define('APP_URL', $_ENV['APP_URL']);
define('APP_DEBUG', $_ENV['APP_DEBUG']);

// Configuración de WENZ HOU API
define('IMAGE_BASE_URL', $_ENV['IMAGE_BASE_URL']);
define('IMAGE_PATH', $_ENV['IMAGE_PATH']);
define('DIRECT_IMAGE_URL', $_ENV['DIRECT_IMAGE_URL']);

// Configuración de Stripe
define('STRIPE_PUBLIC_KEY', $_ENV['STRIPE_PUBLIC_KEY']);
define('STRIPE_SECRET_KEY', $_ENV['STRIPE_SECRET_KEY']);

// Configuración de sesiones
define('SESSION_LIFETIME', $_ENV['SESSION_LIFETIME']);

// Zona horaria
date_default_timezone_set($_ENV['TIMEZONE']);

// Autoloader personalizado
spl_autoload_register(function ($class) {
    $directories = [
        '../app/Controllers/',
        '../app/Models/',
        '../app/Services/',
        '../core/Traits/',
        '../core/Helpers/',
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
