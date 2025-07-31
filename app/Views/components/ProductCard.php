<div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group">
    <!-- Imagen del producto -->
    <div class="relative h-48 bg-gray-100">
        <img
            src="<?= ImageHelper::getImageWithFallback(null, 'medium') ?>"
            alt="<?= htmlspecialchars($product['name']) ?>"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy">

        <!-- Badges -->
        <div class="absolute top-2 left-2 flex flex-col space-y-1">
            <?php if (!empty($product['is_new']) && $product['is_new'] == 1): ?>
                <span class="bg-green-500 text-white text-xs px-2 py-1 rounded-full">Nuevo</span>
            <?php endif; ?>
            <?php if (!empty($product['featured']) && $product['featured'] == 1): ?>
                <span class="bg-primary-500 text-white text-xs px-2 py-1 rounded-full">Destacado</span>
            <?php endif; ?>
            <?php if (!empty($product['best_seller']) && $product['best_seller'] == 1): ?>
                <span class="bg-red-500 text-white text-xs px-2 py-1 rounded-full">Más Vendido</span>
            <?php endif; ?>
        </div>

        <!-- Botón de vista rápida -->
        <div class="absolute inset-0 hover:bg-black/20 transition-all ease-in-out flex items-center justify-center">
            <a
                href="<?= Router::url('/productos/' . $product['id']) ?>"
                class="bg-white text-primary-600 px-4 py-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary-50">
                Ver Producto
            </a>
        </div>
    </div>

    <!-- Información del producto -->
    <div class="p-4">
        <!-- Categoría y marca -->
        <div class="flex justify-between items-start mb-2">
            <?php if (!empty($product['category'])): ?>
                <span class="text-xs text-gray-500 uppercase tracking-wide">
                    <?= htmlspecialchars($product['category']) ?>
                </span>
            <?php endif; ?>
            <?php if (!empty($product['brand'])): ?>
                <span class="text-xs text-gray-500">
                    <?= htmlspecialchars($product['brand']) ?>
                </span>
            <?php endif; ?>
        </div>

        <!-- Nombre del producto -->
        <h3 class="font-semibold text-gray-900 mb-2 line-clamp-2">
            <a href="<?= Router::url('/productos/' . $product['id']) ?>" class="hover:text-primary-600">
                <?= htmlspecialchars($product['name']) ?>
            </a>
        </h3>

        <!-- SKU -->
        <?php if (!empty($product['sku'])): ?>
            <p class="text-xs text-gray-500 mb-2">SKU: <?= htmlspecialchars($product['sku']) ?></p>
        <?php endif; ?>

        <!-- Precio -->
        <div class="flex items-center justify-between mb-3">
            <div class="flex items-center space-x-2">
                <?php if (!empty($product['promo_price']) && $product['promo_price'] > 0): ?>
                    <!-- Precio en promoción -->
                    <span class="text-lg font-bold text-red-600">
                        $<?= number_format($product['promo_price'], 2) ?>
                    </span>
                    <span class="text-sm text-gray-500 line-through">
                        $<?= number_format($product['price'], 2) ?>
                    </span>
                <?php elseif (!empty($product['sale_price']) && $product['sale_price'] > 0): ?>
                    <!-- Precio de oferta -->
                    <span class="text-lg font-bold text-primary-600">
                        $<?= number_format($product['sale_price'], 2) ?>
                    </span>
                    <span class="text-sm text-gray-500 line-through">
                        $<?= number_format($product['price'], 2) ?>
                    </span>
                <?php else: ?>
                    <!-- Precio normal -->
                    <span class="text-lg font-bold text-gray-900">
                        $<?= number_format($product['price'], 2) ?>
                    </span>
                <?php endif; ?>
            </div>
        </div>

        <!-- Botón agregar al carrito -->
        <button
            type="button"
            onclick="addToCart('<?= $product['id'] ?>')"
            class="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2">
            <i class="fas fa-shopping-cart"></i>
            <span>Agregar al Carrito</span>
        </button>
    </div>
</div>