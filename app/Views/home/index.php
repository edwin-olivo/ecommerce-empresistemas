<!-- Hero Section -->
<section class="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-16">
    <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center">
            <h1 class="text-5xl font-bold mb-6">Bienvenido a <?= APP_NAME ?></h1>
            <p class="text-xl mb-8 text-primary-100">Descubre los mejores productos con la mejor calidad y precios increíbles</p>
            <div class="flex justify-center space-x-4 sm:flex-row sm:items-center space-y-4 sm:space-y-0 flex-col">
                <a href="<?= Router::url('/productos') ?>" class="w-full sm:w-auto bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300">
                    Ver Productos
                </a>
                <a href="<?= Router::url('/ofertas') ?>" class="w-full sm:w-auto border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition duration-300">
                    Ofertas Especiales
                </a>
            </div>
        </div>
    </div>
</section>

<!-- Productos Destacados -->
<section class="py-16 bg-gray-100">
    <div class="container mx-auto px-4">
        <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-800 mb-4">Productos Destacados</h2>
            <p class="text-gray-600">Los productos más populares seleccionados especialmente para ti</p>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <?php if (isset($featuredProducts) && $featuredProducts): ?>
                <?php foreach ($featuredProducts as $product): ?>
                    <?php include '../app/Views/components/ProductCard.php'; ?>
                <?php endforeach; ?>
            <?php else: ?>
                <div class="col-span-full text-center py-12">
                    <i class="fas fa-box-open text-6xl text-gray-300 mb-4"></i>
                    <h3 class="text-xl text-gray-500 mb-2">No hay productos destacados</h3>
                    <p class="text-gray-400">Pronto agregaremos productos increíbles</p>
                </div>
            <?php endif; ?>
        </div>
        
        <div class="text-center mt-12">
            <a href="<?= Router::url('/productos') ?>" class="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition duration-300">
                Ver Todos los Productos
            </a>
        </div>
    </div>
</section>

<!-- Features -->
<section class="py-16">
    <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="text-center">
                <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-shipping-fast text-2xl text-green-600"></i>
                </div>
                <h3 class="text-xl font-semibold mb-2">Envío Gratis</h3>
                <p class="text-gray-600">En compras mayores a $1,000 MXN</p>
            </div>
            <div class="text-center">
                <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-shield-alt text-2xl text-blue-600"></i>
                </div>
                <h3 class="text-xl font-semibold mb-2">Compra Segura</h3>
                <p class="text-gray-600">Pagos protegidos con Stripe</p>
            </div>
            <div class="text-center">
                <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-headset text-2xl text-purple-600"></i>
                </div>
                <h3 class="text-xl font-semibold mb-2">Soporte 24/7</h3>
                <p class="text-gray-600">Atención al cliente siempre disponible</p>
            </div>
        </div>
    </div>
</section>
