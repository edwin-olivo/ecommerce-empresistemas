<?php
// Obtener todas las imágenes del producto
$breadcrumbs = [
    ['label' => 'Productos', 'url' => Router::url('/productos')],
    ['label' => htmlspecialchars($product['name']), 'url' => '']
];
?>

<div class="container mx-auto px-4 py-8">
    <!-- Breadcrumbs -->
    <?php include '../app/Views/components/Breadcrumb.php'; ?>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Galería de imágenes -->
        <div class="space-y-4">
            <!-- Imagen principal -->
            <div class="relative">
                <img
                    id="main-image"
                    src="<?= ImageHelper::getImageWithFallback($product['image_url'] ?? null, 'original') ?>"
                    alt="<?= htmlspecialchars($product['name']) ?>"
                    class="w-full h-96 object-cover rounded-lg border border-gray-200">
            </div>
        </div>

        <!-- Información del producto -->
        <div class="space-y-6">
            <!-- Categoría y marca -->
            <div class="flex items-center justify-between">
                <?php if (!empty($product['category'])): ?>
                    <span class="text-sm text-gray-500 uppercase tracking-wide">
                        <?= htmlspecialchars($product['category']) ?>
                    </span>
                <?php endif; ?>
                <?php if (!empty($product['brand'])): ?>
                    <span class="text-sm text-gray-500 font-medium">
                        <?= htmlspecialchars($product['brand']) ?>
                    </span>
                <?php endif; ?>
            </div>

            <!-- Nombre del producto -->
            <h1 class="text-3xl font-bold text-gray-900">
                <?= htmlspecialchars($product['name']) ?>
            </h1>

            <!-- SKU -->
            <?php if (!empty($product['sku'])): ?>
                <p class="text-sm text-gray-500">
                    <span class="font-medium">SKU:</span> <?= htmlspecialchars($product['sku']) ?>
                </p>
            <?php endif; ?>

            <!-- Precio -->
            <div class="space-y-2">
                <?php if (!empty($product['promo_price']) && $product['promo_price'] > 0): ?>
                    <!-- Precio en promoción -->
                    <div class="flex items-center space-x-3">
                        <span class="text-3xl font-bold text-red-600">
                            $<?= number_format($product['promo_price'], 2) ?>
                        </span>
                        <span class="text-xl text-gray-500 line-through">
                            $<?= number_format($product['price'], 2) ?>
                        </span>
                        <span class="bg-red-100 text-red-800 text-sm px-2 py-1 rounded">
                            <?= round((($product['price'] - $product['promo_price']) / $product['price']) * 100) ?>% OFF
                        </span>
                    </div>
                    <?php if (!empty($product['promo_start']) && !empty($product['promo_end'])): ?>
                        <p class="text-sm text-red-600">
                            <i class="fas fa-clock mr-1"></i>
                            Oferta válida del <?= date('d/m/Y', strtotime($product['promo_start'])) ?>
                            al <?= date('d/m/Y', strtotime($product['promo_end'])) ?>
                        </p>
                    <?php endif; ?>
                <?php elseif (!empty($product['sale_price']) && $product['sale_price'] > 0): ?>
                    <!-- Precio de oferta -->
                    <div class="flex items-center space-x-3">
                        <span class="text-3xl font-bold text-primary-600">
                            $<?= number_format($product['sale_price'], 2) ?>
                        </span>
                        <span class="text-xl text-gray-500 line-through">
                            $<?= number_format($product['price'], 2) ?>
                        </span>
                    </div>
                <?php else: ?>
                    <!-- Precio normal -->
                    <span class="text-3xl font-bold text-gray-900">
                        $<?= number_format($product['price'], 2) ?>
                    </span>
                <?php endif; ?>
            </div>

            <!-- Descripción -->
            <?php if (!empty($product['description'])): ?>
                <div class="prose prose-sm max-w-none">
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">Descripción</h3>
                    <p class="text-gray-700 leading-relaxed">
                        <?= nl2br(htmlspecialchars($product['description'])) ?>
                    </p>
                </div>
            <?php endif; ?>

            <!-- Detalles adicionales -->
            <div class="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <?php if (!empty($product['unit'])): ?>
                    <div>
                        <span class="text-sm font-medium text-gray-500">Unidad:</span>
                        <span class="text-sm text-gray-900"><?= htmlspecialchars($product['unit']) ?></span>
                    </div>
                <?php endif; ?>
            </div>

            <!-- Controles de cantidad y compra -->
            <div class="space-y-4">
                <div class="flex items-center space-x-4">
                    <label for="quantity" class="text-sm font-medium text-gray-700">Cantidad:</label>
                    <div class="flex items-center border border-gray-300 rounded-md">
                        <button
                            type="button"
                            class="qty-minus px-3 py-2 text-gray-600 hover:text-gray-800 cursor-pointer"
                            title="Disminuir cantidad">
                            <i class="fas fa-minus pointer-events-none"></i>
                        </button>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            value="1"
                            min="1"
                            class="w-16 px-3 py-2 text-center border-0 focus:outline-none">
                        <button
                            type="button"
                            class="qty-plus px-3 py-2 text-gray-600 hover:text-gray-800 cursor-pointer"
                            title="Aumentar cantidad">
                            <i class="fas fa-plus pointer-events-none"></i>
                        </button>
                    </div>
                </div>

                <!-- Botones de acción -->
                <div class="space-y-3">
                    <button
                        type="button"
                        onclick="addToCart('<?= $product['id'] ?>', document.getElementById('quantity').value)"
                        class="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2">
                        <i class="fas fa-shopping-cart"></i>
                        <span>Agregar al Carrito</span>
                    </button>

                    <button
                        type="button"
                        onclick="buyNow('<?= $product['id'] ?>')"
                        class="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
                        <i class="fas fa-bolt"></i>
                        <span>Comprar Ahora</span>
                    </button>
                </div>
            </div>

            <!-- Información de envío -->
            <div class="border-t pt-6">
                <div class="space-y-3">
                    <div class="flex items-center text-sm text-gray-600">
                        <i class="fas fa-truck text-green-600 mr-2"></i>
                        <span>Envío gratis en compras mayores a $1,000</span>
                    </div>
                    <div class="flex items-center text-sm text-gray-600">
                        <i class="fas fa-shield-alt text-blue-600 mr-2"></i>
                        <span>Garantía de calidad y seguridad</span>
                    </div>
                    <div class="flex items-center text-sm text-gray-600">
                        <i class="fas fa-undo text-orange-600 mr-2"></i>
                        <span>Devoluciones sin costo dentro de 30 días</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>