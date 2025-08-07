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
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500">
        </div>

        <!-- Categorías -->
        <div class="mb-6">
            <label for="category" class="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
            <select
                id="category"
                name="category"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option value="">Todas las categorías</option>
                <?php if (isset($categories) && is_array($categories)): ?>
                    <?php foreach ($categories as $key => $cat): ?>
                        <option value="<?= htmlspecialchars($key) ?>"
                            <?= ($key === ($_GET['category'] ?? '')) ? 'selected' : '' ?>>
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
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option value="">Todas las marcas</option>
                <?php if (isset($brands) && is_array($brands)): ?>
                    <?php foreach ($brands as $key => $brand): ?>
                        <option value="<?= htmlspecialchars($key) ?>"
                            <?= ($key === ($_GET['brand'] ?? '')) ? 'selected' : '' ?>>
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
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option value="name" <?= ($_GET['sortBy'] ?? '') === 'name' ? 'selected' : '' ?>>Nombre A-Z</option>
                <option value="name_desc" <?= ($_GET['sortBy'] ?? '') === 'name_desc' ? 'selected' : '' ?>>Nombre Z-A</option>
                <option value="price" <?= ($_GET['sortBy'] ?? '') === 'price' ? 'selected' : '' ?>>Precio: Menor a Mayor</option>
                <option value="price_desc" <?= ($_GET['sortBy'] ?? '') === 'price_desc' ? 'selected' : '' ?>>Precio: Mayor a Menor</option>
                <option value="date_entered" <?= ($_GET['sortBy'] ?? '') === 'date_entered' ? 'selected' : '' ?>>Más Recientes</option>
                <option value="date_entered_desc" <?= ($_GET['sortBy'] ?? '') === 'date_entered_desc' ? 'selected' : '' ?>>Más Antiguos</option>
            </select>
        </div>

        <!-- Botones -->
        <div class="flex space-x-2">
            <button
                type="submit"
                class="flex-1 bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors">
                Aplicar
            </button>
            <a
                href="<?= Router::url('/productos') ?>"
                class="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors text-center">
                Limpiar
            </a>
        </div>
    </form>
</div>