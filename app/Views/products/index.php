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
                        <?php include '../app/Views/components/ProductCard.php'; ?>
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
