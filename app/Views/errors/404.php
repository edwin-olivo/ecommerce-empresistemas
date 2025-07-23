<!-- Error 404 - Página no encontrada -->
<div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 text-center">
        <div>
            <i class="fas fa-exclamation-triangle text-6xl text-gray-400 mb-8"></i>
            <h1 class="text-6xl font-bold text-gray-900 mb-4">404</h1>
            <h2 class="text-2xl font-semibold text-gray-700 mb-4">
                <?= $message ?? 'Página no encontrada' ?>
            </h2>
            <p class="text-gray-600 mb-8">
                Lo sentimos, la página que buscas no existe o ha sido movida.
            </p>
            <div class="space-y-4">
                <a href="<?= Router::url('/') ?>" 
                   class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition duration-300">
                    <i class="fas fa-home mr-2"></i>
                    Volver al Inicio
                </a>
                <a href="<?= Router::url('/productos') ?>" 
                   class="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition duration-300">
                    <i class="fas fa-shopping-bag mr-2"></i>
                    Ver Productos
                </a>
            </div>
        </div>
        
        <div class="mt-8 text-sm text-gray-500">
            <p>Si crees que esto es un error, contacta a nuestro soporte:</p>
            <a href="mailto:soporte@ecommerce.com" class="text-primary-600 hover:text-primary-500">
                soporte@ecommerce.com
            </a>
        </div>
    </div>
</div>
