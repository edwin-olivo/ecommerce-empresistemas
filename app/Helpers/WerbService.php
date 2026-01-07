<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class WerbService
{
    const CACHE_SESSION_KEY = 'werb_service_session';
    const SESSION_TIMEOUT = 3600; // 1 hora

    /**
     * Obtiene la sesión del servicio web, creando una nueva si es necesario.
     *
     * @param bool $forceNew Indica si se debe forzar la creación de una nueva sesión
     * @return string El ID de sesión del servicio web
     * @throws \Exception Si falla la autenticación
     */
    public static function getSession($forceNew = false)
    {
        if (!$forceNew && Cache::has(self::CACHE_SESSION_KEY)) {
            return Cache::get(self::CACHE_SESSION_KEY);
        }

        return self::ConnectWebService();
    }

    /**
     * Establece una conexión al servicio web.
     *
     * Este método inicializa y devuelve una conexión al servicio web externo
     * requerido para las operaciones de la aplicación.
     *
     * @return string El ID de sesión del servicio web.
     * @throws \Exception Si falla la autenticación
     */
    public static function ConnectWebService()
    {
        try {
            $login_parameters = [
                'user_auth' => [
                    'user_name' => config('app.user_web_service'),
                    'password' => md5(config('app.pass_web_service')),
                    'version' => '1',
                ],
                'application_name' => config('app.name'),
                'name_value_list' => [],
            ];

            $WerbService = new WerbService();
            $login_result = $WerbService->callWithLaravelHttp(
                'login',
                $login_parameters,
                config('app.ubication_web_service'),
            );

            if (!isset($login_result->id)) {
                throw new \Exception('No se recibió ID de sesión en la respuesta del servidor');
            }

            // Cachear la sesión
            Cache::put(self::CACHE_SESSION_KEY, $login_result->id, self::SESSION_TIMEOUT);

            Log::info('WebService Session created: ' . $login_result->id);

            return $login_result->id;
        } catch (\Exception $e) {
            Log::error('WebService Connection Error: ' . $e->getMessage());
            throw $e;
        }
    }

    /**
     * Cierra la sesión del servicio web
     *
     * @param string $sessionId ID de sesión a cerrar
     * @return bool Verdadero si se cerró exitosamente
     */
    public static function logoutWebService($sessionId = null)
    {
        try {
            if ($sessionId === null) {
                $sessionId = Cache::get(self::CACHE_SESSION_KEY);
            }

            if (!$sessionId) {
                return false;
            }

            $logout_parameters = [
                'session' => $sessionId,
            ];

            $WerbService = new WerbService();
            $WerbService->callWithLaravelHttp('logout', $logout_parameters, config('app.ubication_web_service'));

            Cache::forget(self::CACHE_SESSION_KEY);
            Log::info('WebService Session closed: ' . $sessionId);

            return true;
        } catch (\Exception $e) {
            Log::error('WebService Logout Error: ' . $e->getMessage());
            Cache::forget(self::CACHE_SESSION_KEY);
            return false;
        }
    }

    /**
     * Guarda datos en el servicio web
     *
     * @param string $module El nombre del módulo para la operación del servicio web
     * @param array $dataFields Los campos de datos a guardar
     * @param string|null $sessionId ID de sesión opcional
     * @return string ID del registro creado
     * @throws \Exception Si falla la operación
     */
    public static function saveDataWebService($module, $dataFields, $sessionId = null)
    {
        try {
            if ($sessionId === null) {
                $sessionId = self::getSession();
            }

            $set_entry_parameters = [
                'session' => $sessionId,
                'module_name' => $module,
                'name_value_list' => $dataFields,
            ];

            $WerbService = new WerbService();
            $set_entry_result = $WerbService->callWithLaravelHttp(
                'set_entry',
                $set_entry_parameters,
                config('app.ubication_web_service'),
            );

            if (!isset($set_entry_result->id)) {
                throw new \Exception('Error al guardar datos: respuesta inválida del servidor');
            }

            Log::info('WebService Data Saved: ' . json_encode($set_entry_result));

            return $set_entry_result->id;
        } catch (\Exception $e) {
            Log::error('WebService Save Error: ' . $e->getMessage());
            throw $e;
        }
    }

    /**
     * Recupera datos del servicio web
     *
     * @param array $entryArgs Argumentos de entrada para la solicitud
     * @param string $method Método del servicio web a utilizar (get_entry_list, get_entry, etc.)
     * @param string|null $sessionId ID de sesión opcional
     * @return \stdClass Datos recuperados del servicio web
     * @throws \Exception Si falla la operación
     */
    public static function retrieveDataWebService($entryArgs, $method = 'get_entry_list', $sessionId = null)
    {
        try {
            if ($sessionId === null) {
                $sessionId = self::getSession();
            }

            $entryArgs = array_merge(['session' => $sessionId], $entryArgs);

            $WerbService = new WerbService();
            $result = $WerbService->callWithLaravelHttp($method, $entryArgs, config('app.ubication_web_service'));

            if (!$result) {
                throw new \Exception('Error al obtener datos: Respuesta inválida del servidor');
            }

            return $result;
        } catch (\Exception $e) {
            Log::error('WebService Retrieve Error: ' . $e->getMessage());
            throw $e;
        }
    }

    /**
     * Llama a un servicio web utilizando el método, los parámetros y la URL especificados.
     *
     * @param string $method El método a ejecutar en el servicio web
     * @param array $parameters Los parámetros que se enviarán
     * @param string $url La URL del servicio web
     * @return \stdClass La respuesta del servicio web
     * @throws \Exception Si falla la solicitud
     */
    public function call($method, $parameters, $url)
    {
        try {
            $jsonEncodedData = json_encode($parameters);
            $post = [
                'method' => $method,
                'input_type' => 'JSON',
                'response_type' => 'JSON',
                'rest_data' => $jsonEncodedData,
            ];

            $curl_request = curl_init();
            curl_setopt($curl_request, CURLOPT_URL, $url);
            curl_setopt($curl_request, CURLOPT_POST, 1);
            curl_setopt($curl_request, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_0);
            curl_setopt($curl_request, CURLOPT_HEADER, 1);
            curl_setopt($curl_request, CURLOPT_SSL_VERIFYPEER, 0);
            curl_setopt($curl_request, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($curl_request, CURLOPT_FOLLOWLOCATION, 0);
            curl_setopt($curl_request, CURLOPT_TIMEOUT, 30);
            curl_setopt($curl_request, CURLOPT_POSTFIELDS, $post);

            $result = curl_exec($curl_request);
            $httpCode = curl_getinfo($curl_request, CURLINFO_HTTP_CODE);
            $curlError = curl_error($curl_request);

            curl_close($curl_request);

            if ($result === false) {
                throw new \Exception('Error en la solicitud CURL: ' . $curlError);
            }

            if ($httpCode >= 400) {
                throw new \Exception('HTTP Error ' . $httpCode . ': ' . $result);
            }

            $result = explode("\r\n\r\n", $result, 2);
            if (!isset($result[1])) {
                throw new \Exception('Respuesta vacía del servidor');
            }

            $response = json_decode($result[1]);

            if ($response === null) {
                throw new \Exception('Error al decodificar JSON: ' . json_last_error_msg());
            }

            return $response;
        } catch (\Exception $e) {
            Log::error('WebService Call Error (' . $method . '): ' . $e->getMessage());
            throw $e;
        }
    }

    /**
     * Realiza una llamada HTTP utilizando el cliente HTTP de Laravel.
     *
     * @param string $method El método a ejecutar
     * @param array $parameters Los parámetros a enviar
     * @param string $url La URL del servicio
     * @return \stdClass La respuesta del servicio
     * @throws \Exception Si falla la solicitud
     */
    public function callWithLaravelHttp($method, $parameters, $url)
    {
        try {
            $jsonEncodedData = json_encode($parameters);
            $post = [
                'method' => $method,
                'input_type' => 'JSON',
                'response_type' => 'JSON',
                'rest_data' => $jsonEncodedData,
            ];

            $response = Http::asForm()->post($url, $post);

            if ($response->failed()) {
                throw new \Exception('HTTP Error ' . $response->status() . ': ' . $response->body());
            }

            return $response->object();
        } catch (\Exception $e) {
            Log::error('WebService Http Error (' . $method . '): ' . $e->getMessage());
            throw $e;
        }
    }

    /**
     * Genera un identificador único global (GUID)
     *
     * @return string Una cadena GUID única
     */
    public static function create_guid()
    {
        $WerbService = new WerbService();
        $microTime = microtime();
        list($a_dec, $a_sec) = explode(' ', $microTime);

        $dec_hex = dechex($a_dec * 1000000);
        $sec_hex = dechex($a_sec);

        $WerbService->ensure_length($dec_hex, 5);
        $WerbService->ensure_length($sec_hex, 6);

        $guid = '';
        $guid .= $dec_hex;
        $guid .= $WerbService->create_guid_section(3);
        $guid .= '-';
        $guid .= $WerbService->create_guid_section(4);
        $guid .= '-';
        $guid .= $WerbService->create_guid_section(4);
        $guid .= '-';
        $guid .= $WerbService->create_guid_section(4);
        $guid .= '-';
        $guid .= $sec_hex;
        $guid .= $WerbService->create_guid_section(6);

        return $guid;
    }

    /**
     * Crea una sección de un GUID
     *
     * @param int $characters Cantidad de caracteres
     * @return string Sección del GUID
     */
    public function create_guid_section($characters)
    {
        $return = '';
        for ($i = 0; $i < $characters; $i++) {
            $return .= dechex(mt_rand(0, 15));
        }
        return $return;
    }

    /**
     * Asegura que una cadena cumpla con una longitud especificada
     *
     * @param string $string Cadena a verificar (por referencia)
     * @param int $length Longitud requerida
     * @return void
     */
    public function ensure_length(&$string, $length)
    {
        $strlen = strlen($string);
        if ($strlen < $length) {
            $string = str_pad($string, $length, '0');
        } else if ($strlen > $length) {
            $string = substr($string, 0, $length);
        }
    }
}
