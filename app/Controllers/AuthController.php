<?php

/**
 * Controlador de autenticación
 * Maneja login, logout y registro de usuarios
 */

class AuthController extends Controller
{

    /**
     * Muestra el formulario de login
     */
    public function login()
    {
        $this->view('auth/login', [
            'title' => 'Iniciar Sesión',
            'errors' => $_SESSION['errors'] ?? [],
            'old' => $_SESSION['old'] ?? []
        ]);

        // Limpiar errores de sesión
        unset($_SESSION['errors'], $_SESSION['old']);
    }

    /**
     * Procesa el login (método POST)
     */
    public function processLogin()
    {
        // TODO: Implementar lógica de autenticación
        $this->json(['success' => true, 'message' => 'Login procesado']);
    }

    /**
     * Muestra el formulario de registro
     */
    public function register()
    {
        $this->view('auth/register', [
            'title' => 'Crear Cuenta',
            'errors' => $_SESSION['errors'] ?? [],
            'old' => $_SESSION['old'] ?? []
        ]);

        // Limpiar errores de sesión
        unset($_SESSION['errors'], $_SESSION['old']);
    }

    /**
     * Procesa el registro (método POST)
     */
    public function processRegister()
    {
        // TODO: Implementar lógica de registro
        $this->json(['success' => true, 'message' => 'Registro procesado']);
    }

    /**
     * Procesa el logout
     */
    public function logout()
    {
        // TODO: Implementar lógica de logout
        header('Location: /');
        exit;
    }
}
