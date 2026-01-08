<?php

namespace App\Helpers;

class DataFieldsHelper
{
    /**
     * Convierte un array asociativo en el formato requerido por el servicio web
     * Transforma: ['name' => 'value', ...] en [['name' => 'name', 'value' => 'value'], ...]
     *
     * @param array $fields Array asociativo con los campos
     * @return array Array formateado para el servicio web
     */
    public static function buildDataFieldsArray(array $fields)
    {
        $dataFields = [];
        foreach ($fields as $name => $value) {
            $dataFields[] = ['name' => $name, 'value' => $value];
        }
        return $dataFields;
    }

    /**
     * Convierte la respuesta del servicio web en un array asociativo
     * Transforma: [['name' => 'name', 'value' => 'value'], ...] en ['name' => 'value', ...]
     * También puede procesar objetos con propiedades 'name' y 'value'
     *
     * @param array|\stdClass $dataFields Array o iterable de campos del servicio web
     * @return array Array asociativo con los datos parseados
     */
    public static function parseDataFieldsArray($dataFields)
    {
        $fields = [];

        if ($dataFields instanceof \stdClass) {
            $dataFields = (array) $dataFields;
        }

        foreach ($dataFields as $field) {
            $name = null;
            $value = null;

            // Manejar objetos
            if (is_object($field)) {
                $name = $field->name ?? null;
                $value = $field->value ?? null;
            }
            // Manejar arrays
            elseif (is_array($field)) {
                $name = $field['name'] ?? null;
                $value = $field['value'] ?? null;
            }

            if ($name !== null) {
                $fields[$name] = $value;
            }
        }

        return $fields;
    }

    /**
     * Procesa un array de registros del servicio web y convierte cada uno a formato asociativo
     * Útil para procesar múltiples registros de la respuesta get_entry_list
     *
     * @param array $records Array de registros del servicio web
     * @return array Array de registros convertidos a formato asociativo
     */
    public static function parseRecordsArray(array $records)
    {
        $result = [];

        foreach ($records as $record) {
            if (is_object($record) && isset($record->name_value_list)) {
                $result[] = self::parseDataFieldsArray($record->name_value_list);
            } elseif (is_array($record) && isset($record['name_value_list'])) {
                $result[] = self::parseDataFieldsArray($record['name_value_list']);
            }
        }

        return $result;
    }
}
