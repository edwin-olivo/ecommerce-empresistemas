# Ecommerce PHP

## 1. Resumen del proyecto

Crear una **plataforma ecommerce** sencilla pero completa donde clientes puedan navegar productos, añadir al carrito, pagar y ver órdenes; y administradores puedan gestionar pedidos y usuarios. Implementación en Laravel 12+, con API RESTful y vistas Blade o Inertia/Livewire (React).

## 2. Objetivos

* MVP funcional listo para pruebas manuales: catálogo, carrito, checkout (simulado + pasarela), panel administrador.
* API RESTful para frontend y/o integraciones.
* Seguridad básica (autenticación, autorización, validaciones).

## 3. Alcance

Incluye:

* Frontend para cliente (vistas): home, catálogo, producto (detalles dle producto), carrito, checkout (intregración Stripe), cuenta (pedidos, direcciones, datos personales).
* Backend/Admin (panel): pedidos, usuarios.
* API REST para todas las operaciones principales.
* Integración con al menos 1 pasarela de pago (Stripe, modo prueba).
* Soporte para múltiples direcciones por usuario.
* Notificaciones por email (pedido confirmado, cambio de estado).

## API REST — Endpoints (JSON)

### Catalogo

* `GET /productos` — lista (filtros: category, search, sortBy; paginación: page, limit)
* `GET /productos/{id}` — detalle producto
* `GET /categorias` — lista categorías (filtros: category, search, sortBy; paginación: page, limit)
* `GET /ofertas` — lista ofertas (filtros: category, search, sortBy; paginación: page, limit)

### Carrito

* `GET /carrito` - detalle carrito
* `POST /carrito/datos` - detalle carrito
* `GET /carrito/agregar` - agregar item
* `GET /carrito/remover` - remover item
* `GET /carrito/actualizar` - modificar cantidad item

### Sesión

* `GET /login` - formulario
* `POST /login` - login (email, password)
* `GET /logout` - modificar cantidad item
* `GET /registro` - formulario
* `POST /registro` - registro (email, password)

### Usuarios

* `GET /perfil` - info usuario y direcciones
* `POST /perfil` - modificar info usuario
* `GET /perfil/direccion` - modificar info dirección
* `GET /perfil/password` - modificar info contraseña
* `GET /perfil/preferencias` - modificar preferencias