<?php
/**
 * Helper para manejo de imágenes
 * Genera URLs optimizadas para las imágenes del sistema WENZ HOU
 */

class ImageHelper {
    
    /**
     * URL base del sistema de imágenes WENZ HOU
     */
    private static $baseImageUrl;
    
    /**
     * Ruta de imágenes por defecto
     */
    private static $defaultImagePath;
    
    /**
     * URL directa para imágenes sin redimensionar
     */
    private static $directImageUrl;
    
    /**
     * Inicializar configuración
     */
    private static function init() {
        if (self::$baseImageUrl === null) {
            self::$baseImageUrl = defined('WENZ_HOU_IMAGE_BASE_URL') ? WENZ_HOU_IMAGE_BASE_URL : 'https://wenzhou.erponweb.com.mx/customcode/redim.php';
            self::$defaultImagePath = defined('WENZ_HOU_IMAGE_PATH') ? WENZ_HOU_IMAGE_PATH : 'imagenes/';
            self::$directImageUrl = defined('WENZ_HOU_DIRECT_IMAGE_URL') ? WENZ_HOU_DIRECT_IMAGE_URL : 'https://wenzhou.erponweb.com.mx/imagenes/';
        }
    }
    
    /**
     * Genera la URL de una imagen con redimensionamiento
     * 
     * @param string|null $imageName Nombre de la imagen
     * @param int $width Ancho de la imagen
     * @param int $height Alto de la imagen
     * @param string $defaultImage Imagen por defecto si no existe
     * @return string URL de la imagen
     */
    public static function getImageUrl($imageName = null, $width = 300, $height = 300, $defaultImage = 'placeholder-product.svg') {
        self::init();
        
        if (empty($imageName)) {
            return Router::url("/assets/images/{$defaultImage}");
        }
        
        // Construir URL con parámetros de redimensionamiento
        $params = [
            'img' => self::$defaultImagePath . $imageName,
            'ancho' => $width,
            'alto' => $height
        ];
        
        return self::$baseImageUrl . '?' . http_build_query($params);
    }
    
    /**
     * Genera URL de imagen para productos
     * 
     * @param string|null $imageName Nombre de la imagen
     * @param string $size Tamaño predefinido (thumbnail, medium, large, original)
     * @return string URL de la imagen
     */
    public static function getProductImageUrl($imageName = null, $size = 'medium') {
        $sizes = [
            'thumbnail' => ['width' => 150, 'height' => 150],
            'small' => ['width' => 200, 'height' => 200],
            'medium' => ['width' => 300, 'height' => 300],
            'large' => ['width' => 500, 'height' => 500],
            'hero' => ['width' => 800, 'height' => 600],
            'original' => ['width' => 0, 'height' => 0] // Sin redimensionar
        ];
        
        if (!isset($sizes[$size])) {
            $size = 'medium';
        }
        
        $dimensions = $sizes[$size];
        
        // Si es original, no redimensionar
        if ($size === 'original' && !empty($imageName)) {
            self::init();
            return self::$directImageUrl . $imageName;
        }
        
        return self::getImageUrl($imageName, $dimensions['width'], $dimensions['height']);
    }
    
    /**
     * Genera múltiples URLs para una galería de imágenes
     * 
     * @param array $imageNames Array de nombres de imágenes
     * @param string $size Tamaño de las imágenes
     * @return array Array de URLs
     */
    public static function getGalleryUrls($imageNames = [], $size = 'medium') {
        if (empty($imageNames) || !is_array($imageNames)) {
            return [];
        }
        
        $urls = [];
        foreach ($imageNames as $imageName) {
            if (!empty($imageName)) {
                $urls[] = self::getProductImageUrl($imageName, $size);
            }
        }
        
        return $urls;
    }
    
    /**
     * Obtiene todas las imágenes de un producto desde las columnas personalizadas
     * 
     * @param array $product Datos del producto con campos personalizados
     * @param string $size Tamaño de las imágenes
     * @return array Array con imagen principal y galería
     */
    public static function getProductImages($product, $size = 'medium') {
        $images = [
            'main' => null,
            'gallery' => []
        ];
        
        // Imagen principal
        if (!empty($product['product_image'])) {
            $images['main'] = self::getProductImageUrl($product['product_image'], $size);
        } elseif (!empty($product['image_url'])) {
            $images['main'] = self::getProductImageUrl($product['image_url'], $size);
        }
        
        // Galería de imágenes adicionales (imagen2 a imagen10)
        $galleryFields = [
            'nombre_imagen2_c', 'nombre_imagen3_c', 'nombre_imagen4_c', 
            'nombre_imagen5_c', 'nombre_imagen6_c', 'nombre_imagen7_c',
            'nombre_imagen8_c', 'nombre_imagen9_c', 'nombre_imagen10_c'
        ];
        
        foreach ($galleryFields as $field) {
            if (!empty($product[$field])) {
                $images['gallery'][] = self::getProductImageUrl($product[$field], $size);
            }
        }
        
        // Si no hay imagen principal, usar placeholder
        if (empty($images['main'])) {
            $images['main'] = Router::url('/assets/images/placeholder-product.svg');
        }
        
        return $images;
    }
    
    /**
     * Genera un srcset responsivo para imágenes
     * 
     * @param string|null $imageName Nombre de la imagen
     * @return string Atributo srcset completo
     */
    public static function getResponsiveSrcset($imageName = null) {
        if (empty($imageName)) {
            return '';
        }
        
        $sizes = [
            '480w' => ['width' => 480, 'height' => 360],
            '768w' => ['width' => 768, 'height' => 576], 
            '1024w' => ['width' => 1024, 'height' => 768],
            '1200w' => ['width' => 1200, 'height' => 900]
        ];
        
        $srcset = [];
        foreach ($sizes as $descriptor => $dimensions) {
            $url = self::getImageUrl($imageName, $dimensions['width'], $dimensions['height']);
            $srcset[] = "{$url} {$descriptor}";
        }
        
        return implode(', ', $srcset);
    }
    
    /**
     * Valida si una imagen existe en el servidor
     * 
     * @param string $imageName Nombre de la imagen
     * @return bool True si existe, false si no
     */
    public static function imageExists($imageName) {
        if (empty($imageName)) {
            return false;
        }
        
        self::init();
        $url = self::$directImageUrl . $imageName;
        $headers = @get_headers($url);
        
        return $headers && strpos($headers[0], '200') !== false;
    }
    
    /**
     * Genera URL de imagen con fallback a placeholder
     * 
     * @param string|null $imageName Nombre de la imagen
     * @param string $size Tamaño de la imagen
     * @param string $placeholder Imagen placeholder personalizada
     * @return string URL final de la imagen
     */
    public static function getImageWithFallback($imageName = null, $size = 'medium', $placeholder = 'placeholder-product.svg') {
        if (empty($imageName)) {
            return Router::url("/assets/images/{$placeholder}");
        }
        
        // En un entorno de producción, podrías verificar si la imagen existe
        // Por ahora, confiamos en que el sistema WENZ HOU maneja esto
        return self::getProductImageUrl($imageName, $size);
    }
    
    /**
     * Configurar URL base del sistema de imágenes
     * 
     * @param string $baseUrl Nueva URL base
     */
    public static function setBaseImageUrl($baseUrl) {
        self::$baseImageUrl = rtrim($baseUrl, '/');
    }
    
    /**
     * Configurar ruta por defecto de imágenes
     * 
     * @param string $path Nueva ruta por defecto
     */
    public static function setDefaultImagePath($path) {
        self::$defaultImagePath = rtrim($path, '/') . '/';
    }
}
