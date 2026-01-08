<?php

namespace App\Helpers;

class DataFieldsHelper
{
    public static function buildDataFieldsArray(array $fields)
    {
        $dataFields = [];
        foreach ($fields as $name => $value) {
            $dataFields[] = ['name' => $name, 'value' => $value];
        }
        return $dataFields;
    }
}
