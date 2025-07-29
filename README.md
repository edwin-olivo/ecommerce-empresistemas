# Ecommerce MVC - PHP 8

Un ecommerce moderno desarrollado con PHP 8, siguiendo el patrón MVC y principios SOLID. Integra con el sistema WENZ HOU para productos y categorías, y utiliza Stripe para pagos.

## 🚀 Características

- **Arquitectura MVC**: Estructura organizada siguiendo el patrón Modelo-Vista-Controlador
- **PHP 8+**: Utiliza las últimas características de PHP
- **Tailwind CSS**: Framework CSS utility-first (sin Bootstrap ni jQuery)
- **JavaScript Vanilla**: UX/UI moderno sin dependencias externas
- **Integración WENZ HOU**: Sincronización de productos y categorías
- **Pagos con Stripe**: Integración segura para procesar pagos
- **Base de datos MySQL**: Compatible con XAMPP
- **Sistema de rutas**: Enrutamiento estilo framework
- **Principios SOLID**: Código limpio y mantenible
- **Persistencia local**: LocalStorage e IndexedDB para el carrito

## 📋 Requisitos

- **XAMPP** (Apache, MySQL, PHP 8+)
- **Navegador moderno** con soporte para ES6+
- **Cuenta Stripe** (modo demo para desarrollo)
- **Acceso al sistema WENZ HOU** (API keys)

## 🛠️ Instalación

### 1. Configurar XAMPP

1. Inicia XAMPP Control Panel
2. Arranca Apache y MySQL
3. Asegúrate de que PHP sea versión 8 o superior

### 2. Configurar Base de Datos

1. Abre phpMyAdmin (http://localhost/phpmyadmin)
2. Ejecuta el script SQL ubicado en `database/schema.sql`
3. Esto creará la base de datos `ecommerce_db` con todas las tablas necesarias

### 3. Configurar la Aplicación

1. Edita el archivo `config/config.php`
2. Configura las credenciales de base de datos:
   ```php
   define('DB_HOST', 'localhost');
   define('DB_NAME', 'ecommerce_db');
   define('DB_USER', 'root');
   define('DB_PASS', ''); // Normalmente vacío en XAMPP
   ```

3. Configura las API keys:
   ```php   
   // Stripe (modo de prueba)
   define('STRIPE_PUBLIC_KEY', 'pk_test_tu_clave_publica');
   define('STRIPE_SECRET_KEY', 'sk_test_tu_clave_secreta');
   ```

### 4. Configurar Virtual Host (Opcional)

Para una mejor experiencia de desarrollo, configura un virtual host:

1. Edita `C:\xampp\apache\conf\extra\httpd-vhosts.conf`
2. Agrega:
   ```apache
   <VirtualHost *:80>
       DocumentRoot "C:/xampp/htdocs/ecommerce-mvc/public"
       ServerName ecommerce.local
   </VirtualHost>
   ```
3. Edita `C:\Windows\System32\drivers\etc\hosts`
4. Agrega: `127.0.0.1 ecommerce.local`
5. Reinicia Apache

## 🏃‍♂️ Uso

### Acceder a la Aplicación

- **Con virtual host**: http://ecommerce.local
- **Sin virtual host**: http://localhost/ecommerce-mvc/public

### Estructura del Proyecto

```
ecommerce-mvc/
├── app/
│   ├── Controllers/       # Controladores MVC
│   ├── Models/            # Modelos de datos
│   ├── Services/          # Servicios de negocio
│   └── Views/             # Vistas HTML/PHP
├── config/
│   └── config.php         # Configuración general
├── core/
│   ├── App.php           # Aplicación principal
│   ├── Controller.php    # Controlador base
│   ├── Database.php      # Conexión a BD
│   └── Router.php        # Sistema de rutas
└── public/               # Punto de entrada web
    ├── index.php         # Archivo principal
    └── assets/           # CSS, JS, imágenes
```

### Rutas Disponibles

- `/` - Página principal
- `/productos` - Lista de productos
- `/carrito` - Carrito de compras

## 🔧 Desarrollo

### Agregar Nuevos Controladores

1. Crear archivo en `app/Controllers/`
2. Extender de la clase `Controller`
3. Agregar rutas en `core/App.php`

Ejemplo:
```php
<?php
class MiControlador extends Controller {
    public function index() {
        $data = ['title' => 'Mi Página'];
        $this->view('mi-vista', $data);
    }
}
```

### Crear Nuevos Servicios

1. Crear archivo en `app/Services/`
2. Implementar lógica de negocio
3. Usar en controladores

### Trabajar con la Base de Datos

Usar la clase `Database` para consultas:
```php
$db = Database::getInstance();
$productos = $db->select("SELECT * FROM products WHERE active = 1");
```

### JavaScript y CSS

- **JavaScript**: Ubicar en `public/assets/js/`
- **CSS**: Ubicar en `public/assets/css/`
- **Tailwind**: Usar clases utility directamente en HTML

## 📱 Funcionalidades del Carrito

- **Persistencia**: Usa localStorage del navegador
- **AJAX**: Agregar/quitar productos sin recargar
- **Contadores**: Actualización en tiempo real
- **Responsive**: Funciona en móviles y desktop

## 🔐 Seguridad

- **Sanitización**: Todos los inputs son sanitizados
- **Validación**: Validación tanto en cliente como servidor
- **PDO**: Consultas preparadas para prevenir SQL injection
- **HTTPS**: Recomendado para producción
- **Stripe**: PCI compliance para pagos seguros

## 🧪 Testing

Para probar la aplicación:

1. Verifica que XAMPP esté ejecutándose
2. Accede a la URL configurada
3. Navega por las diferentes secciones
4. Prueba agregar productos al carrito
5. Verifica que la persistencia funcione

## 📚 Documentación Técnica

Como parte del proyecto, se debe crear:

1. **Documentación técnica del backend** (sábados)
2. **Documentación técnica del diseño** (sábados)
3. **Documentación técnica general** (sábados)

## 🤝 Contribución

Este es un proyecto de práctica para el equipo de desarrollo. Seguir estas pautas:

- **Horario**: Solo durante tiempo libre en horario laboral
- **Prioridad**: No dar prioridad sobre trabajo productivo
- **Revisión**: Viernes 5pm mostrar avances
- **Aprendizaje**: Enfoque en mejorar habilidades

## 📝 Notas Importantes

- **No usar Bootstrap ni jQuery** según especificaciones
- **Seguir principios SOLID** en todo el código
- **MVC estricto** para organización
- **Sistema de rutas** similar a frameworks modernos
- **Integración WENZ HOU** obligatoria para productos

## 🚀 Próximos Pasos

1. Implementar autenticación completa
2. Agregar panel de administración
3. Implementar procesamiento de pagos Stripe
4. Optimizar para SEO
5. Agregar tests automatizados
6. Implementar cache para mejor performance

---
