<?php
// https://wenzhou.erponweb.com.mx/customcode/getListasEcommerce.php?tipoDato=categoria_0

/**
 * Helper para recuperar listas de datos
 * Utilizado para obtener categorías, marcas, etc.
 */

class ListHelper
{
    private static function fetchData($url)
    {
        $response = file_get_contents($url);
        return json_decode($response, true);
    }

    public static function getList($tipoDato)
    {
        $url = "https://wenzhou.erponweb.com.mx/customcode/getListasEcommerce.php?tipoDato={$tipoDato}";
        return self::fetchData($url);
    }

    public static function getCategories()
    {
        return self::getList('categoria_0');
    }
}
