<?php
$customer = $data['customer'];
?>

<div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full text-center">
        <div>
            <i class="fa-solid fa-circle-check text-6xl text-green-500 mb-8"></i>
            <h1 class="text-4xl font-bold text-gray-900 mb-4">Compra Exitosa</h1>
            <h2 class="text-xl font-semibold text-gray-700 mb-4">
                <span class="font-bold"><?= $customer['name'] ?></span>, tu pago ha sido procesado correctamente.
            </h2>
            <p class="text-gray-600 mb-8">
                Gracias por tu compra. Recibirás un correo de confirmación en breve.</strong>
            </p>
            <div class="space-y-4">
                <a href="<?= Router::url('/perfil/ordenes') ?>"
                    class="w-full flex justify-center items-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition duration-300">
                    <i class="fas fa-shopping-bag mr-2"></i>
                    Ver Órdenes
                </a>
                <a href="<?= Router::url('/') ?>"
                    class="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition duration-300">
                    <i class="fas fa-home mr-2"></i>
                    Volver al Inicio
                </a>
            </div>
        </div>
    </div>
</div>
