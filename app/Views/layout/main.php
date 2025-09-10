<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $title ?? APP_NAME ?></title>
    <meta name="description" content="<?= $metaDescription ?? 'Tu tienda en línea de confianza' ?>">
    <!-- Favicon -->
    <link rel="icon" type="image/png" href="<?= Router::url('/assets/images/favicon.png') ?>">

    <!-- Font Awesome para iconos -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">

    <!-- CSS personalizado -->
    <link rel="stylesheet" href="<?= Router::url('/assets/css/styles.css') ?>">
</head>

<body class="bg-gray-50 <?= $pageClass ?? '' ?> overflow-x-hidden">

    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
        <!-- Top bar -->
        <div class="bg-gray-900 text-white text-sm">
            <div class="container mx-auto px-4 py-2">
                <div class="flex justify-between items-center">
                    <div class="flex flex-col items-start md:flex-row md:items-center md:space-x-4">
                        <span>📧 contacto@ecommerce.com</span>
                        <span>📞 +52 55 1234 5678</span>
                    </div>
                    <div>
                        <?php if (isset($_SESSION['user']['id'])): ?>
                            <a href="<?= Router::url('/perfil') ?>" class="hover:text-primary-300">Mi Perfil</a>
                            <span class="mx-2">|</span>
                            <a href="<?= Router::url('/logout') ?>" class="hover:text-primary-300">Cerrar Sesión</a>
                        <?php else: ?>
                            <a href="<?= Router::url('/login') ?>" class="hover:text-primary-300">Iniciar Sesión</a>
                            <span class="mx-2">|</span>
                            <a href="<?= Router::url('/registro') ?>" class="hover:text-primary-300">Registrarse</a>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </div>

        <!-- Main header -->
        <div class="container mx-auto px-4 py-4">
            <div class="flex items-center justify-between">
                <!-- Logo -->
                <div class="flex items-center">
                    <a href="<?= Router::url('/') ?>" class="text-2xl font-bold text-primary-600">
                        🛒 <?= APP_NAME ?>
                    </a>
                </div>

                <!-- Search bar -->
                <div class="hidden md:block flex-1 max-w-lg mx-8">
                    <form action="<?= Router::url('/productos') ?>" method="GET" class="relative">
                        <input
                            type="text"
                            name="search"
                            placeholder="Buscar productos..."
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            value="<?= $_GET['search'] ?? '' ?>">
                        <button type="submit" class="absolute right-2 top-2 text-gray-500 hover:text-primary-600">
                            <i class="fas fa-search"></i>
                        </button>
                    </form>
                </div>

                <!-- Cart & User Menu -->
                <div class="flex items-center space-x-4">
                    <!-- User menu (only show when logged in) -->
                    <?php if (isset($_SESSION['user']['id'])): ?>
                        <div class="relative group">
                            <button class="flex items-center text-gray-700 hover:text-primary-600">
                                <i class="fas fa-user text-xl mr-1"></i>
                                <i class="fas fa-chevron-down text-sm"></i>
                            </button>
                            <div class="absolute right-0 top-full bg-white text-gray-800 shadow-lg rounded-md py-2 w-48 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 z-50">
                                <a href="<?= Router::url('/perfil') ?>" class="block px-4 py-2 hover:bg-gray-100">
                                    <i class="fas fa-user mr-2"></i>Mi Perfil
                                </a>
                                <a href="<?= Router::url('/perfil#orders') ?>" class="block px-4 py-2 hover:bg-gray-100">
                                    <i class="fas fa-box mr-2"></i>Mis Pedidos
                                </a>
                                <div class="border-t border-gray-200 my-1"></div>
                                <a href="<?= Router::url('/logout') ?>" class="block px-4 py-2 hover:bg-gray-100 text-red-600">
                                    <i class="fas fa-sign-out-alt mr-2"></i>Cerrar Sesión
                                </a>
                            </div>
                        </div>
                    <?php else: ?>
                        <a href="<?= Router::url('/login') ?>" class="text-gray-700 hover:text-primary-600">
                            <i class="fas fa-user text-xl"></i>
                        </a>
                    <?php endif; ?>

                    <!-- Cart -->
                    <a href="<?= Router::url('/carrito') ?>" class="relative text-gray-700 hover:text-primary-600">
                        <i class="fas fa-shopping-cart text-2xl"></i>
                        <span id="cart-count" class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
                    </a>
                </div>
            </div>
        </div>

        <!-- Navigation -->
        <nav class="bg-primary-600 text-white">
            <div class="container mx-auto px-4">
                <div class="flex items-center space-x-8 py-3">
                    <a href="<?= Router::url('/') ?>" class="hover:text-primary-200">Inicio</a>
                    <a href="<?= Router::url('/productos') ?>" class="hover:text-primary-200">Productos</a>

                    <!-- Dropdown categorías -->
                    <div class="relative group">
                        <button class="hover:text-primary-200 flex items-center">
                            Categorías <i class="fas fa-chevron-down ml-1"></i>
                        </button>
                        <div class="absolute top-full left-0 bg-white text-gray-800 shadow-lg rounded-md py-2 w-48 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 z-50">
                            <?php if (isset($categories) && $categories): ?>
                                <?php foreach ($categories as $key => $label): ?>
                                    <a href="<?= Router::url('/categorias?category=' . $key) ?>" class="block px-4 py-2 hover:bg-gray-100">
                                        <?= htmlspecialchars($label) ?>
                                    </a>
                                <?php endforeach; ?>
                            <?php endif; ?>
                        </div>
                    </div>

                    <a href="<?= Router::url('/ofertas') ?>" class="hover:text-primary-200">Ofertas</a>
                    <a href="<?= Router::url('/contacto') ?>" class="hover:text-primary-200">Contacto</a>
                </div>
            </div>
        </nav>
    </header>

    <!-- Main content -->
    <main class="min-h-screen">
        <?= $content ?>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white mt-16">
        <div class="container mx-auto px-4 py-12">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <!-- Company info -->
                <div>
                    <h3 class="text-lg font-semibold mb-4"><?= APP_NAME ?></h3>
                    <p class="text-gray-400 mb-4">Tu tienda en línea de confianza con los mejores productos y precios.</p>
                    <div class="flex space-x-4">
                        <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-facebook"></i></a>
                        <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-twitter"></i></a>
                        <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>

                <!-- Quick links -->
                <div>
                    <h3 class="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
                    <ul class="space-y-2">
                        <li><a href="<?= Router::url('/') ?>" class="text-gray-400 hover:text-white">Inicio</a></li>
                        <li><a href="<?= Router::url('/productos') ?>" class="text-gray-400 hover:text-white">Productos</a></li>
                        <!-- <li><a href="<?= Router::url('/ofertas') ?>" class="text-gray-400 hover:text-white">Ofertas</a></li> -->
                        <!-- <li><a href="<?= Router::url('/contacto') ?>" class="text-gray-400 hover:text-white">Contacto</a></li> -->
                    </ul>
                </div>

                <!-- Customer service -->
                <div>
                    <h3 class="text-lg font-semibold mb-4">Atención al Cliente</h3>
                    <ul class="space-y-2">
                        <li><a href="#" class="text-gray-400 hover:text-white">Preguntas Frecuentes</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white">Política de Devoluciones</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white">Términos y Condiciones</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white">Política de Privacidad</a></li>
                    </ul>
                </div>

                <!-- Contact info -->
                <div>
                    <h3 class="text-lg font-semibold mb-4">Contacto</h3>
                    <div class="space-y-2 text-gray-400">
                        <p><i class="fas fa-map-marker-alt mr-2"></i>Ciudad de México, México</p>
                        <p><i class="fas fa-phone mr-2"></i>+52 55 1234 5678</p>
                        <p><i class="fas fa-envelope mr-2"></i>contacto@ecommerce.com</p>
                    </div>
                </div>
            </div>

            <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                <p>&copy; <?= date('Y') ?> <?= APP_NAME ?>. Todos los derechos reservados.</p>
            </div>
        </div>
    </footer>

    <!-- Rutas -->
    <script>
        const appName = '<?= APP_NAME ?>';
        const baseUrl = '<?= Router::url('/') ?>';
        const apiUrl = '<?= Router::url('/api') ?>';
        const cartDataUrl = '<?= Router::url('/carrito/datos') ?>';
        const placeHolderImage = '<?= Router::url('/assets/images/placeholder-product.png') ?>';
    </script>

    <!-- JavaScript -->
    <script src="<?= Router::url('/assets/js/ecommerce-app.js') ?>"></script>
    <script src="<?= Router::url('/assets/js/cart.js') ?>"></script>
    <script src="<?= Router::url('/assets/js/cartpage.js') ?>"></script>
    <script src="<?= Router::url('/assets/js/loginpage.js') ?>"></script>
    <script src="<?= Router::url('/assets/js/app.js') ?>"></script>

    <!-- Toast notifications -->
    <div id="toast-container" class="fixed top-4 right-4 z-50"></div>

</body>

</html>