<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Instrucciones para GitHub Copilot - Ecommerce MVC

## Contexto del Proyecto

Este es un proyecto de ecommerce desarrollado con **PHP 8** siguiendo el patrón **MVC** y los **principios SOLID**. Es un proyecto de práctica para desarrolladores durante tiempos muertos en horario laboral.

## Tecnologías Principales

- **Backend**: PHP 8+ (sin frameworks externos)
- **Frontend**: HTML5 + Tailwind CSS + JavaScript vanilla
- **Base de datos**: MySQL (XAMPP)
- **Pagos**: Stripe (modo demo)
- **Integración**: Sistema WENZ HOU para productos/categorías

## Restricciones Importantes

- ❌ **NO usar Bootstrap ni jQuery** (especificado en requerimientos)
- ✅ **Solo JavaScript vanilla** para UX/UI
- ✅ **Tailwind CSS** para estilos (via CLI, usando bun o pnpm)
- ✅ **Patrón MVC estricto** con sistema de rutas personalizado
- ✅ **Principios SOLID** en toda la arquitectura

## Estructura del Proyecto

```
ecommerce-mvc/
├── app/
│   ├── Controllers/    # Controladores MVC (extienden Controller base)
│   ├── Models/         # Modelos de datos (si se necesitan)
│   ├── Services/       # Lógica de negocio (ProductService, WenzHouService, etc.)
│   └── Views/          # Vistas PHP con HTML/Tailwind
├── core/
│   ├── App.php         # Aplicación principal y enrutamiento
│   ├── Controller.php  # Controlador base con funciones comunes
│   ├── ImageHelper.php # Singleton para manejo de imágenes
│   ├── ListHelper.php  # Singleton para manejo de listas
│   ├── Database.php    # Singleton para conexión PDO
│   └── Router.php      # Sistema de rutas personalizado
├── config/
│   └── config.php      # Configuración BD, APIs, constantes
└── public/
    ├── index.php       # Punto de entrada
    └── assets/         # CSS, JS, imágenes
```

## Patrones y Convenciones

### Controladores
- Extender siempre de `Controller`
- Métodos públicos para acciones de rutas
- Usar `$this->view()` para cargar vistas
- Usar `$this->json()` para APIs
- Sanitizar datos con `$this->sanitize()`

### Servicios
- Lógica de negocio separada de controladores
- Usar `Database::getInstance()` para consultas
- Manejar excepciones apropiadamente
- Seguir principio de responsabilidad única

### Vistas
- Usar layout principal en `Views/layout/main.php`
- Variables extraídas automáticamente en vistas
- Usar `Router::url()` para generar URLs
- Clases Tailwind para estilos

### Base de Datos
- Solo consultas preparadas con PDO
- Usar métodos de `Database` class: `select()`, `insert()`, `update()`, `delete()`
- Transacciones cuando sea necesario
- Sanitización de todos los inputs

## Funcionalidades Específicas

### Carrito de Compras
- Persistencia con `localStorage` (requerimiento del proyecto)
- También considerar `IndexedDB` como alternativa
- FETCH para agregar/quitar sin recargas
- Contador en tiempo real en header

### Integración WENZ HOU
- Sincronización de productos y categorías
- Manejo de errores de conectividad
- Cache cuando sea apropiado

### Pagos Stripe
- Usar claves de prueba (demo)
- Integración segura sin exponer claves privadas
- Manejo de webhooks para confirmaciones

## Estándares de Código

### PHP
- PSR-4 para autoloading
- Tipo de retorno explícito cuando sea posible
- Documentación con PHPDoc
- Manejo de excepciones consistente
- Validación de entrada siempre

### JavaScript
- ES6+ features (arrow functions, const/let, etc.)
- Clases para organización
- Async/await para peticiones
- Sin dependencias externas (no jQuery)
- Funciones modulares y reutilizables

### CSS/Tailwind
- Utility classes preferentemente
- CSS personalizado solo cuando sea necesario
- Responsive design (mobile-first)
- Accesibilidad (focus, contrast, etc.)

## Mejores Prácticas

1. **Seguridad**: Siempre sanitizar y validar inputs
2. **Performance**: Lazy loading, optimización de consultas
3. **UX**: Loading states, feedback al usuario
4. **Mantenibilidad**: Código limpio, comentarios útiles
5. **Escalabilidad**: Servicios desacoplados, interfaces claras

## Ejemplos de Código

### Controlador típico:
```php
class ProductController extends Controller {
    public function index() {
        $productService = new ProductService();
        $products = $productService->getProducts($_GET);
        $this->view('products/index', ['products' => $products]);
    }
}
```

### Servicio típico:
```php
class ProductService {
    private $db;
    
    public function __construct() {
        $this->db = Database::getInstance();
    }
    
    public function getProducts($filters = []) {
        // Lógica con filtros y paginación
    }
}
```

### Vista con Tailwind:
```php
<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <?php foreach ($products as $product): ?>
        <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <!-- Contenido del producto -->
        </div>
    <?php endforeach; ?>
</div>
```

Cuando generes código, asegúrate de seguir estos patrones y usar las tecnologías especificadas.
