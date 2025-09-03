<?php

/**
 * Servicio para gestión de direcciones
 * Maneja operaciones CRUD para direcciones
 */
class AddressService
{
    private $db;

    public function __construct()
    {
        $this->db = Database::getInstance();
    }

    /**
     * Obtiene una dirección por su ID
     *
     * @param int $id ID de la dirección
     * @return array|null Datos de la dirección o null si no existe
     */
    public function getAddress($id)
    {
        try {
            $address = $this->db->selectOne(
                "SELECT id, user_id, type, first_name, last_name, address_line_1, address_line_2, city, state, postal_code, country, phone, is_default, created_at 
                 FROM addresses WHERE id = ?",
                [$id]
            );

            return $address ?? null;
        } catch (Exception $e) {
            error_log("Error en AddressService::getAddress: " . $e->getMessage());
            return null;
        }
    }

    public function getAdressesByUser($userId)
    {
        try {
            $addresses = $this->db->select(
                "SELECT id, user_id, type, first_name, last_name, address_line_1, address_line_2, city, state, postal_code, country, phone, is_default, created_at 
                 FROM addresses WHERE user_id = ? ORDER BY is_default DESC, created_at DESC",
                [$userId]
            );

            return $addresses;
        } catch (Exception $e) {
            error_log("Error en AddressService::getAddressesByUser: " . $e->getMessage());
            return [];
        }
    }
}
