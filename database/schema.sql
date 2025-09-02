-- Elimina claves foráneas si existen
ALTER TABLE
  `order_items` DROP FOREIGN KEY IF EXISTS `fk_order_items_orders`;

ALTER TABLE
  `orders` DROP FOREIGN KEY IF EXISTS `fk_orders_users`;

ALTER TABLE
  `addresses` DROP FOREIGN KEY IF EXISTS `fk_addresses_users`;

-- Elimina las tablas si existen (en orden inverso por dependencias)
DROP TABLE IF EXISTS `order_items`;

DROP TABLE IF EXISTS `orders`;

DROP TABLE IF EXISTS `addresses`;

DROP TABLE IF EXISTS `users`;

-- Tabla de usuarios
CREATE TABLE `users` (
  `id` varchar(36) NOT NULL,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `remember_token` varchar(255) DEFAULT NULL,
  `email_verified_at` datetime DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `idx_user_email` (`email`),
  KEY `idx_user_deleted` (`deleted`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Tabla de pedidos
CREATE TABLE `orders` (
  `id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `session_id` varchar(255) DEFAULT NULL,
  `payment_id` varchar(255) DEFAULT NULL,
  `payment_status` enum(
    'pending',
    'processing',
    'completed',
    'failed',
    'refunded',
    'cancelled'
  ) NOT NULL DEFAULT 'pending',
  `amount` decimal(10, 2) NOT NULL,
  `shipping_address` text DEFAULT NULL,
  `shipping_city` varchar(100) DEFAULT NULL,
  `shipping_postal_code` varchar(10) DEFAULT NULL,
  `shipping_country` varchar(100) DEFAULT NULL,
  `shipping_method` varchar(50) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_orders_users_idx` (`user_id`),
  KEY `idx_orders_payment_id` (`payment_id`),
  KEY `idx_orders_session_id` (`session_id`),
  KEY `idx_orders_deleted` (`deleted`),
  CONSTRAINT `fk_orders_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Tabla de items de pedido (detalles)
CREATE TABLE `order_items` (
  `id` varchar(36) NOT NULL,
  `order_id` varchar(36) NOT NULL,
  `product_id` varchar(36) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_price` decimal(10, 2) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `subtotal` decimal(10, 2) NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_order_items_orders_idx` (`order_id`),
  KEY `idx_order_items_deleted` (`deleted`),
  CONSTRAINT `fk_order_items_orders` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Tabla de direcciones
CREATE TABLE `addresses` (
  `id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `type` enum('billing', 'shipping', 'both') NOT NULL DEFAULT 'both',
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `company` varchar(100) DEFAULT NULL,
  `address_line_1` varchar(255) NOT NULL,
  `address_line_2` varchar(255) DEFAULT NULL,
  `city` varchar(100) NOT NULL,
  `state` varchar(100) DEFAULT NULL,
  `postal_code` varchar(20) NOT NULL,
  `country` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `is_default` tinyint(1) NOT NULL DEFAULT 0,
  `deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_addresses_users_idx` (`user_id`),
  KEY `idx_addresses_type` (`type`),
  KEY `idx_addresses_default` (`is_default`),
  KEY `idx_addresses_deleted` (`deleted`),
  CONSTRAINT `fk_addresses_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Inserta los usuarios de ejemplo
INSERT INTO
  `users` (
    `id`,
    `email`,
    `name`,
    `phone`,
    `deleted`,
    `created_at`
  )
VALUES
  (
    '5e5d5e78-5000-4d2d-a84d-a90c17680cb5',
    'user1@example.com',
    'User One',
    '+52 123 456 789',
    0,
    '2025-08-07 12:00:00'
  ),
  (
    'a655c91e-3867-43e4-899b-0cf173668d99',
    'user2@example.com',
    'User Two',
    '+52 987 654 321',
    0,
    '2025-08-07 12:00:00'
  );

-- Inserta las direcciones de ejemplo
INSERT INTO
  `addresses` (
    `id`,
    `user_id`,
    `type`,
    `first_name`,
    `last_name`,
    `address_line_1`,
    `city`,
    `state`,
    `postal_code`,
    `country`,
    `phone`,
    `is_default`,
    `deleted`,
    `created_at`
  )
VALUES
  (
    '4a3b1633-28fd-4e14-925a-d0a6709ddde0',
    '5e5d5e78-5000-4d2d-a84d-a90c17680cb5',
    'both',
    'User',
    'One',
    'Calle Ejemplo 123',
    'Tepic',
    'Nayarit',
    '63100',
    'México',
    '+52 123 456 789',
    1,
    0,
    '2025-08-07 12:00:00'
  ),
  (
    'cc04f536-9270-4ca0-80ec-a312c2dfbd89',
    'a655c91e-3867-43e4-899b-0cf173668d99',
    'both',
    'User',
    'Two',
    'Avenida Ejemplo 456',
    'Tepic',
    'Nayarit',
    '63100',
    'México',
    '+52 987 654 321',
    1,
    0,
    '2025-08-07 12:00:00'
  ),
  (
    'e5ede352-0dfa-4fc1-bf9b-d34b6e3614be',
    '5e5d5e78-5000-4d2d-a84d-a90c17680cb5',
    'shipping',
    'User',
    'One',
    'Oficina Central 789',
    'Guadalajara',
    'Jalisco',
    '44100',
    'México',
    '+52 123 456 789',
    0,
    0,
    '2025-08-07 12:00:00'
  );