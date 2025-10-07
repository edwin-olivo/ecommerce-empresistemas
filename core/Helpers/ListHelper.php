<?php

class ListHelper
{
    private static $cacheDir = __DIR__ . "/../../temp/list/";

    /**
     * @var array Mapeo de alias a nombres de listas reales en el ERP.
     */
    private static $listMap = [
        'categories'    => 'categoria_0',
        'brands'        => 'marca_list',
        'subcategories' => 'clase_list',
        // Puedes agregar más alias aquí
    ];

    /**
     * Obtiene una lista del ERP usando un alias.
     * Esta es la nueva forma simplificada de acceder a las listas.
     *
     * @param string $alias El alias de la lista (ej. 'categories', 'brands').
     * @return array Los datos de la lista.
     */
    public static function get($alias)
    {
        if (!isset(self::$listMap[$alias])) {
            // Si el alias no existe, tal vez se pasó el nombre real de la lista
            $listName = $alias;
        } else {
            $listName = self::$listMap[$alias];
        }
        
        return self::cleanEmptyEntries(self::listERP($listName));
    }

    /**
     * Obtiene la lista de categorías (método de conveniencia).
     */
    public static function getCategories()
    {
        return self::get('categories');
    }

    /**
     * Obtiene la lista de marcas (método de conveniencia).
     */
    public static function getBrands()
    {
        return self::get('brands');
    }

    /**
     * Obtiene la lista de subcategorías (método de conveniencia).
     */
    public static function getSubcategories()
    {
        return self::get('subcategories');
    }

    // --- MÉTODOS INTERNOS (AHORA ESTÁTICOS) ---

    private static function generateListCacheKey($list)
    {
        return "list_{$list}";
    }

    private static function getListCacheFilePath($list)
    {
        $cacheKey = self::generateListCacheKey($list);
        return self::$cacheDir . "{$cacheKey}.json";
    }

    private static function hasValidCache($list, $cacheExpiry = 3600)
    {
        $cacheFile = self::getListCacheFilePath($list);
        return file_exists($cacheFile) && (time() - filemtime($cacheFile) < $cacheExpiry);
    }

    private static function getListFromCache($list)
    {
        $cacheFile = self::getListCacheFilePath($list);
        if (file_exists($cacheFile)) {
            return json_decode(file_get_contents($cacheFile), true);
        }
        return [];
    }

    private static function saveListToCache($list, $responseData)
    {
        $cacheFile = self::getListCacheFilePath($list);
        $cacheDir = dirname($cacheFile);
        if (!is_dir($cacheDir)) {
            mkdir($cacheDir, 0755, true);
        }
        return file_put_contents($cacheFile, $responseData) !== false;
    }

    private static function makeApiRequest($url)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $response = curl_exec($ch);
        $error = curl_error($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        return ['response' => $response, 'error' => $error, 'httpCode' => $httpCode];
    }

    private static function listERP($list = '')
    {
        if (empty($list)) return [];

        if (self::hasValidCache($list)) {
            return self::getListFromCache($list);
        }

        $url = "https://wenzhou.erponweb.com.mx/index.php?entryPoint=SugarListExternalAccess&list={$list}";
        $apiResult = self::makeApiRequest($url);

        if (empty($apiResult['error']) && $apiResult['httpCode'] == 200) {
            $result = json_decode($apiResult['response'], true);
            if ($result !== null) {
                self::saveListToCache($list, $apiResult['response']);
                return $result;
            }
        }

        $cachedData = self::getListFromCache($list);
        if (!empty($cachedData)) {
            return $cachedData;
        }

        return [];
    }

    private static function cleanEmptyEntries($list)
    {
        if (!is_array($list)) return [];
        foreach ($list as $key => $value) {
            if (empty($value) || trim($value) === '') {
                unset($list[$key]);
            }
        }
        return $list;
    }

    public static function cleanupCache()
    {
        if (is_dir(self::$cacheDir)) {
            $files = glob(self::$cacheDir . 'list_*.json');
            foreach ($files as $file) {
                if (is_file($file)) {
                    unlink($file);
                }
            }
        }
    }
}