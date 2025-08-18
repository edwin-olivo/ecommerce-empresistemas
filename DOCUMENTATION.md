# Documentación del Proyecto Ecommerce MVC

## 📚 Índice

1. [Información General](#información-general)
2. [Arquitectura](#arquitectura)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [Configuración](#configuración)
5. [Sistema de Rutas](#sistema-de-rutas)
6. [Controladores](#controladores)
7. [Servicios](#servicios)
8. [Modelos y Base de Datos](#modelos-y-base-de-datos)
9. [Vistas y Frontend](#vistas-y-frontend)
10. [Integración WENZ HOU](#integración-wenz-hou)
11. [Sistema de Carrito](#sistema-de-carrito)
12. [Integración de Pagos (Stripe)](#integración-de-pagos-stripe)
13. [Helpers y Utilidades](#helpers-y-utilidades)
14. [Seguridad](#seguridad)
15. [Testing y Debugging](#testing-y-debugging)
16. [Despliegue](#despliegue)
17. [API Reference](#api-reference)

## 🎯 Información General

### Descripción
Sistema de ecommerce desarrollado con **PHP 8** siguiendo el patrón **MVC** y los **principios SOLID**. Es un proyecto de práctica empresarial que integra con sistemas externos y utiliza tecnologías modernas sin frameworks externos.

### Tecnologías Principales
- **Backend**: PHP 8+ (sin frameworks externos)
- **Frontend**: HTML5 + Tailwind CSS + JavaScript vanilla
- **Base de datos**: MySQL (XAMPP)
- **Pagos**: Stripe (modo demo)
- **Integración**: Sistema WENZ HOU para productos/categorías
- **Persistencia**: LocalStorage e IndexedDB para carrito

### Restricciones Técnicas
- ❌ **NO usar Bootstrap ni jQuery**
- ✅ **Solo JavaScript vanilla** para UX/UI
- ✅ **Tailwind CSS** para estilos (via CLI, usando bun o pnpm)
- ✅ **Patrón MVC estricto** con sistema de rutas personalizado
- ✅ **Principios SOLID** en toda la arquitectura

## 🏗️ Arquitectura

### Patrón MVC Implementado

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│     MODELO      │    │   CONTROLADOR   │    │      VISTA      │
│                 │    │                 │    │                 │
│ - Services      │◄───┤ - Controllers   ├───►│ - Views         │
│ - Database      │    │ - Routing       │    │ - Components    │
│ - Helpers       │    │ - Validation    │    │ - Layout        │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Principios SOLID Aplicados

1. **Single Responsibility**: Cada clase tiene una sola responsabilidad
2. **Open/Closed**: Extensible sin modificar código existente
3. **Liskov Substitution**: Herencia apropiada en Controllers
4. **Interface Segregation**: Interfaces específicas
5. **Dependency Inversion**: Inyección de dependencias via Singleton

### Flujo de Peticiones

```
Request → Router → Controller → Service → Database
                    ↓
Response ← View ← Controller ← Service ← Database
```

## 📁 Estructura del Proyecto

```
ecommerce-mvc/
├── app/
│   ├── Controllers/          # Controladores MVC
│   │   ├── CartController.php
│   │   ├── HomeController.php
│   │   └── ProductController.php
│   ├── Models/               # Modelos de datos (futuro)
│   ├── Services/             # Lógica de negocio
│   │   ├── CategoryService.php
│   │   └── ProductService.php
│   └── Views/                # Vistas PHP con HTML/Tailwind
│       ├── cart/
│       ├── components/
│       ├── errors/
│       ├── home/
│       ├── layout/
│       └── products/
├── config/
│   └── config.php            # Configuración global
├── core/                     # Núcleo del framework
│   ├── App.php               # Aplicación principal
│   ├── Controller.php        # Controlador base
│   ├── Database.php          # Singleton PDO
│   ├── ImageHelper.php       # Manejo de imágenes
│   ├── ListHelper.php        # Utilidades de listas
│   └── Router.php            # Sistema de rutas
├── database/                 # Scripts de BD
├── docker/                   # Configuración Docker
├── public/                   # Punto de entrada público
│   ├── index.php             # Bootstrap de la aplicación
│   └── assets/               # Recursos estáticos
│       ├── css/
│       ├── images/
│       └── js/
└── resources/               # Recursos de desarrollo
    ├── css/
    └── js/
```

## ⚙️ Configuración

### config/config.php

```php
// Base de datos
define('DB_HOST', 'localhost');
define('DB_NAME', 'db_name');
define('DB_USER', 'db_user');
define('DB_PASS', 'db_password');
define('DB_CHARSET', 'utf8mb4');

// Aplicación
define('APP_NAME', 'Ecommerce MVC');
define('APP_URL', 'http://localhost');
define('APP_DEBUG', true);

// WENZ HOU API
define('IMAGE_BASE_URL', 'https://wenzhou.erponweb.com.mx/customcode/redim.php');
define('DIRECT_IMAGE_URL', 'https://wenzhou.erponweb.com.mx/customcode/imagenes/');

// Stripe
define('STRIPE_PUBLIC_KEY', 'pk_test_...');
define('STRIPE_SECRET_KEY', 'sk_test_...');
```

### Autoloader Personalizado

El sistema incluye un autoloader PSR-4 personalizado que busca clases en:
- `../app/Controllers/`
- `../app/Models/`
- `../app/Services/`
- `../core/`

## 🛣️ Sistema de Rutas

### core/Router.php

Sistema de rutas personalizado que soporta:
- Rutas estáticas: `/productos`
- Rutas dinámicas: `/productos/{id}`
- Métodos HTTP: GET, POST, PUT, DELETE
- Parámetros de URL

### Rutas Definidas

```php
// core/App.php - initializeRoutes()
// Rutas principales
$this->router->add('/', 'HomeController', 'index');
$this->router->add('/home', 'HomeController', 'index');

// Rutas de productos
$this->router->add('/productos', 'ProductController', 'index');
$this->router->add('/productos/{id}', 'ProductController', 'show');

// Rutas de categorías
$this->router->add('/categorias', 'ProductController', 'index');

// Rutas del carrito
$this->router->add('/carrito', 'CartController', 'index');
$this->router->add('/carrito/datos', 'CartController', 'get', 'POST');
$this->router->add('/carrito/agregar', 'CartController', 'add');
$this->router->add('/carrito/remover', 'CartController', 'remove');
$this->router->add('/carrito/actualizar', 'CartController', 'update');

// Rutas de pago (Stripe)
$this->router->add('/pago/confirmar', 'PaymentController', 'confirm', 'POST');
$this->router->add('/pago/exito', 'PaymentController', 'success');
$this->router->add('/pago/cancelar', 'PaymentController', 'cancel');

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
```

### Generación de URLs

```php
// En vistas
Router::url('/productos'); // Genera URL completa
Router::url('/productos/' . $product['id']);
```

## 🎮 Controladores

### Controlador Base (core/Controller.php)

Todos los controladores extienden de la clase base que proporciona:

```php
abstract class Controller {
    // Cargar vista con datos
    protected function view($view, $data = [])
    
    // Respuesta JSON para APIs
    protected function json($data)
    
    // Sanitización de datos
    protected function sanitize($data)
    
    // Validación básica
    protected function validate($data, $rules)
    
    // Redirección
    protected function redirect($url)
}
```

### ProductController

**Responsabilidades:**
- Listado de productos con filtros
- Detalle de producto individual
- Búsqueda y categorización

**Métodos principales:**
```php
public function index()  // Lista productos con filtros
public function show($id) // Detalle de producto
```

### CartController

**Responsabilidades:**
- Gestión del carrito de compras
- API para operaciones AJAX
- Integración con LocalStorage

**Métodos principales:**
```php
public function index()     // Vista del carrito
public function add()       // Agregar producto
public function remove()    // Remover producto
public function update()    // Actualizar cantidad
public function get()       // Obtener datos del carrito (API)
```

### HomeController

**Responsabilidades:**
- Página principal
- Productos destacados
- Estadísticas generales

### PaymentController

**Responsabilidades:**
- Integración con Stripe
- Procesamiento de pagos
- Redirección post-pago
- Manejo de éxito y cancelación

**Métodos principales:**
```php
public function confirm()    // Crear sesión de Stripe Checkout
public function success()    // Manejar pago exitoso
public function cancel()     // Manejar cancelación de pago
```

### AuthController

**Responsabilidades:**
- Sistema de autenticación
- Login y logout de usuarios
- Registro de nuevos usuarios
- Validación de credenciales

**Métodos principales:**
```php
public function login()          // Vista de login
public function processLogin()   // Procesar login (POST)
public function register()       // Vista de registro
public function processRegister() // Procesar registro (POST)
public function logout()         // Cerrar sesión
```

### UserController

**Responsabilidades:**
- Gestión del perfil de usuario
- Actualización de datos personales
- Historial de pedidos
- Preferencias de usuario

**Métodos principales:**
```php
public function profile()          // Vista del perfil
public function updateProfile()    // Actualizar datos (POST)
public function updateAddress()    // Actualizar dirección (POST)
public function updatePassword()   // Cambiar contraseña (POST)
public function updatePreferences() // Actualizar preferencias (POST)
public function orders()           // Historial de pedidos
```

## 🔧 Servicios

### ProductService

**Responsabilidades:**
- Lógica de negocio de productos
- Integración con base de datos
- Filtros y paginación

**Métodos principales:**
```php
public function getProducts($filters = [])      // Lista con filtros
public function getProductById($id)            // Producto individual
public function searchProducts($query)         // Búsqueda
public function getProductsByCategory($cat)    // Por categoría
```

**Filtros soportados:**
- `page`: Número de página
- `limit`: Productos por página
- `category`: Filtro por categoría
- `search`: Búsqueda por texto
- `sortBy`: Ordenamiento (name, price, date)

### CategoryService

**Responsabilidades:**
- Gestión de categorías
- Integración con WENZ HOU
- Cache de categorías

## 💾 Modelos y Base de Datos

### core/Database.php (Singleton)

```php
class Database {
    private static $instance = null;
    private $connection;
    
    public static function getInstance()
    public function select($sql, $params = [])
    public function insert($table, $data)
    public function update($table, $data, $where)
    public function delete($table, $where)
}
```

### Tablas Principales

#### aos_products
```sql
- id (Primary Key)
- name (SKU)
- description
- price
- part_number (Nombre del producto)
- category
- date_entered
- date_modified
```

#### aos_products_cstm
```sql
- id_c (Foreign Key)
- nombre_imagen_c (URL de imagen)
- pa1_c (Precio de oferta)
```

### Consultas Típicas

```php
// Productos con paginación
$sql = "SELECT p.*, pc.nombre_imagen_c, pc.pa1_c 
        FROM aos_products p 
        LEFT JOIN aos_products_cstm pc ON p.id = pc.id_c 
        WHERE p.deleted = 0 
        LIMIT ? OFFSET ?";

// Búsqueda por texto
$sql .= " AND (p.name LIKE ? OR p.description LIKE ?)";
```

## 🎨 Vistas y Frontend

### Sistema de Layout

**layout/main.php**: Layout principal con:
- Header con navegación
- Breadcrumbs
- Área de contenido
- Footer
- Scripts de Tailwind y JS

### Componentes Reutilizables

#### components/ProductCard.php
```php
// Tarjeta de producto estandarizada
<div class="bg-white rounded-lg shadow-md hover:shadow-lg transition">
    <!-- Imagen, título, precio, botones -->
</div>
```

#### components/Breadcrumb.php
```php
// Navegación de migas de pan
<nav class="flex" aria-label="Breadcrumb">
    <!-- Enlaces de navegación -->
</nav>
```

### JavaScript Modular

#### public/assets/js/app.js
- **Funciones globales**: `addToCart()`, `removeFromCart()`, `updateCartQuantity()`, `clearCart()`
- **Inicialización**: Bootstrap de aplicación cuando DOM está listo
- **Gestión de formularios**: Loading states automáticos en envíos
- **Integración**: Conecta con `EcommerceApp`, `CartPage`, `LoginPage`
- **Eventos globales**: Manejo de interacciones cross-component
- **Post-pago**: Auto-limpieza de carrito en página de éxito
- **Validación**: Funciones para email y password en registro
- **Utilidades**: `formatPrice()`, `debounce()`, `fetchAPI()`
- **Perfil**: Manejo de pestañas y toggle de contraseñas

#### public/assets/js/ecommerce-app.js
- **Clase principal**: `EcommerceApp` - Orquestador de toda la aplicación
- **Gestión del carrito**: Inicialización y control de la clase `Cart`
- **Eventos UI**: Mobile menu, formularios de búsqueda, filtros de productos
- **Cambio de vista**: Grid/List view para productos
- **Selectores de cantidad**: Botones +/- para modificar cantidades
- **Componentes**: Inicialización de dropdowns y galerías de imágenes
- **Responsive**: Manejo específico para móviles

#### public/assets/js/cart.js
- **Clase Cart**: Gestión completa del carrito de compras
- **Persistencia**: LocalStorage con manejo de errores
- **Operaciones CRUD**: `addItem()`, `removeItem()`, `updateQuantity()`, `clear()`
- **Cálculos**: Total de productos y cantidades
- **UI Updates**: Actualización automática del contador en header
- **Notificaciones**: Toast messages para feedback al usuario

#### public/assets/js/cartpage.js
- **Clase CartPage**: Renderizado específico de la página del carrito
- **API Integration**: Fetch de datos actualizados del servidor via JSON (`/carrito/datos`)
- **Renderizado dinámico**: Creación de elementos del carrito en tiempo real
- **Estado de carga**: Loading states y placeholders
- **Carrito vacío**: Manejo de estado cuando no hay productos
- **Eventos**: Listeners para actualizaciones del carrito
- **Resumen**: Cálculo y display de subtotales y totales
- **Checkout Stripe**: Integración completa con flujo de pago
- **Validación**: Control de stock y cantidades máximas
- **UX**: Confirmaciones para eliminación y vaciado de carrito


### Tailwind CSS

**Clases principales utilizadas:**
- Layout: `grid`, `flex`, `container`
- Spacing: `p-4`, `m-2`, `gap-6`
- Colors: `bg-blue-500`, `text-gray-700`
- Responsive: `md:grid-cols-3`, `lg:w-1/4`

## 🔌 Integración WENZ HOU

### Configuración de URLs

```php
define('IMAGE_BASE_URL', '<Método redimensionador de imágenes>');
define('DIRECT_IMAGE_URL', '<Ruta directa a las imágenes>');
```

### core/ImageHelper.php

```php
class ImageHelper {
    public static function getImageUrl($imageName, $width = 300, $height = 300)
    public static function getDirectImageUrl($imageName)
    public static function getPlaceholderUrl()
}
```

### Manejo de Imágenes

```php
// Imagen redimensionada
$imageUrl = ImageHelper::getImageUrl($product['image_url'], 400, 400);

// Imagen directa
$directUrl = ImageHelper::getDirectImageUrl($product['image_url']);

// Placeholder si no hay imagen
$placeholder = ImageHelper::getPlaceholderUrl();
```

## 🛒 Sistema de Carrito

### Persistencia Local

**LocalStorage** (Principal):
```javascript
// Estructura del carrito
[
    {
        "productId": "123",
        "quantity": 10
    },
    {
        "productId": "456",
        "quantity": 1
    }
]
```

### API del Carrito

```javascript
// public/assets/js/cart.js
const cartAPI = {
    async add(productId, quantity),
    async remove(productId),
    async update(productId, quantity),
    async get(),
    async clear()
};
```

### Sincronización

El carrito se sincroniza automáticamente:
1. **Cliente → Servidor**: Al agregar/modificar
2. **Servidor → Cliente**: Al cargar página
3. **Persistencia**: LocalStorage + IndexedDB

## 💳 Integración de Pagos (Stripe)

### Configuración

```php
// config/config.php
define('STRIPE_PUBLIC_KEY', 'pk_test_...');
define('STRIPE_SECRET_KEY', 'sk_test_...');
```

### Flujo de Pago Implementado

1. **Cliente → Carrito**: Usuario agrega productos al carrito
2. **Checkout**: Click en botón "Proceder al Pago" 
3. **Backend**: PaymentController crea sesión de Stripe Checkout
4. **Redirección**: Usuario es redirigido a Stripe Checkout
5. **Pago**: Usuario completa el pago en la plataforma de Stripe
6. **Callback**: Stripe redirige de vuelta a la aplicación
7. **Confirmación**: Página de éxito o cancelación

### Implementación Actual

#### PaymentController::confirm()
```php
public function confirm() {
    // Recibe datos del carrito via POST
    $cartData = $_POST['cartData'] ?? null;
    
    // Convierte productos a formato de Stripe
    $lineItems = [];
    foreach ($cartDataDecoded as $item) {
        $lineItems[] = [
            "quantity" => $item['quantity'],
            "price_data" => [
                "currency" => "mxn",
                "unit_amount" => $item['price'] * 100, // Stripe usa centavos
                "product_data" => [
                    "name" => $item['name']
                ]
            ]
        ];
    }
    
    // Crea sesión de Stripe Checkout
    $checkout_session = \Stripe\Checkout\Session::create([
        "mode" => "payment",
        "success_url" => Router::url('/pago/exito') . "?session_id={CHECKOUT_SESSION_ID}",
        "cancel_url" => Router::url('/pago/cancelar'),
        "locale" => "auto",
        "line_items" => $lineItems,
    ]);
    
    // Redirige a Stripe
    header("Location: " . $checkout_session->url);
}
```

#### PaymentController::success()
```php
public function success() {
    // Recupera información de la sesión
    $sessionId = $_GET['session_id'] ?? null;
    $session = \Stripe\Checkout\Session::retrieve($sessionId);
    $customer = $session->customer_details;
    
    // Muestra página de confirmación
    $this->view('payment/success', ['customer' => $customer]);
}
```

#### Integración JavaScript (cartpage.js)
```javascript
// Botón de checkout en la página del carrito
document.getElementById('checkout-btn')?.addEventListener('click', async () => {
    const cartItems = app.cart.items;
    
    // Obtener datos actualizados del servidor
    const response = await fetch(this.cartDataUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartData: cartItems })
    });
    
    const data = await response.json();
    
    // Crear formulario para envío a /pago/confirmar
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = `${baseUrl}pago/confirmar`;
    
    const hiddenField = document.createElement('input');
    hiddenField.type = 'hidden';
    hiddenField.name = 'cartData';
    hiddenField.value = JSON.stringify(data.items);
    form.appendChild(hiddenField);
    
    document.body.appendChild(form);
    form.submit();
});
```

#### Limpieza Automática del Carrito
```javascript
// app.js - Limpiar carrito después de pago exitoso
if (pathName.includes('/pago/exito')) {
    clearCart();
    console.log('Carrito limpiado después de pago exitoso');
}
```

### Páginas de Resultado

#### Pago Exitoso (/pago/exito)
- Muestra confirmación con nombre del cliente
- Botón para ver órdenes en el perfil
- Botón para volver al inicio
- **Auto-limpia el carrito** al cargar la página

#### Pago Cancelado (/pago/cancelar)
- Informa sobre la cancelación
- Botón para volver al carrito
- Botón para volver al inicio
- **Mantiene el carrito** intacto

### Seguridad

- **Claves de prueba**: Usando claves de test de Stripe
- **Server-side**: Validación en el backend antes de crear sesión
- **No exposición**: Claves privadas nunca expuestas al frontend
- **Validación**: Verificación de sesión en success callback

### Moneda y Formato

- **Moneda**: Pesos mexicanos (MXN)
- **Formato**: Centavos (precio * 100 para Stripe)
- **Locale**: Auto-detección de idioma en Stripe Checkout

## 🛠️ Helpers y Utilidades

### core/ImageHelper.php (Singleton)

**Responsabilidades:**
- Redimensionamiento de imágenes
- URLs de WENZ HOU
- Placeholders
- Optimización

```php
class ImageHelper {
    private static $instance = null;
    
    public static function getInstance()
    public static function getImageUrl($imageName, $width, $height)
    public static function getDirectImageUrl($imageName)
    public static function getPlaceholderUrl()
    private function generateUrl($imageName, $width, $height)
}
```

### core/ListHelper.php (Singleton)

**Responsabilidades:**
- Paginación
- Ordenamiento
- Filtros
- Búsqueda

```php
class ListHelper {
    public static function paginate($data, $page, $limit)
    public static function search($data, $query, $fields)
    public static function sort($data, $field, $direction)
    public static function filter($data, $filters)
}
```

## 🔒 Seguridad

### Sanitización de Datos

```php
// core/Controller.php
protected function sanitize($data) {
    if (is_array($data)) {
        return array_map([$this, 'sanitize'], $data);
    }
    return htmlspecialchars(strip_tags(trim($data)), ENT_QUOTES, 'UTF-8');
}
```

### Validación de Entrada

```php
protected function validate($data, $rules) {
    $errors = [];
    foreach ($rules as $field => $rule) {
        // Validar requerido, tipo, longitud, etc.
    }
    return $errors;
}
```

### Base de Datos

- **Consultas preparadas**: Siempre usar PDO prepared statements
- **Escape de datos**: Sanitización en todas las entradas
- **Conexión segura**: Credenciales en variables de entorno

```php
// Ejemplo seguro
$stmt = $this->db->prepare("SELECT * FROM products WHERE id = ?");
$stmt->execute([$productId]);
```

### CSRF Protection (Futuro)

```php
// Generar token
$_SESSION['csrf_token'] = bin2hex(random_bytes(32));

// Validar token
if (!hash_equals($_SESSION['csrf_token'], $_POST['csrf_token'])) {
    throw new Exception('CSRF token mismatch');
}
```

## 🧪 Testing y Debugging

### Modo Debug

```php
// config/config.php
define('APP_DEBUG', true);

// core/App.php
if (APP_DEBUG) {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
}
```

### Logging (Futuro)

```php
class Logger {
    public static function error($message, $context = [])
    public static function info($message, $context = [])
    public static function debug($message, $context = [])
}
```

### Testing Manual

**Checklist de funcionalidades:**
- [ ] Navegación entre páginas
- [ ] Listado de productos con filtros
- [ ] Búsqueda de productos
- [ ] Agregar al carrito
- [ ] Modificar cantidades
- [ ] Persistencia del carrito
- [ ] Responsive design
- [ ] Carga de imágenes

## 🚀 Despliegue

### Requisitos del Servidor

- **PHP**: 8.0 o superior
- **MySQL**: 5.7 o superior
- **Apache**: Con mod_rewrite habilitado
- **HTTPS**: Para Stripe en producción

### Configuración de Producción

```php
// config/config.php (Producción)
define('APP_DEBUG', false);
define('APP_URL', 'https://tudominio.com');
define('DB_HOST', 'localhost');
```

### .htaccess

```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ index.php [QSA,L]
```

### Docker

```dockerfile
# Dockerfile
FROM php:8.1-apache
RUN docker-php-ext-install pdo pdo_mysql
COPY . /var/www/html/
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "80:80"
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: root
```

## 📋 API Reference

### Endpoints del Carrito

#### POST /carrito/agregar
```json
// Request
{
    "product_id": "123",
    "quantity": 2
}

// Response
{
    "success": true,
    "message": "Producto agregado",
    "cart": { /* datos del carrito */ }
}
```

#### POST /carrito/remover
```json
// Request
{
    "product_id": "123"
}

// Response
{
    "success": true,
    "message": "Producto removido",
    "cart": { /* datos del carrito */ }
}
```

#### POST /carrito/actualizar
```json
// Request
{
    "product_id": "123",
    "quantity": 5
}

// Response
{
    "success": true,
    "message": "Cantidad actualizada",
    "cart": { /* datos del carrito */ }
}
```

#### GET /carrito/datos
```json
// Response
{
    "items": [
        {
            "id": "123",
            "name": "Producto",
            "price": 100.00,
            "quantity": 2,
            "stock": 50,
            "subtotal": 200.00,
            "image_url": "imagen.jpg"
        }
    ],
    "total": 200.00,
    "itemCount": 2
}
```

### Endpoints de Pago (Stripe)

#### POST /pago/confirmar
```json
// Request (Form Data)
{
    "cartData": "[{\"id\":\"123\",\"quantity\":2,\"price\":100.00,\"name\":\"Producto\"}]"
}

// Response
// Redirección 303 a Stripe Checkout
```

#### GET /pago/exito?session_id={CHECKOUT_SESSION_ID}
**Respuesta**: Página de confirmación con datos del cliente de Stripe

#### GET /pago/cancelar
**Respuesta**: Página de cancelación con opciones de navegación

### Endpoints de Productos

#### GET /productos
**Parámetros:**
- `page`: Número de página (default: 1)
- `limit`: Productos por página (default: 12)
- `category`: Filtro por categoría
- `search`: Búsqueda por texto
- `sortBy`: Ordenamiento (name, price, date)

#### GET /productos/{id}
**Respuesta**: Detalle completo del producto

### Endpoints de Autenticación

#### GET /login
**Respuesta**: Vista del formulario de login

#### POST /login
```json
// Request
{
    "email": "usuario@ejemplo.com",
    "password": "contraseña"
}

// Response
{
    "success": true,
    "message": "Login exitoso",
    "user": { /* datos del usuario */ }
}
```

#### GET /registro
**Respuesta**: Vista del formulario de registro

#### POST /registro
```json
// Request
{
    "name": "Usuario Nuevo",
    "email": "usuario@ejemplo.com",
    "password": "contraseña",
    "password_confirmation": "contraseña"
}

// Response
{
    "success": true,
    "message": "Registro exitoso",
    "user": { /* datos del usuario */ }
}
```

### Endpoints de Usuario

#### GET /perfil
**Respuesta**: Vista del perfil de usuario con datos personales

#### POST /perfil
```json
// Request
{
    "name": "Nombre Actualizado",
    "email": "nuevo@email.com",
    "phone": "+52 123 456 789"
}

// Response
{
    "success": true,
    "message": "Perfil actualizado"
}
```

#### POST /perfil/direccion
```json
// Request
{
    "address": "Nueva Dirección 456",
    "city": "Tepic",
    "postal_code": "63100",
    "country": "México"
}
```

#### POST /perfil/password
```json
// Request
{
    "current_password": "contraseña_actual",
    "new_password": "nueva_contraseña",
    "password_confirmation": "nueva_contraseña"
}
```

#### GET /perfil/ordenes
**Respuesta**: Vista del historial de pedidos del usuario

## 📝 Convenciones de Código

### PHP (PSR-12)

```php
<?php

namespace App\Controllers;

class ProductController extends Controller
{
    /**
     * Lista todos los productos
     */
    public function index(): void
    {
        // Lógica del método
    }
}
```

### JavaScript (ES6+)

```javascript
class CartManager {
    constructor() {
        this.items = [];
    }
    
    async addProduct(productId, quantity = 1) {
        // Lógica asíncrona
    }
}
```

### CSS/Tailwind

```html
<!-- Estructura semántica con clases utility -->
<article class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
    <header class="p-4 border-b border-gray-200">
        <h2 class="text-xl font-semibold text-gray-800">Título</h2>
    </header>
</article>
```

## 📊 Métricas y Performance

### Optimizaciones Implementadas

1. **Lazy Loading**: Imágenes se cargan bajo demanda
2. **CDN**: Tailwind CSS desde CDN
3. **Minificación**: CSS y JS minimizados
4. **Caching**: Headers apropiados para assets
5. **Conexión persistente**: PDO con conexión reutilizable

### Métricas Objetivo

- **Tiempo de carga**: < 3 segundos
- **First Contentful Paint**: < 1.5 segundos
- **Largest Contentful Paint**: < 2.5 segundos
- **Cumulative Layout Shift**: < 0.1

## 🔄 Versionado y Mantenimiento

### Git Workflow

```bash
# Feature branch
git checkout -b feature/nueva-funcionalidad
git commit -m "feat: descripción del feature"
git push origin feature/nueva-funcionalidad

# Pull request y merge a main
```

### Changelog

Mantener registro de cambios en formato semántico:
- `feat`: Nueva funcionalidad
- `fix`: Corrección de bugs
- `docs`: Documentación
- `style`: Cambios de formato
- `refactor`: Refactorización
- `test`: Tests
- `chore`: Tareas de mantenimiento

---

**Última actualización**: 18 de Agosto, 2025
**Versión del documento**: 2.0.0
**Mantenido por**: Equipo de Desarrollo

## 🆕 Changelog v2.0.0

### Nuevas Funcionalidades
- ✅ **Integración completa de Stripe**: Checkout, éxito, cancelación
- ✅ **Sistema de autenticación**: Login, registro, logout
- ✅ **Perfil de usuario**: Gestión completa de datos personales
- ✅ **Rutas expandidas**: 17 nuevas rutas implementadas
- ✅ **Auto-limpieza de carrito**: Post-pago automático
- ✅ **Validaciones JavaScript**: Email y contraseñas
- ✅ **UX mejorada**: Loading states, confirmaciones, toast messages

### Mejoras Técnicas
- 🔧 **Arquitectura**: Nuevos controladores (Payment, Auth, User)
- 🔧 **JavaScript modular**: Separación de responsabilidades
- 🔧 **API consistente**: Endpoints estandarizados
- 🔧 **Seguridad**: Sanitización y validación expandida
