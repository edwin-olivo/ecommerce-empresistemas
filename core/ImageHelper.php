<?php

/**
 * Helper para manejo de imágenes
 * Genera URLs optimizadas para las imágenes del sistema
 */

class ImageHelper
{

    /**
     * URL base del sistema de imágenes
     */
    private static $baseImageUrl;
    private static $defaultImagePath;
    private static $directImageUrl;

    /**
     * Inicializar configuración
     */
    private static function init()
    {
        if (self::$baseImageUrl === null) {
            self::$baseImageUrl = defined('IMAGE_BASE_URL') ? IMAGE_BASE_URL : 'https://wenzhou.erponweb.com.mx/customcode/redim.php';
            self::$defaultImagePath = defined('IMAGE_PATH') ? IMAGE_PATH : 'imagenes/';
            self::$directImageUrl = defined('DIRECT_IMAGE_URL') ? DIRECT_IMAGE_URL : 'https://wenzhou.erponweb.com.mx/imagenes/';
        }
    }

    /**
     * Genera URL de imagen para productos
     * 
     * @param string|null $imageName Nombre de la imagen
     * @param string $size Tamaño predefinido (thumbnail, medium, large, original)
     * @return string URL de la imagen
     */
    public static function getProductImageUrl($imageName = null, $size = 'medium')
    {
        self::init();

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

         $params = [
            'img' => self::$defaultImagePath . $imageName,
            'ancho' => $dimensions['width'],
            'alto' => $dimensions['height']
        ];

        return self::$baseImageUrl . '?' . http_build_query($params);
    }

    /**
     * Genera URL de imagen con fallback a placeholder
     * 
     * @param string|null $imageName Nombre de la imagen
     * @param string $size Tamaño de la imagen
     * @param string $placeholder Imagen placeholder personalizada
     * @return string URL final de la imagen
     */
    public static function getImageWithFallback($imageName = null, $size = 'medium', $placeholder = 'placeholder-product.svg')
    {
        if (empty($imageName)) {
            return Router::url("/assets/images/{$placeholder}");
        }

        // En un entorno de producción, podrías verificar si la imagen existe
        // Por ahora, confiamos en que el sistema maneja esto
        return self::getProductImageUrl($imageName, $size);
    }
}
