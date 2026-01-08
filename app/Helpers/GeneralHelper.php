<?php

namespace App\Helpers;

class GeneralHelper
{
    /**
     * Obtiene los artículos disponibles en la tienda.
     *
     * @return array Lista de artículos de la tienda.
     */
    public static function getStoreItems()
    {
        return config('app.store_1');
    }

    /**
     * Obtiene la información de la empresa actual.
     *
     * @return mixed Información de la empresa.
     */
    public static function getCompany()
    {
        return config('app.company_1_id');
    }

    /**
     * Formatea un valor numérico como precio, utilizando el número de decimales especificado.
     *
     * @param float|int $price El valor numérico a formatear como precio.
     * @param int $decimals Opcional. Número de decimales a mostrar. Por defecto es 2.
     * @return string El precio formateado como cadena.
     */
    public static function formatPrice($price, $decimals = 2)
    {
        return '$' . number_format($price, $decimals, '.', ',');
    }

    /**
     * Formatea una fecha aplicando un desplazamiento de horas.
     *
     * @param string $date La fecha a formatear.
     * @param int $hoursOffset El número de horas a agregar o restar a la fecha.
     * @return string La fecha formateada con el desplazamiento aplicado.
     */
    public static function formatDate($date, $hoursOffset)
    {
        $hoursOffset = empty($hoursOffset) && !is_numeric($hoursOffset)
            ? config('app.less_hours_server')
            : $hoursOffset;
        return date('d/m/Y h:i A', strtotime($date . " {$hoursOffset} hours"));
    }

    /**
     * Elimina saltos de línea (\r\n, \n, \r) de una cadena y los reemplaza por espacios.
     *
     * @param string $value Cadena de texto a procesar.
     * @return string Cadena sin saltos de línea.
     */
    public static function removeLineBreaks($value)
    {
        return str_replace(["\r\n", "\n", "\r"], ' ', $value);
    }

    /**
     * Elimina todos los espacios de una cadena de texto.
     *
     * @param string $value Cadena de texto a procesar.
     * @return string Cadena sin espacios.
     */
    public static function removeSpace($value)
    {
        return str_replace([' ', "\t", "\n", "\r", "\0", "\x0B"], '', $value);
    }

    /**
     * Normaliza una URL agregando el prefijo 'https://' si no lo tiene.
     * Si la URL está vacía, retorna una cadena vacía.
     *
     * @param string $url URL a normalizar.
     * @return string URL normalizada.
     */
    public static function normalizeUrl($url)
    {
        if (empty($url)) {
            return '';
        }
        if (!str_starts_with($url, 'http://') && !str_starts_with($url, 'https://')) {
            $url = 'https://' . $url;
        }
        return $url;
    }
}
