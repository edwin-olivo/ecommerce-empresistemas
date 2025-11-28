# Ecommerce (Laravel + Inertia + React)

Este proyecto es una tienda en línea pensada para que cualquier persona pueda explorar productos, armar su carrito y completar una compra de forma sencilla y segura. La idea es ofrecer una experiencia clara y rápida, con pantallas limpias y tiempos de carga mínimos.

Desde la perspectiva de quien compra, el recorrido es muy directo: ver el catálogo, elegir productos, añadirlos al carrito, revisar el resumen del pedido y avanzar al pago. El sistema registra los pedidos y conserva el estado del carrito para que no se pierda el progreso. La integración de pagos está preparada para conectarse con Stripe, lo que permitirá transacciones confiables cuando se active.

Detrás de escena, la aplicación está construida con herramientas modernas que priorizan el rendimiento y la facilidad de mantenimiento. Esto se traduce en una navegación fluida (sin recargas completas de página) y en una base sólida para seguir creciendo sin comprometer la estabilidad.

Hoy el núcleo del sistema ya está armado: existe la estructura para usuarios, carritos y órdenes; hay páginas y componentes listos para montar la experiencia; y el flujo de carrito funciona de manera consistente. También hay pruebas iniciales que ayudan a cuidar la calidad a medida que se incorporan nuevas funciones.

¿Qué sigue? Definir bien las reglas del negocio (envíos, impuestos, promociones), conectar los pagos en vivo con Stripe, y pulir detalles de la experiencia (mensajes de error claros, estados vacíos, confirmaciones). Con eso, el camino a un primer lanzamiento quedaría muy cercano.

En pocas palabras: es una base de e‑commerce lista para evolucionar. Permite vender productos de forma clara, ofrece una experiencia rápida para las personas usuarias y está preparada para crecer con nuevas funciones según lo pida el negocio.