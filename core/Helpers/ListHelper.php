<?php
// https://wenzhou.erponweb.com.mx/customcode/getListasEcommerce.php?tipoDato=categoria_0

/**
 * Helper para recuperar listas de datos
 * Utilizado para obtener categorías, marcas, etc.
 */

class ListHelper
{
    /**
     * Genera una clave de caché estandarizada para una lista
     * 
     * @param string $list Nombre de la lista
     * @return string Clave de caché
     */
    function generateListCacheKey($list)
    {
        return "list_{$list}";
    }

    /**
     * Obtiene la ruta del archivo de caché para una lista
     * 
     * @param string $list Nombre de la lista
     * @return string Ruta del archivo de caché
     */
    function getListCacheFilePath($list)
    {
        $cacheKey = $this->generateListCacheKey($list);
        return __DIR__ . "/../../temp/list/{$cacheKey}.json";
    }

    /**
     * Verifica si existe una caché válida para una lista
     * 
     * @param string $list Nombre de la lista
     * @param int $cacheExpiry Tiempo de expiración en segundos
     * @return bool True si la caché es válida
     */
    function hasValidCache($list, $cacheExpiry = 3600)
    {
        $cacheFile = $this->getListCacheFilePath($list);
        return file_exists($cacheFile) && (time() - filemtime($cacheFile) < $cacheExpiry);
    }

    /**
     * Obtiene datos desde la caché
     * 
     * @param string $list Nombre de la lista
     * @return array Datos almacenados en caché
     */
    function getListFromCache($list)
    {
        $cacheFile = $this->getListCacheFilePath($list);
        if (file_exists($cacheFile)) {
            return json_decode(file_get_contents($cacheFile), true);
        }
        return [];
    }

    /**
     * Guarda datos en la caché
     * 
     * @param string $list Nombre de la lista
     * @param string $responseData Datos a almacenar (JSON string)
     * @return bool True si se guardó correctamente
     */
    function saveListToCache($list, $responseData)
    {
        $cacheFile = $this->getListCacheFilePath($list);
        // Crear directorio si no existe
        $cacheDir = dirname($cacheFile);
        if (!is_dir($cacheDir)) {
            mkdir($cacheDir, 0755, true);
        }
        return file_put_contents($cacheFile, $responseData) !== false;
    }

    /**
     * Realiza una petición HTTP a la API
     * 
     * @param string $url URL a consultar
     * @return array [response, error, httpCode]
     */
    function makeApiRequest($url)
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

    /**
     * Obtiene una lista del ERP con manejo de caché
     * 
     * @param string $list Nombre de la lista a obtener
     * @return array Datos de la lista
     */
    function listERP($list = '')
    {
        if (empty($list)) {
            return [];
        }

        // Verificar si hay caché válida
        if ($this->hasValidCache($list)) {
            return $this->getListFromCache($list);
        }

        // Intentar obtener datos frescos
        $url = "https://wenzhou.erponweb.com.mx/index.php?entryPoint=SugarListExternalAccess&list={$list}";
        $apiResult = $this->makeApiRequest($url);

        // Procesar respuesta
        if (empty($apiResult['error']) && $apiResult['httpCode'] == 200) {
            $result = json_decode($apiResult['response'], true);
            // Guardar en caché si la respuesta es válida
            if ($result !== null) {
                $this->saveListToCache($list, $apiResult['response']);
                return $result;
            }
        }

        // Registrar el error
        // error_log("Error obteniendo lista ERP '{$list}': {$apiResult['error']}, HTTP Code: {$apiResult['httpCode']}");

        // En caso de error, intentar usar caché antigua
        $cachedData = $this->getListFromCache($list);
        if (!empty($cachedData)) {
            // error_log("Usando datos en caché para lista ERP '{$list}'");
            return $cachedData;
        }

        // Si todo falla, devolver array vacío
        return [];
    }

    /**
     * Obtiene la lista de categorías
     * 
     * @return array Lista de categorías
     */
    function getCategories()
    {
        return $this->listERP('categoria_0');
    }

    /**
     * Obtiene la lista de marcas
     * 
     * @return array Lista de marcas
     */
    function getBrands()
    {
        return $this->listERP('marca_list');
    }

    /**
     * Obtiene la lista de subcategorías
     * 
     * @return array Lista de subcategorías
     */
    function getSubcategories()
    {
        return $this->listERP('clase_list');
    }
}
