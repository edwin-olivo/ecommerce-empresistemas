# Ecommerce PHP

## 1. Resumen del proyecto

Crear una **plataforma ecommerce** sencilla pero completa donde clientes puedan navegar productos, añadir al carrito, pagar y ver órdenes; y administradores puedan gestionar pedidos y usuarios. Implementación en Laravel 12+, con API RESTful y vistas Blade o Inertia/Livewire (React).

## 2. Objetivos

* MVP funcional listo para pruebas manuales: catálogo, carrito, checkout (simulado + pasarela), panel administrador.
* Seguridad básica (autenticación, autorización, validaciones).

## 3. Alcance

Incluye:

* Frontend para cliente (vistas): home, catálogo, producto (detalles dle producto), carrito, checkout (intregración Stripe), cuenta (pedidos, direcciones, datos personales).
* Backend/Admin (panel): pedidos, usuarios.
* Integración con al menos 1 pasarela de pago (Stripe, modo prueba).
* Soporte para múltiples direcciones por usuario.
* Notificaciones por email (pedido confirmado, cambio de estado).

## Rutas de la Aplicación

### Home y Navegación

* `GET /` - Página principal del ecommerce
* `GET /home` - Página principal (alternativa)

### Catálogo de Productos

* `GET /productos` - Lista de productos con filtros (category, subcategory, brand, search, sortBy) y paginación (page, limit)
* `GET /productos/{id}` - Detalle de un producto específico

### Categorías

* `GET /categorias` - Lista de categorías (redirige a productos con filtro de categoría)

### Ofertas Especiales

* `GET /ofertas` - Lista de ofertas y productos en descuento con filtros y paginación

### Carrito de Compras

* `GET /carrito` - Vista del carrito de compras
* `POST /carrito/datos` - Obtener datos del carrito (AJAX)
* `GET /carrito/agregar` - Agregar producto al carrito (AJAX)
* `GET /carrito/remover` - Remover producto del carrito (AJAX)
* `GET /carrito/actualizar` - Actualizar cantidad de producto en carrito (AJAX)

### Procesamiento de Pagos

* `POST /pago/confirmar` - Confirmar y procesar pago con Stripe
* `GET /pago/exito` - Página de confirmación de pago exitoso
* `GET /pago/cancelar` - Página cuando se cancela el pago
* `POST /pago/webhook` - Webhook para notificaciones de Stripe

### Autenticación y Sesión

* `GET /login` - Formulario de inicio de sesión
* `POST /login` - Procesar login (email, password)
* `GET /logout` - Cerrar sesión
* `GET /registro` - Formulario de registro de usuario
* `POST /registro` - Procesar registro de nuevo usuario

### Perfil de Usuario (Rutas Protegidas)

* `GET /perfil` - Información del usuario y direcciones
* `POST /perfil` - Actualizar información personal del usuario
* `POST /perfil/direccion` - Actualizar/agregar dirección del usuario
* `POST /perfil/password` - Cambiar contraseña del usuario
* `POST /perfil/preferencias` - Actualizar preferencias del usuario
* `GET /perfil/ordenes` - Historial de órdenes del usuario

### Contacto

* `GET /contacto` - Página de información de contacto