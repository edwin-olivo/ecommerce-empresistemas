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
        $email = $this->sanitize($_POST['email'] ?? '');
        $password = $_POST['password'] ?? '';

        $userService = new UserService();
        $user = $userService->findByEmail($email);

        if (!$user || !password_verify($password, $user['password'])) {
            // Guardar errores en sesión para mostrar en la vista
            $_SESSION['errors'] = ['Credenciales inválidas'];
            $_SESSION['old'] = ['email' => $email];
            header('Location: /login');
            exit;
        }

        // Guardar usuario en sesión
        $_SESSION['user'] = [
            'id' => $user['id'],
            'email' => $user['email'],
            'name' => $user['name'] ?? '',
            'expiration' => $this->getExpirationTime()
        ];

        header('Location: /perfil');
        exit;
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
        $name = $this->sanitize($_POST['name'] ?? '');
        $email = $this->sanitize($_POST['email'] ?? '');
        $phone = $this->sanitize($_POST['phone'] ?? '');
        $password = $_POST['password'] ?? '';
        $passwordConfirmation = $_POST['password_confirmation'] ?? '';

        if ($password !== $passwordConfirmation) {
            $_SESSION['errors'] = ['Las contraseñas no coinciden'];
            $_SESSION['old'] = [
                'name' => $name,
                'email' => $email,
                'phone' => $phone
            ];
            header('Location: /register');
            exit;
        }

        $userService = new UserService();
        $existingUser = $userService->findByEmail($email);

        if ($existingUser) {
            $_SESSION['errors'] = ['El correo electrónico ya está en uso'];
            $_SESSION['old'] = [
                'name' => $name,
                'email' => $email,
                'phone' => $phone
            ];
            header('Location: /register');
            exit;
        }

        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        $userService->createUser($name, $email, $phone, $hashedPassword);

        $_SESSION['success'] = 'Registro exitoso. Puedes iniciar sesión.';
        header('Location: /login');
        exit;
    }

    /**
     * Procesa el logout
     */
    public function logout()
    {
        // TODO: Implementar lógica de logout
        session_destroy();
        header('Location: /');
        exit;
    }

    function getExpirationTime(){
        $sessionLifetime = SESSION_LIFETIME ?? 1800; // 30 minutos por defecto
        return time() + $sessionLifetime;
    }
}
