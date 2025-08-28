<div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <!-- Encabezado -->
        <div class="bg-white shadow rounded-lg mb-8">
            <div class="px-6 py-4 sm:p-6">
                <div class="flex space-y-4 flex-col items-start justify-between md:flex-row md:items-center md:space-y-0">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <div class="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                                <svg class="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                        </div>
                        <div class="ml-4">
                            <h1 class="text-2xl font-bold text-gray-900"><?= htmlspecialchars($user['name']) ?></h1>
                            <p class="text-sm text-gray-500">Miembro desde <?= date('d/m/Y', strtotime($user['created_at'])) ?></p>
                        </div>
                    </div>
                    <div class="flex space-x-3">
                        <button type="button" class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors cursor-pointer">
                            <svg class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                            </svg>
                            Configuración
                        </button>
                        <a href="<?= Router::url('/logout') ?>" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors">
                            <svg class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Cerrar Sesión
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

            <!-- Menu de navegación lateral -->
            <div class="lg:col-span-1">
                <div class="bg-white shadow rounded-lg">
                    <div class="p-6">
                        <h3 class="text-lg font-medium text-gray-900 mb-4">Mi Cuenta</h3>
                        <nav class="space-y-1">
                            <a href="#personal-info" class="profile-tab active bg-blue-50 text-blue-700 group flex items-center px-3 py-2 text-sm font-medium rounded-md">
                                <svg class="text-blue-500 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Información Personal
                            </a>
                            <a href="#address-info" class="profile-tab text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-md">
                                <svg class="text-gray-400 group-hover:text-gray-500 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Dirección
                            </a>
                            <a href="#password-change" class="profile-tab text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-md">
                                <svg class="text-gray-400 group-hover:text-gray-500 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                Cambiar Contraseña
                            </a>
                            <a href="#orders" class="profile-tab text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-md">
                                <svg class="text-gray-400 group-hover:text-gray-500 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                Mis Pedidos
                            </a>
                            <a href="#preferences" class="profile-tab text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-md">
                                <svg class="text-gray-400 group-hover:text-gray-500 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Preferencias
                            </a>
                        </nav>
                    </div>
                </div>
            </div>

            <!-- Main Content -->
            <div class="lg:col-span-2">

                <!-- Información Personal -->
                <div id="personal-info" class="profile-content bg-white shadow rounded-lg">
                    <div class="p-6">
                        <h3 class="text-lg font-medium text-gray-900 mb-6">Información Personal</h3>

                        <?php if (!empty($errors)): ?>
                            <div class="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
                                <div class="flex">
                                    <div class="flex-shrink-0">
                                        <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                    <div class="ml-3">
                                        <h3 class="text-sm font-medium text-red-800">Se encontraron errores:</h3>
                                        <div class="mt-2 text-sm text-red-700">
                                            <ul class="list-disc pl-5 space-y-1">
                                                <?php foreach ($errors as $error): ?>
                                                    <li><?= htmlspecialchars($error) ?></li>
                                                <?php endforeach; ?>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <?php endif; ?>

                        <form action="<?= Router::url('/perfil') ?>" method="POST" class="space-y-6">

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label for="name" class="form-label">
                                        Nombre completo
                                    </label>
                                    <div class="mt-1">
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            value="<?= htmlspecialchars($old['name'] ?? $user['name']) ?>"
                                            class="form-input">
                                    </div>
                                </div>

                                <div>
                                    <label for="email" class="form-label">
                                        Correo electrónico
                                    </label>
                                    <div class="mt-1">
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            value="<?= htmlspecialchars($old['email'] ?? $user['email']) ?>"
                                            class="form-input">
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label for="phone" class="form-label">
                                    Teléfono
                                </label>
                                <div class="mt-1">
                                    <input
                                        type="tel"
                                        name="phone"
                                        id="phone"
                                        value="<?= htmlspecialchars($old['phone'] ?? $user['phone']) ?>"
                                        class="form-input">
                                </div>
                            </div>

                            <div class="pt-5">
                                <div class="flex justify-end">
                                    <button
                                        type="submit"
                                        class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">
                                        Guardar Cambios
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <!-- Dirección -->
                <div id="address-info" class="profile-content bg-white shadow rounded-lg hidden">
                    <div class="p-6">
                        <h3 class="text-lg font-medium text-gray-900 mb-6">Dirección de Envío</h3>

                        <form action="<?= Router::url('/perfil/direccion') ?>" method="POST" class="space-y-6">

                            <div>
                                <label for="address" class="form-label">
                                    Dirección
                                </label>
                                <div class="mt-1">
                                    <input
                                        type="text"
                                        name="address"
                                        id="address"
                                        value="<?= htmlspecialchars($user['address']) ?>"
                                        class="form-input"
                                        placeholder="Calle, número, piso, puerta...">
                                </div>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label for="city" class="form-label">
                                        Ciudad
                                    </label>
                                    <div class="mt-1">
                                        <input
                                            type="text"
                                            name="city"
                                            id="city"
                                            value="<?= htmlspecialchars($user['city']) ?>"
                                            class="form-input">
                                    </div>
                                </div>

                                <div>
                                    <label for="postal_code" class="form-label">
                                        Código Postal
                                    </label>
                                    <div class="mt-1">
                                        <input
                                            type="text"
                                            name="postal_code"
                                            id="postal_code"
                                            value="<?= htmlspecialchars($user['postal_code']) ?>"
                                            class="form-input">
                                    </div>
                                </div>

                                <div>
                                    <label for="country" class="form-label">
                                        País
                                    </label>
                                    <div class="mt-1">
                                        <select
                                            name="country"
                                            id="country"
                                            class="form-input">
                                            <option value="Argentina" <?= $user['country'] === 'Argentina' ? 'selected' : '' ?>>Argentina</option>
                                            <option value="Brasil" <?= $user['country'] === 'Brasil' ? 'selected' : '' ?>>Brasil</option>
                                            <option value="Chile" <?= $user['country'] === 'Chile' ? 'selected' : '' ?>>Chile</option>
                                            <option value="Mexico" <?= $user['country'] === 'Mexico' ? 'selected' : '' ?>>México</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="pt-5">
                                <div class="flex justify-end">
                                    <button
                                        type="submit"
                                        class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">
                                        Guardar Dirección
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <!-- Password Change -->
                <div id="password-change" class="profile-content bg-white shadow rounded-lg hidden">
                    <div class="p-6">
                        <h3 class="text-lg font-medium text-gray-900 mb-6">Cambiar Contraseña</h3>

                        <form action="<?= Router::url('/perfil/password') ?>" method="POST" class="space-y-6">

                            <div>
                                <label for="current_password" class="form-label">
                                    Contraseña actual
                                </label>
                                <div class="mt-1">
                                    <input
                                        type="password"
                                        name="current_password"
                                        id="current_password"
                                        class="form-input"
                                        required>
                                </div>
                            </div>

                            <div>
                                <label for="new_password" class="form-label">
                                    Nueva contraseña
                                </label>
                                <div class="mt-1">
                                    <input
                                        type="password"
                                        name="new_password"
                                        id="new_password"
                                        class="form-input"
                                        required>
                                </div>
                                <p class="mt-1 text-sm text-gray-500">
                                    Mínimo 8 caracteres, al menos una mayúscula y un número
                                </p>
                            </div>

                            <div>
                                <label for="new_password_confirmation" class="form-label">
                                    Confirmar nueva contraseña
                                </label>
                                <div class="mt-1">
                                    <input
                                        type="password"
                                        name="new_password_confirmation"
                                        id="new_password_confirmation"
                                        class="form-input"
                                        required>
                                </div>
                            </div>

                            <div class="pt-5">
                                <div class="flex justify-end">
                                    <button
                                        type="submit"
                                        class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">
                                        Cambiar Contraseña
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <!-- Historial de ordenes -->
                <div id="orders" class="profile-content bg-white shadow rounded-lg hidden">
                    <div class="p-6">
                        <h3 class="text-lg font-medium text-gray-900 mb-6">Historial de Pedidos</h3>

                        <div class="text-center py-12">
                            <?php if (!empty($user['orders']) && count($user['orders']) > 0): ?>
                                <ul role="list" class="divide-y divide-gray-200">
                                    <?php foreach ($user['orders'] as $order): ?>
                                        <li class="py-3 flex justify-between">
                                            <div>
                                                <p class="text-sm font-medium text-gray-900">Pedido #<?= $order['id'] ?></p>
                                                <p class="text-sm text-gray-500"><?= $order['created_at'] ?></p>
                                            </div>
                                            <div class="ml-4 flex-shrink-0">
                                                <a href="<?= Router::url('/perfil/pedidos/' . $order['id']) ?>" class="text-sm font-medium text-blue-600 hover:text-blue-500">Ver</a>
                                            </div>
                                        </li>
                                    <?php endforeach; ?>
                                </ul>
                            <?php else: ?>
                                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                <h3 class="mt-2 text-sm font-medium text-gray-900">No hay pedidos</h3>
                                <p class="mt-1 text-sm text-gray-500">Aún no has realizado ningún pedido.</p>
                                <div class="mt-6">
                                    <a href="<?= Router::url('/productos') ?>" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                                        <svg class="mr-2 -ml-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                        </svg>
                                        Explorar Productos
                                    </a>
                                </div>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>

                <!-- Ajustes y preferencias -->
                <div id="preferences" class="profile-content bg-white shadow rounded-lg hidden">
                    <div class="p-6">
                        <h3 class="text-lg font-medium text-gray-900 mb-6">Preferencias</h3>

                        <form action="<?= Router::url('/perfil/preferencias') ?>" method="POST" class="space-y-6">

                            <div class="space-y-4">
                                <div class="flex items-start">
                                    <div class="flex items-center h-5">
                                        <input
                                            id="email_notifications"
                                            name="email_notifications"
                                            type="checkbox"
                                            checked
                                            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                                    </div>
                                    <div class="ml-3 text-sm">
                                        <label for="email_notifications" class="font-medium text-gray-700">
                                            Notificaciones por email
                                        </label>
                                        <p class="text-gray-500">Recibir emails sobre pedidos, ofertas y novedades</p>
                                    </div>
                                </div>

                                <div class="flex items-start">
                                    <div class="flex items-center h-5">
                                        <input
                                            id="sms_notifications"
                                            name="sms_notifications"
                                            type="checkbox"
                                            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                                    </div>
                                    <div class="ml-3 text-sm">
                                        <label for="sms_notifications" class="font-medium text-gray-700">
                                            Notificaciones por SMS
                                        </label>
                                        <p class="text-gray-500">Recibir SMS sobre el estado de tus pedidos</p>
                                    </div>
                                </div>

                                <div class="flex items-start">
                                    <div class="flex items-center h-5">
                                        <input
                                            id="newsletter"
                                            name="newsletter"
                                            type="checkbox"
                                            checked
                                            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                                    </div>
                                    <div class="ml-3 text-sm">
                                        <label for="newsletter" class="font-medium text-gray-700">
                                            Newsletter
                                        </label>
                                        <p class="text-gray-500">Recibir nuestro boletín semanal con ofertas especiales</p>
                                    </div>
                                </div>
                            </div>

                            <div class="pt-5">
                                <div class="flex justify-end">
                                    <button
                                        type="submit"
                                        class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">
                                        Guardar Preferencias
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>

<script>
    // Password validation for profile
    // document.getElementById('new_password').addEventListener('input', function() {
    //     const password = this.value;
    //     const isValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/.test(password);

    //     if (password.length > 0) {
    //         if (isValid) {
    //             this.classList.remove('border-red-300');
    //             this.classList.add('border-green-300');
    //         } else {
    //             this.classList.remove('border-green-300');
    //             this.classList.add('border-red-300');
    //         }
    //     } else {
    //         this.classList.remove('border-red-300', 'border-green-300');
    //     }
    // });

    // Password confirmation validation
    // document.getElementById('new_password_confirmation').addEventListener('input', function() {
    //     const password = document.getElementById('new_password').value;
    //     const confirmation = this.value;

    //     if (confirmation.length > 0) {
    //         if (password === confirmation) {
    //             this.classList.remove('border-red-300');
    //             this.classList.add('border-green-300');
    //         } else {
    //             this.classList.remove('border-green-300');
    //             this.classList.add('border-red-300');
    //         }
    //     } else {
    //         this.classList.remove('border-red-300', 'border-green-300');
    //     }
    // });
</script>