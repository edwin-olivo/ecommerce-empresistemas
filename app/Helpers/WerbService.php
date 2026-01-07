<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class WerbService
{
    /**
     * Establece una conexión al servicio web.
     *
     * Este método inicializa y devuelve una conexión al servicio web externo
     * requerido para las operaciones de la aplicación.
     *
     * @return mixed El objeto o recurso de conexión del servicio web.
     */
    public static function ConnectWebService()
    {
        $login_parameters = [
            'user_auth' => [
                'user_name' => config('app.user_web_service'),
                'password' => md5(config('app.pass_web_service')),
                'version' => '1',
            ],
            'application_name' => 'RestTest',
            'name_value_list' => [],
        ];

        $WerbService = new WerbService();
        $login_result = $WerbService->call('login', $login_parameters, config('app.ubication_web_service'));

        return $login_result->id;
    }

    /**
     * Guarda datos en el servicio web
     *
     * @param string $module El nombre del módulo para la operación del servicio web
     * @param array $dataFields Los campos de datos a guardar
     * @return mixed La respuesta del servicio web
     */
    public static function saveDataWebService($module, $dataFields)
    {
        $webServiceId = WerbService::ConnectWebService();
        $set_entry_parameters = [
            'session' => $webServiceId, // session id
            'module_name' => $module, // The name of the module from which to retrieve records.
            'name_value_list' => $dataFields, // Record attributes
        ];

        $WerbService = new WerbService();
        $set_entry_result = $WerbService->call('set_entry', $set_entry_parameters, config('app.ubication_web_service'));

        Log::info('WebService Response: ' . json_encode($set_entry_result));

        return $set_entry_result->id;
    }

    /**
     * Llama a un servicio web utilizando el método, los parámetros y la URL especificados.
     *
     * @param string $method El método HTTP a utilizar (por ejemplo, 'GET', 'POST').
     * @param array  $parameters Los parámetros que se enviarán en la solicitud.
     * @param string $url La URL del servicio web al que se realizará la llamada.
     *
     * @return mixed La respuesta del servicio web.
     */
    public function call($method, $parameters, $url)
    {
        ob_start();
        $curl_request = curl_init();
        curl_setopt($curl_request, CURLOPT_URL, $url);
        curl_setopt($curl_request, CURLOPT_POST, 1);
        curl_setopt($curl_request, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_0);
        curl_setopt($curl_request, CURLOPT_HEADER, 1);
        curl_setopt($curl_request, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt($curl_request, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl_request, CURLOPT_FOLLOWLOCATION, 0);
        $jsonEncodedData = json_encode($parameters);
        $post = [
            'method' => $method,
            'input_type' => 'JSON',
            'response_type' => 'JSON',
            'rest_data' => $jsonEncodedData,
        ];
        curl_setopt($curl_request, CURLOPT_POSTFIELDS, $post);
        $result = curl_exec($curl_request);
        curl_close($curl_request);
        $result = explode("\r\n\r\n", $result, 2);
        $response = json_decode($result[1]);
        ob_end_flush();
        return $response;
    }

    /**
     * Realiza una llamada HTTP utilizando el cliente HTTP de Laravel.
     *
     * @param string $method El método HTTP a utilizar (por ejemplo, 'GET', 'POST', etc.).
     * @param array $parameters Los parámetros que se enviarán en la solicitud.
     * @param string $url La URL a la que se realizará la solicitud.
     * @return mixed La respuesta de la solicitud HTTP.
     */
    public function callWithLaravelHttp($method, $parameters, $url)
    {
        $jsonEncodedData = json_encode($parameters);
        $post = [
            'method' => $method,
            'input_type' => 'JSON',
            'response_type' => 'JSON',
            'rest_data' => $jsonEncodedData,
        ];

        try {
            $response = Http::withoutVerifying()->post($url, $post);

            return $response->json();
        } catch (\Exception $e) {
            Log::error('WebService Http Error: ' . $e->getMessage());
            return null;
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
     * Crea una sección de un GUID (Identificador Único Global)
     *
     * @param int $characters La cantidad de caracteres a generar para la sección del GUID
     * @return string La sección generada del GUID
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
     * Asegura que una cadena cumpla con una longitud especificada.
     *
     * @param string $string La cadena a verificar y modificar. Se pasa por referencia.
     * @param int $length La longitud requerida para la cadena.
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
