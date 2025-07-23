<?php
/**
 * Punto de entrada principal del ecommerce
 * Todas las peticiones HTTP pasan por aquí
 */

require_once '../core/App.php';
require_once '../core/Controller.php';
require_once '../core/Database.php';
require_once '../core/Router.php';
require_once '../config/config.php';

$app = new App();
