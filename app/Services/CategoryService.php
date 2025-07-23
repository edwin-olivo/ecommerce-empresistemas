<?php
/**
 * Servicio para manejo de categorías
 */

class CategoryService {
    private $db;
    
    public function __construct() {
        $this->db = Database::getInstance();
    }
    
    /**
     * Obtiene todas las categorías
     */
    public function getAllCategories() {
        $sql = "SELECT DISTINCT(category) as name FROM aos_products WHERE deleted = 0 ORDER BY category ASC";
        return $this->db->select($sql);
    }
    
    /**
     * Obtiene categorías principales (para el menú)
     */
    public function getMainCategories($limit = 6) {
        $sql = "SELECT * FROM categories WHERE active = 1 AND featured = 1 ORDER BY order_position ASC LIMIT ?";
        return $this->db->select($sql, [$limit]);
    }
    
    /**
     * Obtiene una categoría por ID
     */
    public function getCategoryById($id) {
        $sql = "SELECT * FROM categories WHERE id = ? AND active = 1";
        return $this->db->selectOne($sql, [$id]);
    }
    
    /**
     * Obtiene productos de una categoría
     */
    public function getCategoryProducts($filters = []) {
        $page = $filters['page'] ?? 1;
        $limit = $filters['limit'] ?? 12;
        $category = $filters['category'] ?? null;
        $search = $filters['search'] ?? null;
        $sortBy = $filters['sortBy'] ?? 'name';

        $offset = ($page - 1) * $limit;
        
        $sql = "SELECT 
                    p.id,
                    p.name as sku,
                    p.description,
                    p.price,
                    p.part_number as name,
                    p.category,
                    p.date_entered as created_at,
                    p.date_modified as updated_at,
                    pc.nombre_imagen_c as image_url,
                    pc.pa1_c as sale_price,
                    pc.enportal_c as active,
                    pc.estatus_c as status,
                    pc.codbar_c as barcode,
                    pc.marca_c as brand,
                    pc.ecommmerce_new_c as is_new,
                    pc.ecommerce_recommended_c as featured,
                    pc.ecommerce_more_sales_c as best_seller,
                    pc.precio_promo_c as promo_price,
                    pc.start_date_c as promo_start,
                    pc.end_date_c as promo_end
                FROM aos_products p 
                LEFT JOIN aos_products_cstm pc ON p.id = pc.id_c 
                WHERE p.deleted = 0 AND pc.estatus_c = 'Activo' AND pc.enportal_c = 'Si'
                AND p.category = ?";
        
        $params[] = $category;
        
        // Ordenamiento
        $allowedSorts = ['name', 'price', 'date_entered'];
        if (in_array($sortBy, $allowedSorts)) {
            if ($sortBy === 'date_entered') {
                $sql .= " ORDER BY p.date_entered DESC";
            } else {
                $sql .= " ORDER BY p.{$sortBy} ASC";
            }
        } else {
            $sql .= " ORDER BY p.name ASC";
        }

        // Aplicar límite y offset
        $sql .= " LIMIT ? OFFSET ?";
        $params[] = $limit;
        $params[] = $offset;

        $products = $this->db->select($sql, $params);

        // Contar total para paginación
        $countSql = "SELECT COUNT(*) as total FROM aos_products p LEFT JOIN aos_products_cstm pc ON p.id = pc.id_c WHERE pc.estatus_c = 'Activo' AND pc.enportal_c = 'Si' AND p.category = ? AND p.deleted = 0";
        $totalRecords = $this->db->selectOne($countSql, [$category])['total'];
        $totalPages = ceil($totalRecords / $limit);
        
        return [
            'data' => $products,
            'pagination' => [
                'current_page' => $page,
                'total_pages' => $totalPages,
                'total_records' => $totalRecords,
                'per_page' => $limit
            ]
        ];
    }
}
