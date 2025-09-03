<?php

/**
 * Servicio para gestión de usuarios
 * Maneja operaciones CRUD para usuarios y sus órdenes
 */
class UserService
{
    private $db;

    public function __construct()
    {
        $this->db = Database::getInstance();
    }

    /**
     * Obtiene un usuario por su ID, incluyendo sus órdenes
     *
     * @param int $id ID del usuario
     * @return array|null Datos del usuario o null si no existe
     */
    public function getUser($id)
    {
        try {
            $user = $this->db->selectOne(
                "SELECT id, email, name, phone, created_at FROM users WHERE id = ?",
                [$id]
            );

            if (!$user) {
                return null;
            }

            // Obtener órdenes del usuario
            $orders = $this->db->select(
                "SELECT id, session_id, payment_id, payment_status, amount, created_at FROM orders WHERE user_id = ? ORDER BY created_at DESC",
                [$id]
            );

            $user['orders'] = $orders;
            return $user;
        } catch (Exception $e) {
            error_log("Error en UserService::getUser: " . $e->getMessage());
            return null;
        }
    }

    /**
     * Crea un nuevo usuario
     *
     * @param array $data Datos del usuario a crear
     * @return int|false ID del nuevo usuario o false en caso de error
     */
    public function createUser($data)
    {
        try {
            $this->db->beginTransaction();
            
            $id = $this->db->insert(
                "INSERT INTO users (email, name, password, phone, address, city, postal_code, country) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                [
                    $data['email'],
                    $data['name'],
                    password_hash($data['password'], PASSWORD_BCRYPT),
                    $data['phone'] ?? null,
                    $data['address'] ?? null,
                    $data['city'] ?? null,
                    $data['postal_code'] ?? null,
                    $data['country'] ?? null
                ]
            );
            
            $this->db->commit();
            return $id;
        } catch (Exception $e) {
            $this->db->rollback();
            error_log("Error en UserService::createUser: " . $e->getMessage());
            return false;
        }
    }

    /**
     * Actualiza los datos de un usuario existente
     *
     * @param int $id ID del usuario a actualizar
     * @param array $data Datos a actualizar
     * @return bool True si se actualizó correctamente, False en caso contrario
     */
    public function updateUser($id, $data)
    {
        try {
            $fields = [];
            $values = [];
            
            // Construir la consulta dinámicamente con los campos a actualizar
            foreach ($data as $field => $value) {
                // Ignorar campos que no se deben actualizar directamente
                if (in_array($field, ['id', 'created_at', 'updated_at', 'password', 'deleted'])) {
                    continue;
                }
                $fields[] = "$field = ?";
                $values[] = $value;
            }
            
            // Si no hay campos para actualizar, salir
            if (empty($fields)) {
                return false;
            }
            
            // Actualizar password si se proporciona
            if (isset($data['password']) && !empty($data['password'])) {
                $fields[] = "password = ?";
                $values[] = password_hash($data['password'], PASSWORD_BCRYPT);
            }
            
            // Añadir el ID al final de los valores
            $values[] = $id;
            
            $this->db->beginTransaction();
            $affected = $this->db->update(
                "UPDATE users SET " . implode(', ', $fields) . " WHERE id = ?",
                $values
            );
            $this->db->commit();
            
            return $affected > 0;
        } catch (Exception $e) {
            $this->db->rollback();
            error_log("Error en UserService::updateUser: " . $e->getMessage());
            return false;
        }
    }

    /**
     * Agrega una nueva orden para un usuario
     *
     * @param int $userId ID del usuario
     * @param array $orderData Datos de la orden a agregar
     * @return int|false ID de la orden creada o false en caso de error
     */
    public function updateOrders($userId, $orderData)
    {
        try {
            $this->db->beginTransaction();
            
            // Verificar si el usuario existe
            $user = $this->db->selectOne("SELECT id FROM users WHERE id = ?", [$userId]);
            if (!$user) {
                return false;
            }
            
            // Insertar la nueva orden
            $orderId = $this->db->insert(
                "INSERT INTO orders (user_id, session_id, payment_id, payment_status, amount, created_at) 
                 VALUES (?, ?, ?, ?, ?, ?)",
                [
                    $userId,
                    $orderData['session_id'] ?? null,
                    $orderData['payment_id'] ?? null,
                    $orderData['payment_status'] ?? 'completed',
                    $orderData['amount'],
                    $orderData['created_at'] ?? date('Y-m-d H:i:s')
                ]
            );
            
            $this->db->commit();
            return $orderId;
        } catch (Exception $e) {
            $this->db->rollback();
            error_log("Error en UserService::updateOrders: " . $e->getMessage());
            return false;
        }
    }

    /**
     * Elimina un usuario y todas sus órdenes asociadas
     *
     * @param int $id ID del usuario a eliminar
     * @return bool True si se eliminó correctamente, False en caso contrario
     */
    public function deleteUser($id)
    {
        try {
            $this->db->beginTransaction();
            
            $affected = $this->db->update("UPDATE users SET updated_at = NOW(), deleted = 1 WHERE id = ?", [$id]);

            $this->db->commit();
            return $affected > 0;
        } catch (Exception $e) {
            $this->db->rollback();
            error_log("Error en UserService::deleteUser: " . $e->getMessage());
            return false;
        }
    }

    /**
     * Busca un usuario por su email
     *
     * @param string $email Email a buscar
     * @return array|null Datos del usuario o null si no existe
     */
    public function findByEmail($email)
    {
        try {
            return $this->db->selectOne(
                "SELECT id, email, name, password, phone, created_at FROM users WHERE email = ?",
                [$email]
            );
        } catch (Exception $e) {
            error_log("Error en UserService::findByEmail: " . $e->getMessage());
            return null;
        }
    }
    
    /**
     * Obtiene todos los usuarios
     * 
     * @param int $limit Límite de resultados
     * @param int $offset Desplazamiento para paginación
     * @return array Lista de usuarios
     */
    public function getAllUsers($limit = 10, $offset = 0)
    {
        try {
            return $this->db->select(
                "SELECT id, email, name, phone, city, country, created_at 
                 FROM users ORDER BY id DESC LIMIT ? OFFSET ?",
                [$limit, $offset]
            );
        } catch (Exception $e) {
            error_log("Error en UserService::getAllUsers: " . $e->getMessage());
            return [];
        }
    }
    
    /**
     * Cuenta el total de usuarios en el sistema
     * 
     * @return int Total de usuarios
     */
    public function countUsers()
    {
        try {
            $result = $this->db->selectOne("SELECT COUNT(*) as total FROM users");
            return $result['total'] ?? 0;
        } catch (Exception $e) {
            error_log("Error en UserService::countUsers: " . $e->getMessage());
            return 0;
        }
    }
}
