<?php

class UserService
{

    private $dummyData = [];

    public function __construct()
    {
        // Datos de ejemplo (en producción vendrían de la base de datos)
        $this->dummyData = [
            [
                'id' => 1,
                'email' => 'user1@example.com',
                'name' => 'User One',
                'password' => password_hash('password1', PASSWORD_BCRYPT),
                'phone' => '+52 123 456 789',
                'address' => 'Calle Ejemplo 123',
                'city' => 'Tepic',
                'postal_code' => '63100',
                'country' => 'México',
                'created_at' => '2025-08-07 12:00:00',
                'orders' => [
                    [
                        'id' => 1,
                        'created_at' => '2025-08-07 12:00:00',
                        'session_id' => 'cs_test_b1TTyN29zworMFBehkveM6AfkeWRUGj3mhkOOTbL7C1RVBlvOGQs6nLxUF',
                        'payment_status' => 'completed',
                        'payment_id' => 'pi_3RxYY0HoMUogN48916kjyqPL',
                        'amount' => 2181.00
                    ]
                ]
            ],
            [
                'id' => 2,
                'email' => 'user2@example.com',
                'name' => 'User Two',
                'password' => password_hash('password2', PASSWORD_BCRYPT),
                'phone' => '+52 987 654 321',
                'address' => 'Avenida Ejemplo 456',
                'city' => 'Tepic',
                'postal_code' => '63100',
                'country' => 'México',
                'created_at' => '2025-08-07 12:00:00',
                'orders' => []
            ],
        ];
    }

    public function getUser($id)
    {
        foreach ($this->dummyData as $user) {
            if ($user['id'] === $id) {
                return $user;
            }
        }

        return null;
    }

    public function createUser($data)
    {
        // Logic to create a new user
    }

    public function updateUser($id, $data)
    {
        foreach ($this->dummyData as &$user) {
            if ($user['id'] === $id) {
                $user = array_merge($user, $data);
                return $user;
            }
        }
        return null;
    }

    public function updateOrders($userId, $orders)
    {
        foreach ($this->dummyData as &$user) {
            if ($user['id'] === $userId) {
                array_push($user['orders'], $orders);
                return $user;
            }
        }
        return null;
    }

    public function deleteUser($id)
    {
        foreach ($this->dummyData as $key => $user) {
            if ($user['id'] === $id) {
                unset($this->dummyData[$key]);
                return true;
            }
        }
        return false;
    }

    public function findByEmail($email)
    {
        foreach ($this->dummyData as $user) {
            if ($user['email'] === $email) {
                return $user;
            }
        }

        return null;
    }
}
