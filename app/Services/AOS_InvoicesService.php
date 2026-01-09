<?php

namespace App\Services;

use App\Helpers\WerbService;

class AOS_InvoicesService
{
    function getUserById($userId)
    {
        $entryArgs = [
            'module_name' => 'Accounts',
            'query' => "accounts.id = '$userId'",
            'order_by' => '',
            'offset' => 0,
            'select_fields' => [],
            'max_results' => 1,
            'deleted' => 0,
        ];

        try {
            $result = WerbService::retrieveDataWebService($entryArgs);
            if (!empty($result->entry_list)) {
                return $result->entry_list[0];
            } else {
                return null;
            }
        } catch (\Exception $e) {
            return null;
        }
    }

    function getOrderById($orderId)
    {
        $entryArgs = [
            'module_name' => 'AOS_Invoices',
            'query' => "aos_invoices.id = '$orderId'",
            'order_by' => '',
            'offset' => 0,
            'select_fields' => [],
            'max_results' => 1,
            'deleted' => 0,
        ];

        try {
            $result = WerbService::retrieveDataWebService($entryArgs);
            if (!empty($result->entry_list)) {
                return $result->entry_list[0];
            } else {
                return null;
            }
        } catch (\Exception $e) {
            return null;
        }
    }

    function getOrdersByUser($userId, $limit = 50)
    {
        $entryArgs = [
            'module_name' => 'AOS_Invoices',
            'query' => "aos_invoices.billing_account_id = '$userId'",
            'order_by' => 'date_modified DESC',
            'offset' => 0,
            'select_fields' => [],
            'max_results' => $limit,
            'deleted' => 0,
        ];

        try {
            $result = WerbService::retrieveDataWebService($entryArgs);
            return $result->entry_list;
        } catch (\Exception $e) {
            return [];
        }
    }

    function getPayment($paymentId)
    {
        $entryArgs = [
            'module_name' => 'IV12_PolizadeCobros1',
            'query' => "iv12_polizadecobros1.id = '$paymentId'",
            'order_by' => '',
            'offset' => 0,
            'select_fields' => [],
            'max_results' => 1,
            'deleted' => 0,
        ];

        try {
            $result = WerbService::retrieveDataWebService($entryArgs);
            if (!empty($result->entry_list)) {
                return $result->entry_list[0];
            } else {
                return null;
            }
        } catch (\Exception $e) {
            return null;
        }
    }
}
