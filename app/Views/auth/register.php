<div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <div class="mx-auto h-12 w-auto">
            <h2 class="text-center text-3xl font-extrabold text-gray-900">
                Crear Nueva Cuenta
            </h2>
        </div>
        <p class="mt-2 text-center text-sm text-gray-600">
            ¿Ya tienes cuenta?
            <a href="<?= Router::url('/login') ?>" class="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                Inicia sesión aquí
            </a>
        </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">

            <?php if (!empty($errors)): ?>
                <div class="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
                    <div class="flex">
                        <div class="flex-shrink-0">
                            <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <div class="ml-3">
                            <h3 class="text-sm font-medium text-red-800">
                                Se encontraron errores:
                            </h3>
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

            <form class="space-y-6" action="<?= Router::url('/registro') ?>" method="POST" id="registerForm">

                <!-- Nombre completo -->
                <div>
                    <label for="name" class="block text-sm font-medium text-gray-700">
                        Nombre completo *
                    </label>
                    <div class="mt-1">
                        <input
                            id="name"
                            name="name"
                            type="text"
                            autocomplete="name"
                            required
                            value="<?= htmlspecialchars($old['name'] ?? '') ?>"
                            class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
                            placeholder="Tu nombre completo">
                    </div>
                </div>

                <!-- Email -->
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">
                        Correo electrónico *
                    </label>
                    <div class="mt-1">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autocomplete="email"
                            required
                            value="<?= htmlspecialchars($old['email'] ?? '') ?>"
                            class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
                            placeholder="tu@ejemplo.com">
                    </div>
                </div>

                <!-- Teléfono -->
                <div>
                    <label for="phone" class="block text-sm font-medium text-gray-700">
                        Teléfono
                    </label>
                    <div class="mt-1">
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            autocomplete="tel"
                            value="<?= htmlspecialchars($old['phone'] ?? '') ?>"
                            class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
                            placeholder="+34 123 456 789">
                    </div>
                </div>

                <!-- Password -->
                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700">
                        Contraseña *
                    </label>
                    <div class="mt-1 relative">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autocomplete="new-password"
                            required
                            class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
                            placeholder="**********">
                    </div>
                    <div class="mt-1 text-xs text-gray-500">
                        Mínimo 8 caracteres, al menos una mayúscula y un número
                    </div>
                </div>

                <!-- Confirm Password -->
                <div>
                    <label for="password_confirmation" class="block text-sm font-medium text-gray-700">
                        Confirmar contraseña *
                    </label>
                    <div class="mt-1 relative">
                        <input
                            id="password_confirmation"
                            name="password_confirmation"
                            type="password"
                            autocomplete="new-password"
                            required
                            class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
                            placeholder="**********">
                    </div>
                </div>

                <!-- Terms and conditions -->
                <div class="flex items-start">
                    <div class="flex items-center h-5">
                        <input
                            id="terms"
                            name="terms"
                            type="checkbox"
                            required
                            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                    </div>
                    <div class="ml-3 text-sm">
                        <label for="terms" class="text-gray-700">
                            Acepto los
                            <a href="#" class="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                                términos y condiciones
                            </a>
                            y la
                            <a href="#" class="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                                política de privacidad
                            </a>
                        </label>
                    </div>
                </div>

                <!-- Newsletter subscription -->
                <div class="flex items-start">
                    <div class="flex items-center h-5">
                        <input
                            id="newsletter"
                            name="newsletter"
                            type="checkbox"
                            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                    </div>
                    <div class="ml-3 text-sm">
                        <label for="newsletter" class="text-gray-700">
                            Quiero recibir ofertas especiales y novedades por email
                        </label>
                    </div>
                </div>

                <!-- Submit button -->
                <div>
                    <button
                        type="submit"
                        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        id="submitBtn">
                        <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                            <svg class="h-5 w-5 text-blue-500 group-hover:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z" />
                            </svg>
                        </span>
                        Crear Cuenta
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
