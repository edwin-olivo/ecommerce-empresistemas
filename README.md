# Ecommerce (Laravel + Inertia + React)

Este proyecto es una tienda en línea pensada para que cualquier persona pueda explorar productos, armar su carrito y completar una compra de forma sencilla y segura. La idea es ofrecer una experiencia clara y rápida, con pantallas limpias y tiempos de carga mínimos.

Desde la perspectiva de quien compra, el recorrido es muy directo: ver el catálogo, elegir productos, añadirlos al carrito, revisar el resumen del pedido y avanzar al pago. El sistema registra los pedidos y conserva el estado del carrito para que no se pierda el progreso. La integración de pagos está preparada para conectarse con Stripe, lo que permitirá transacciones confiables cuando se active.

Detrás de escena, la aplicación está construida con herramientas modernas que priorizan el rendimiento y la facilidad de mantenimiento. Esto se traduce en una navegación fluida (sin recargas completas de página) y en una base sólida para seguir creciendo sin comprometer la estabilidad.

Hoy el núcleo del sistema ya está armado: existe la estructura para usuarios, carritos y órdenes; hay páginas y componentes listos para montar la experiencia; y el flujo de carrito funciona de manera consistente. También hay pruebas iniciales que ayudan a cuidar la calidad a medida que se incorporan nuevas funciones.

¿Qué sigue? Definir bien las reglas del negocio (envíos, impuestos, promociones), conectar los pagos en vivo con Stripe, y pulir detalles de la experiencia (mensajes de error claros, estados vacíos, confirmaciones). Con eso, el camino a un primer lanzamiento quedaría muy cercano.

## 🚀 Características

- **Arquitectura MVC**: Estructura organizada siguiendo el patrón Modelo-Vista-Controlador
- **PHP 8+**: Utiliza las últimas características de PHP
- **Laravel**: Utiliza las caracteristicas de gestión de sesiones y enrutamiento de Laravel.
- **React**: UX/UI moderno sin dependencias externas
- **Tailwind CSS**: Framework CSS utility-first (sin Bootstrap ni jQuery)
- **Integración con ERPs**: Sincronización de productos y categorías con los ERPs de la empresa
- **Pagos con Stripe**: Integración segura para procesar pagos
- **Principios SOLID**: Código limpio y mantenible
- **Persistencia en la nube**: El carrito se almacena en la caché de sesión o en la base de datos (si el usario inicia sesión)

## 📋 Requisitos

- **XAMPP** (Apache, MySQL, PHP 8+)
- **Navegador moderno** con soporte para ES6+
- **Cuenta Stripe** (modo demo para desarrollo, API keys)
- **Acceso al sistema del ERPs** (entrypoints)

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

1. Copiar el archivo `config/.env.example` y renombrarlo `config/.env`
2. Ejecutar en la terminal `php artisan key:generate`
3. Edita el archivo `config/.env`. Configura las variables de entorno:
   ```yaml
    APP_NAME=Laravel
    APP_ENV=local
    APP_KEY=
    APP_DEBUG=true
    APP_URL=http://localhost
   ```
4. Configura las API keys:
   ```yaml
    STRIPE_PUBLIC_KEY="pk_test_your_stripe_public_key"
    STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key"
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
ecommerce-empresistemas/
├── app/
│   ├── Http/
│   │   ├── Controllers/   # Controladores de la aplicación
│   │   ├── Middleware/    # Middleware de autenticación y autorización
│   │   └── Requests/      # Form Requests para validación
│   ├── Models/            # Modelos Eloquent (User, Product, Order, Cart, etc.)
│   ├── Helpers/           # Funciones auxiliares
│   └── Providers/         # Service Providers
├── routes/
│   ├── web.php            # Rutas web
│   ├── auth.php           # Rutas de autenticación
│   └── api.php            # Rutas API
├── resources/
│   ├── js/
│   │   ├── pages/         # Páginas React
│   │   ├── components/    # Componentes React reutilizables
│   │   ├── layouts/       # Layouts (AppLayout, AuthLayout)
│   │   ├── hooks/         # Custom hooks
│   │   └── app.tsx        # Aplicación principal
│   ├── css/               # Estilos Tailwind CSS
│   └── views/
│       └── app.blade.php  # Template principal de Blade
├── database/
│   ├── migrations/        # Migraciones
│   ├── seeders/           # Seeders
│   └── factories/         # Factories para testing
├── config/                # Configuración (app, auth, database, mail, etc.)
├── public/                # Punto de entrada web
│   └── index.php          # Archivo principal
├── tests/                 # Tests automatizados
├── composer.json          # Dependencias de PHP
├── package.json           # Dependencias de Node.js
└── vite.config.ts         # Configuración de Vite
```

### Rutas Disponibles

**Públicas:**
- `GET /` - Página principal
- `GET /products` - Catálogo de productos
- `GET /products/search` - Búsqueda de productos
- `GET /products/{id}` - Detalle de producto
- `GET /cart` - Carrito de compras
- `GET /about` - Página acerca de
- `GET /contact` - Contacto
- `GET /faq` - Preguntas frecuentes
- `GET /privacy` - Política de privacidad
- `GET /terms` - Términos de servicio
- `GET /cookies` - Política de cookies
- `GET /shipping` - Información de envíos

**Carrito:**
- `POST /cart/add/{product}` - Agregar producto al carrito
- `PATCH /cart/update/{item}` - Actualizar cantidad del item
- `DELETE /cart/remove/{item}` - Eliminar item del carrito
- `DELETE /cart/clear` - Vaciar carrito

**Autenticación:**
- `GET /register` - Formulario de registro
- `POST /register` - Registrar usuario
- `GET /login` - Formulario de login
- `POST /login` - Iniciar sesión
- `POST /logout` - Cerrar sesión
- `GET /forgot-password` - Solicitar reset de contraseña
- `POST /forgot-password` - Enviar enlace de reset
- `GET /reset-password/{token}` - Formulario de reset
- `POST /reset-password` - Actualizar contraseña
- `GET /verify-email` - Verificar email
- `GET /verify-email/{id}/{hash}` - Confirmar verificación
- `POST /email/verification-notification` - Reenviar verificación
- `GET /confirm-password` - Confirmar contraseña
- `POST /confirm-password` - Validar confirmación

**Checkout y Pagos:**
- `POST /checkout` - Procesar pago
- `GET /success` - Confirmación de pago exitoso
- `GET /cancel` - Cancelación de pago
- `POST /webhook` - Webhook de Stripe

**Usuario Autenticado:**
- `GET /dashboard` - Panel del usuario
- `GET /settings/profile` - Editar perfil
- `PATCH /settings/profile` - Actualizar perfil
- `DELETE /settings/profile` - Eliminar cuenta
- `GET /settings/password` - Cambiar contraseña
- `PUT /settings/password` - Actualizar contraseña
- `GET /settings/appearance` - Preferencias de apariencia

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
