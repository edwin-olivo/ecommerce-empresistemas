<?php
/**
 * Servicio para manejo de categorías
 */

class ContactService {
    private $db;
    
    public function __construct() {
        $this->db = Database::getInstance();
    }
    
    /**
     * Obtiene todos los registros en Mi Empresa
     */
    public function getAll() {
        $sql = "SELECT * FROM cwe_cuentaweberp INNER JOIN cwe_cuentaweberp_cstm ON id = id_c WHERE deleted = 0 ORDER BY name ASC";
        return $this->db->select($sql);
    }
}
