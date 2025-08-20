<?php
$breadcrumbs = [
    ['label' => 'Carrito de Compras', 'url' => '']
];
?>

<div class="container mx-auto px-4 py-8">
    <!-- Breadcrumbs -->
    <?php include '../app/Views/components/Breadcrumb.php'; ?>

    <div class="flex flex-col lg:flex-row gap-8">
        <!-- Lista de productos del carrito -->
        <div class="lg:w-2/3">
            <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                <div class="p-6 border-b border-gray-200">
                    <h1 class="text-2xl font-bold text-gray-900 flex items-center">
                        <i class="fas fa-shopping-cart mr-3"></i>
                        Carrito de Compras
                        <span id="cart-item-count" class="ml-2 text-sm font-normal text-gray-500"></span>
                    </h1>
                </div>

                <!-- Loading state -->
                <div id="cart-loading" class="p-8 text-center">
                    <div class="inline-flex items-center">
                        <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600 mr-3"></div>
                        <span class="text-gray-600">Cargando carrito...</span>
                    </div>
                </div>

                <!-- Empty cart -->
                <div id="cart-empty" class="p-8 text-center hidden">
                    <div class="text-gray-400 mb-4">
                        <i class="fas fa-shopping-cart text-6xl"></i>
                    </div>
                    <h3 class="text-lg font-medium text-gray-900 mb-2">Tu carrito está vacío</h3>
                    <p class="text-gray-500 mb-6">¡Agrega algunos productos para comenzar!</p>
                    <a href="<?= Router::url('/productos') ?>"
                        class="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 transition-colors">
                        <i class="fas fa-shopping-bag mr-2"></i>
                        Ir a Productos
                    </a>
                </div>

                <!-- Cart items -->
                <div id="cart-items" class="hidden">
                    <!-- Los items se cargarán dinámicamente -->
                </div>
            </div>
        </div>

        <!-- Resumen del carrito -->
        <div class="lg:w-1/3">
            <div id="cart-summary" class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4 hidden">
                <h2 class="text-lg font-semibold text-gray-900 mb-4">Resumen del Pedido</h2>

                <div class="space-y-3 mb-4">
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-600">Subtotal:</span>
                        <span id="cart-subtotal" class="font-medium">$0.00</span>
                    </div>
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-600">Envío:</span>
                        <span class="text-green-600 font-medium">Gratis</span>
                    </div>
                    <div class="border-t pt-3">
                        <div class="flex justify-between text-lg font-semibold">
                            <span>Total:</span>
                            <span id="cart-total" class="text-primary-600">$0.00</span>
                        </div>
                    </div>
                </div>


                <form action="<?= Router::url('/pago/confirmar') ?>" method="post">
                    <input type="hidden" name="cartData" id="cartData">
                    <button
                        type="submit"
                        id="checkout-btn"
                        class="w-full bg-primary-600 text-white py-3 px-4 rounded-md hover:bg-primary-700 transition-colors font-medium mb-3 cursor-pointer disabled:bg-primary-200 border disabled:border-primary-300 disabled:text-gray-400 disabled:cursor-not-allowed">
                        Proceder al Pago
                    </button>
                </form>

                <button
                    id="clear-cart-btn"
                    class="w-full bg-red-100 text-red-700 py-2 px-4 rounded-md hover:bg-red-200 transition-colors mb-3 text-sm cursor-pointer">
                    Vaciar Carrito
                </button>

                <a href="<?= Router::url('/productos') ?>"
                    class="block w-full text-center bg-gray-100 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-200 transition-colors cursor-pointer">
                    Continuar Comprando
                </a>
            </div>
        </div>
    </div>
</div>

<!-- Template para items del carrito -->
<template id="cart-item-template">
    <div class="cart-item border-b border-gray-200 p-6">
        <div class="flex items-center space-x-4">
            <!-- Imagen del producto -->
            <div class="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
                <img src="" alt="" class="item-image w-full h-full object-cover">
            </div>

            <!-- Información del producto -->
            <div class="flex-1 min-w-0">
                <h3 class="item-name text-lg font-medium text-gray-900 truncate"></h3>
                <p class="item-price text-primary-600 font-semibold mt-1"></p>
                <p class="item-stock text-sm text-gray-500 mt-1"></p>
            </div>

            <!-- Controles de cantidad -->
            <div class="flex items-center space-x-3">
                <div class="flex items-center border border-gray-300 rounded-md">
                    <button type="button" class="qty-decrease px-3 py-2 text-gray-500 hover:text-gray-700 cursor-pointer">
                        <i class="fas fa-minus text-xs"></i>
                    </button>
                    <input type="number"
                        class="item-quantity w-12 text-center border-0 focus:ring-0"
                        min="1"
                        max="99"
                        value="1">
                    <button type="button" class="qty-increase px-3 py-2 text-gray-500 hover:text-gray-700 cursor-pointer">
                        <i class="fas fa-plus text-xs"></i>
                    </button>
                </div>

                <!-- Total del item -->
                <div class="text-right w-20">
                    <p class="item-total text-lg font-semibold text-gray-900"></p>
                </div>

                <!-- Botón eliminar -->
                <button type="button"
                    class="remove-item text-red-500 hover:text-red-700 p-2 rounded-md hover:bg-red-100 cursor-pointer">
                    <i class="fas fa-trash text-sm"></i>
                </button>
            </div>
        </div>
    </div>
</template>