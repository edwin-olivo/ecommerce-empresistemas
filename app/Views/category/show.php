<div class="container mx-auto px-4 py-8">
    <!-- Breadcrumbs -->
    <nav class="flex mb-6" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
            <li class="inline-flex items-center">
                <a href="<?= Router::url('/') ?>" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary-600">
                    <i class="fas fa-home mr-2"></i>
                    Inicio
                </a>
            </li>
            <li>
                <div class="flex items-center">
                    <i class="fas fa-chevron-right text-gray-400 mx-2"></i>
                    <span class="text-sm font-medium text-gray-500">Productos</span>
                </div>
            </li>
        </ol>
    </nav>

    <div class="flex flex-col lg:flex-row gap-8">
        <!-- Sidebar de filtros -->
        <aside class="lg:w-1/4">
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Filtros</h3>
                
                <form id="filters-form" method="GET" action="<?= Router::url('/productos') ?>">
                    <!-- Buscador -->
                    <div class="mb-6">
                        <label for="search" class="block text-sm font-medium text-gray-700 mb-2">Buscar</label>
                        <input 
                            type="text" 
                            id="search" 
                            name="search" 
                            value="<?= htmlspecialchars($_GET['search'] ?? '') ?>"
                            placeholder="Nombre del producto..."
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                    </div>

                    <!-- Categorías -->
                    <div class="mb-6">
                        <label for="category" class="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
                        <select 
                            id="category" 
                            name="category" 
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                            <option value="">Todas las categorías</option>
                            <?php if (isset($categories) && is_array($categories)): ?>
                                <?php foreach ($categories as $cat): ?>
                                    <option value="<?= htmlspecialchars($cat) ?>" 
                                            <?= ($cat === ($_GET['category'] ?? '')) ? 'selected' : '' ?>>
                                        <?= htmlspecialchars($cat) ?>
                                    </option>
                                <?php endforeach; ?>
                            <?php endif; ?>
                        </select>
                    </div>

                    <!-- Marcas -->
                    <div class="mb-6">
                        <label for="brand" class="block text-sm font-medium text-gray-700 mb-2">Marca</label>
                        <select 
                            id="brand" 
                            name="brand" 
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                            <option value="">Todas las marcas</option>
                            <?php if (isset($brands) && is_array($brands)): ?>
                                <?php foreach ($brands as $brand): ?>
                                    <option value="<?= htmlspecialchars($brand) ?>" 
                                            <?= ($brand === ($_GET['brand'] ?? '')) ? 'selected' : '' ?>>
                                        <?= htmlspecialchars($brand) ?>
                                    </option>
                                <?php endforeach; ?>
                            <?php endif; ?>
                        </select>
                    </div>

                    <!-- Ordenamiento -->
                    <div class="mb-6">
                        <label for="sortBy" class="block text-sm font-medium text-gray-700 mb-2">Ordenar por</label>
                        <select 
                            id="sortBy" 
                            name="sortBy" 
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                            <option value="name" <?= ($_GET['sortBy'] ?? '') === 'name' ? 'selected' : '' ?>>Nombre A-Z</option>
                            <option value="price" <?= ($_GET['sortBy'] ?? '') === 'price' ? 'selected' : '' ?>>Precio: Menor a Mayor</option>
                            <option value="date_entered" <?= ($_GET['sortBy'] ?? '') === 'date_entered' ? 'selected' : '' ?>>Más Recientes</option>
                        </select>
                    </div>

                    <!-- Botones -->
                    <div class="flex space-x-2">
                        <button 
                            type="submit" 
                            class="flex-1 bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
                        >
                            Aplicar
                        </button>
                        <a 
                            href="<?= Router::url('/productos') ?>" 
                            class="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors text-center"
                        >
                            Limpiar
                        </a>
                    </div>
                </form>
            </div>
        </aside>

        <!-- Contenido principal -->
        <main class="lg:w-3/4">
            <!-- Header de resultados -->
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <div>
                    <h1 class="text-2xl font-bold text-gray-900 mb-2">Productos</h1>
                    <?php if (isset($data['pagination'])): ?>
                        <p class="text-gray-600">
                            Mostrando <?= count($data['products']) ?> de <?= $data['pagination']['total_records'] ?> productos
                        </p>
                    <?php endif; ?>
                </div>

                <!-- Vista de grid/lista -->
                <div class="flex items-center space-x-2 mt-4 sm:mt-0">
                    <button 
                        id="grid-view" 
                        class="p-2 border border-gray-300 rounded-md hover:bg-gray-50 active"
                        data-view="grid"
                    >
                        <i class="fas fa-th-large"></i>
                    </button>
                    <button 
                        id="list-view" 
                        class="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
                        data-view="list"
                    >
                        <i class="fas fa-list"></i>
                    </button>
                </div>
            </div>

            <!-- Grid de productos -->
            <div id="products-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <?php if (isset($data['products']) && !empty($data['products'])): ?>
                    <?php foreach ($data['products'] as $product): ?>
                        <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group">
                            <!-- Imagen del producto -->
                            <div class="relative h-48 bg-gray-100">
                                <img 
                                    src="<?= ImageHelper::getProductImageUrl(null, 'medium') ?>" 
                                    alt="<?= htmlspecialchars($product['name']) ?>"
                                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    loading="lazy"
                                >
                                
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
                                <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity flex items-center justify-center">
                                    <a 
                                        href="<?= Router::url('/producto/' . $product['id']) ?>" 
                                        class="bg-white text-primary-600 px-4 py-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary-50"
                                    >
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
                                    <a href="<?= Router::url('/producto/' . $product['id']) ?>" class="hover:text-primary-600">
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
                                    class="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
                                >
                                    <i class="fas fa-shopping-cart"></i>
                                    <span>Agregar al Carrito</span>
                                </button>
                            </div>
                        </div>
                    <?php endforeach; ?>
                <?php else: ?>
                    <!-- Sin productos -->
                    <div class="col-span-full text-center py-12">
                        <div class="text-gray-400 mb-4">
                            <i class="fas fa-box-open text-6xl"></i>
                        </div>
                        <h3 class="text-lg font-medium text-gray-900 mb-2">No se encontraron productos</h3>
                        <p class="text-gray-500 mb-4">Intenta ajustar tus filtros de búsqueda</p>
                        <a 
                            href="<?= Router::url('/productos') ?>" 
                            class="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                        >
                            Ver todos los productos
                        </a>
                    </div>
                <?php endif; ?>
            </div>

            <!-- Paginación -->
            <?php if (isset($data['pagination']) && $data['pagination']['total_pages'] > 1): ?>
                <div class="mt-8 flex justify-center">
                    <nav class="flex items-center space-x-2">
                        <?php 
                        $currentPage = $data['pagination']['current_page'];
                        $totalPages = $data['pagination']['total_pages'];
                        $currentUrl = $_SERVER['REQUEST_URI'];
                        $baseUrl = strtok($currentUrl, '?');
                        $currentParams = $_GET;
                        ?>

                        <!-- Página anterior -->
                        <?php if ($currentPage > 1): ?>
                            <?php 
                            $currentParams['page'] = $currentPage - 1;
                            $prevUrl = $baseUrl . '?' . http_build_query($currentParams);
                            ?>
                            <a href="<?= $prevUrl ?>" class="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                                <i class="fas fa-chevron-left"></i>
                            </a>
                        <?php endif; ?>

                        <!-- Números de página -->
                        <?php for ($i = max(1, $currentPage - 2); $i <= min($totalPages, $currentPage + 2); $i++): ?>
                            <?php 
                            $currentParams['page'] = $i;
                            $pageUrl = $baseUrl . '?' . http_build_query($currentParams);
                            ?>
                            <a 
                                href="<?= $pageUrl ?>" 
                                class="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-200 <?= $i == $currentPage ? 'bg-primary-600 text-white border-primary-600 hover:bg-primary-700 transition-colors' : '' ?>"
                            >
                                <?= $i ?>
                            </a>
                        <?php endfor; ?>

                        <!-- Página siguiente -->
                        <?php if ($currentPage < $totalPages): ?>
                            <?php 
                            $currentParams['page'] = $currentPage + 1;
                            $nextUrl = $baseUrl . '?' . http_build_query($currentParams);
                            ?>
                            <a href="<?= $nextUrl ?>" class="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                                <i class="fas fa-chevron-right"></i>
                            </a>
                        <?php endif; ?>
                    </nav>
                </div>
            <?php endif; ?>
        </main>
    </div>
</div>

<!-- JavaScript para funcionalidad -->
<script>
document.addEventListener('DOMContentLoaded', function() {
    // Cambio de vista grid/list
    const gridView = document.getElementById('grid-view');
    const listView = document.getElementById('list-view');
    const productsGrid = document.getElementById('products-grid');

    gridView.addEventListener('click', function() {
        productsGrid.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6';
        gridView.classList.add('bg-gray-100');
        listView.classList.remove('bg-gray-100');
    });

    listView.addEventListener('click', function() {
        productsGrid.className = 'space-y-4';
        listView.classList.add('bg-gray-100');
        gridView.classList.remove('bg-gray-100');
    });

    // Auto-submit del formulario de filtros
    const filterForm = document.getElementById('filters-form');
    const filterInputs = filterForm.querySelectorAll('select, input');
    
    filterInputs.forEach(input => {
        if (input.type !== 'text') {
            input.addEventListener('change', function() {
                filterForm.submit();
            });
        }
    });

    // Búsqueda con debounce
    const searchInput = document.getElementById('search');
    let searchTimeout;
    
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            filterForm.submit();
        }, 500);
    });
});
</script>

<style>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
