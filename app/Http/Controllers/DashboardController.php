<?php

namespace App\Http\Controllers;

use App\Helpers\DataFieldsHelper;
use App\Helpers\ListHelper;
use App\Services\AOS_InvoicesService;

class DashboardController extends Controller
{
    function orders()
    {
        // Datos del usuario
        $userData = [
            'id' => '9e3747fb-a9fe-1486-bcbd-665e2de0abb0', // ID temporal hasta integrar usuarios ERP
            'name' => 'DEMO EMPRESISTEMAS 01', // Nombre temporal hasta integrar usuarios ERP
        ];

        $invoiceService = new AOS_InvoicesService();
        $orders = $invoiceService->getOrdersByUser($userData['id'], 2);
        $ordersArray = DataFieldsHelper::parseRecordsArray($orders);

        // Ordenar por fecha (date_entered) descendente
        usort($ordersArray, static function ($a, $b) {
            return strtotime($b['date_entered']) - strtotime($a['date_entered']);
        });

        return inertia('dashboard/orders', [
            'orders' => $ordersArray,
            'listas' => [
                'estatus_envio_list' => ListHelper::getERPList('estatus_envio_list'),
                'invoice_status_dom' => ListHelper::getERPList('invoice_status_dom'),
            ],
        ]);
    }
}
