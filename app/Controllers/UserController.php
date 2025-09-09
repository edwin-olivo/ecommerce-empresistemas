<?php

/**
 * Controlador de usuario
 * Maneja el perfil y datos del usuario
 */

class UserController extends Controller
{

    /**
     * Muestra el perfil del usuario
     */
    public function profile()
    {
        $userId = $_SESSION['user']['id'] ?? null;

        // var_dump($_SESSION['user']);

        // Datos de ejemplo (en producción vendrían de la base de datos)
        $userService = new UserService();
        $user = $userService->getUser($userId);

        // var_dump($user);

        $addressService = new AddressService();
        $addresses = $addressService->getAdressesByUser($userId);

        $countries = [
            'Argentina' => 'Argentina',
            'Brasil' => 'Brasil',
            'Chile' => 'Chile',
            'Mexico' => 'México'
        ];

        $this->view('user/profile', [
            'title' => 'Mi Perfil',
            'user' => $user,
            'addresses' => $addresses,
            'countries' => $countries,
            'errors' => $_SESSION['errors'] ?? [],
            'old' => $_SESSION['old'] ?? []
        ]);

        // Limpiar errores de sesión
        unset($_SESSION['errors'], $_SESSION['old']);
    }

    /**
     * Actualiza el perfil del usuario
     */
    public function updateProfile()
    {
        // TODO: Implementar lógica de actualización de perfil
        $this->json(['success' => true, 'message' => 'Perfil actualizado']);
    }

    /**
     * Actualiza la dirección del usuario
     */
    public function updateAddress()
    {
        // TODO: Implementar lógica de actualización de dirección
        $this->json(['success' => true, 'message' => 'Dirección actualizada']);
    }

    /**
     * Actualiza la contraseña del usuario
     */
    public function updatePassword()
    {
        // TODO: Implementar lógica de cambio de contraseña
        $this->json(['success' => true, 'message' => 'Contraseña actualizada']);
    }

    /**
     * Actualiza las preferencias del usuario
     */
    public function updatePreferences()
    {
        // TODO: Implementar lógica de actualización de preferencias
        $this->json(['success' => true, 'message' => 'Preferencias actualizadas']);
    }

    /**
     * Muestra el historial de pedidos
     */
    public function orders()
    {
        // TODO: Implementar lógica de pedidos
        $this->view('user/orders', [
            'title' => 'Mis Pedidos',
            'orders' => []
        ]);
    }
}
