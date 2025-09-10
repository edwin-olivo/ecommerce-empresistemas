<?php

class AuthMiddleware
{
    public function requireAuth()
    {
        if (empty($_SESSION['user'])) {
            header('Location: /login');
            exit;
        }

        if ($_SESSION['user']['expiration'] < time()) {
            // La sesión ha expirado
            session_destroy();
            header('Location: /login');
            exit;
        }

        // Si está autenticado, continuar
        return true;
    }
}
