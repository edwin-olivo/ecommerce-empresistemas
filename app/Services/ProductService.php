<?php

/**
 * Servicio para manejo de productos
 */

class ProductService
{
    private $db;

    public function __construct()
    {
        $this->db = Database::getInstance();
    }

    /**
     * Obtiene productos con filtros y paginación
     */
    public function getProducts($filters = [])
    {
        $page = $filters['page'] ?? 1;
        $limit = $filters['limit'] ?? 12;
        $category = $filters['category'] ?? null;
        $search = $filters['search'] ?? null;
        $sortBy = $filters['sortBy'] ?? 'name';

        $offset = ($page - 1) * $limit;

        // Construir consulta base - usando tablas aos_products y aos_products_cstm
        $sql = "SELECT 
                    p.id,
                    p.name as sku,
                    p.description,
                    p.price,
                    p.part_number as name,
                    p.category,
                    p.date_entered,
                    p.date_modified,
                    pc.nombre_imagen_c as image_url,
                    pc.pa1_c as sale_price,
                    pc.enportal_c as active,
                    pc.estatus_c as status,
                    pc.codbar_c as barcode,
                    pc.marca_c as brand,
                    pc.ecommmerce_new_c as is_new,
                    pc.ecommerce_recommended_c as recommended,
                    pc.ecommerce_more_sales_c as best_seller,
                    pc.precio_promo_c as promo_price,
                    pc.start_date_c as promo_start,
                    pc.end_date_c as promo_end
                FROM aos_products p 
                LEFT JOIN aos_products_cstm pc ON p.id = pc.id_c 
                WHERE p.deleted = 0 AND pc.estatus_c = 'Activo' AND pc.enportal_c = 'Si'";
        $params = [];

        // Aplicar filtros
        if ($category) {
            $sql .= " AND p.category = ?";
            $params[] = $category;
        }

        if ($search) {
            $sql .= " AND (p.name LIKE ? OR p.description LIKE ? OR p.part_number LIKE ?)";
            $params[] = "%{$search}%";
            $params[] = "%{$search}%";
            $params[] = "%{$search}%";
        }

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

        // Contar total para paginación
        $countSql = "SELECT COUNT(*) as total 
                     FROM aos_products p 
                     LEFT JOIN aos_products_cstm pc ON p.id = pc.id_c 
                     WHERE p.deleted = 0 AND pc.estatus_c = 'Activo' AND pc.enportal_c = 'Si'";

        if ($category) {
            $countSql .= " AND p.category = ?";
        }

        if ($search) {
            $countSql .= " AND (p.name LIKE ? OR p.description LIKE ? OR p.part_number LIKE ?)";
        }

        $totalRecords = $this->db->selectOne($countSql, $params)['total'];
        $totalPages = ceil($totalRecords / $limit);

        // Aplicar límite y offset
        $sql .= " LIMIT ? OFFSET ?";
        $params[] = $limit;
        $params[] = $offset;

        $products = $this->db->select($sql, $params);

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

    /**
     * Obtiene un producto por ID
     */
    public function getProductById($id)
    {
        $sql = "SELECT 
                    p.id,
                    p.name as sku,
                    p.description,
                    p.price,
                    p.part_number as name,
                    p.category,
                    p.date_entered,
                    p.date_modified,
                    pc.nombre_imagen_c as image_url,
                    pc.pa1_c as sale_price,
                    pc.enportal_c as active,
                    pc.estatus_c as status,
                    pc.codbar_c as barcode,
                    pc.marca_c as brand,
                    pc.ecommmerce_new_c as is_new,
                    pc.ecommerce_recommended_c as recommended,
                    pc.ecommerce_more_sales_c as best_seller,
                    pc.precio_promo_c as promo_price,
                    pc.start_date_c as promo_start,
                    pc.end_date_c as promo_end,
                    pc.unidad_c as unit,
                    pc.volumen_c as volume,
                    pc.peso_c as weight,
                    pc.nombre_imagen2_c as image2,
                    pc.nombre_imagen3_c as image3,
                    pc.nombre_imagen4_c as image4,
                    pc.nombre_imagen5_c as image5
                FROM aos_products p 
                LEFT JOIN aos_products_cstm pc ON p.id = pc.id_c 
                WHERE p.id = ? AND p.deleted = 0";

        return $this->db->selectOne($sql, [$id]);
    }

    /**
     * Obtiene productos destacados
     */
    public function getFeaturedProducts($limit = 8)
    {
        $sql = "SELECT 
                    p.id,
                    p.name as sku,
                    p.description,
                    p.price,
                    p.part_number as name,
                    p.category,
                    p.date_entered,
                    pc.nombre_imagen_c as image_url,
                    pc.pa1_c as sale_price,
                    pc.ecommerce_recommended_c as recommended,
                    pc.precio_promo_c as promo_price,
                    pc.marca_c as brand
                FROM aos_products p 
                LEFT JOIN aos_products_cstm pc ON p.id = pc.id_c 
                WHERE p.deleted = 0 
                AND pc.estatus_c = 'Activo' 
                AND pc.enportal_c = 'Si'
                AND pc.ecommerce_recommended_c = 1 
                ORDER BY p.date_entered DESC 
                LIMIT ?";

        return $this->db->select($sql, [$limit]);
    }

    /**
     * Obtiene productos relacionados
     */
    public function getRelatedProducts($productId, $category, $limit = 4)
    {
        $sql = "SELECT 
                    p.id,
                    p.name as sku,
                    p.description,
                    p.price,
                    p.part_number as name,
                    p.category,
                    pc.nombre_imagen_c as image_url,
                    pc.pa1_c as sale_price,
                    pc.precio_promo_c as promo_price,
                    pc.marca_c as brand
                FROM aos_products p 
                LEFT JOIN aos_products_cstm pc ON p.id = pc.id_c 
                WHERE p.category = ? 
                AND p.id != ? 
                AND p.deleted = 0
                AND pc.estatus_c = 'Activo' 
                AND pc.enportal_c = 'Si'
                ORDER BY RAND() 
                LIMIT ?";

        return $this->db->select($sql, [$category, $productId, $limit]);
    }
}
