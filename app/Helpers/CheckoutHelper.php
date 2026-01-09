<?php

namespace App\Helpers;

use DateTime;

class CheckoutHelper
{
    public static function calculatePriceInfo($data)
    {
        $time = 0;
        $porcentageDiscount = 0;
        $price = $data['price'];

        if (!empty($data['start_date_c']) && !empty($data['end_date_c']) && !empty($data['precio_promo_c'])) {
            $time = self::timer($data['start_date_c'], $data['end_date_c']);
            $porcentageDiscount = self::promotionDiscount($data['price'], $data['precio_promo_c']);
            if ($time > 0) {
                $price = $data['precio_promo_c'] ?? $data['price'];
            }
        }

        $tax = $data['tasa_iva_c'] ?? 0;

        return [
            'base_price' => $tax <= 0 ? $data['price'] : self::taxPrice($tax, $data['price']),
            'price' => $tax <= 0 ? $price : self::taxPrice($tax, $price),
            'price_without_tax' => $price,
            'time' => $time,
            'porcentageDiscount' => $porcentageDiscount,
        ];
    }

    public static function calculateOrderTotals($itemData)
    {
        $subtotal = 0;
        $taxAmount = 0;
        $total = 0;

        foreach ($itemData as $item) {
            $subtotal += $item['subtotal'];
            $taxAmount += $item['tax-amount'];
            $total += $item['total'];
        }

        return [
            'subtotal' => $subtotal,
            'tax-amount' => $taxAmount,
            'total' => $total,
        ];
    }

    public static function calculateTotals($itemData)
    {
        return self::calculateOrderTotals($itemData);
    }

    public static function calculateTotalItem($price, $quantity, $tax)
    {
        $subtotal = round($price * $quantity, 2);
        $taxAmount = round($subtotal * ($tax / 100), 2);
        $total = round($subtotal + $taxAmount, 2);

        return [
            'subtotal' => $subtotal,
            'tax-amount' => $taxAmount,
            'total' => $total,
        ];
    }

    public static function shippingCost($total)
    {
        return $total <= config('app.min_shipping_cost') ? config('app.shipping_cost') : 0;
    }

    public static function timer($start, $end)
    {
        // Fecha de inicio (con hora 00:00:00)
        $startDate = new DateTime($start . ' 00:00:00');
        // Fecha de fin (con hora 23:59:59 del último día)
        $endDate = new DateTime($end . ' 23:59:59');

        // Fecha actual
        $currentDate = new DateTime();
        $currentDate->modify(config('app.less_hours_server') . ' hours');

        // Si la fecha actual es anterior a la fecha de inicio, usar la fecha de inicio como referencia
        if ($currentDate >= $startDate) {
            $referenceDate = $currentDate;
        } else {
            return 0;
        }

        // Si la fecha actual ya superó la fecha final, el timer es 0
        if ($referenceDate > $endDate) {
            $seconds = 0;
        } else {
            // Calcular la diferencia en segundos
            $diferencia = $endDate->getTimestamp() - $referenceDate->getTimestamp();
            $seconds = $diferencia;
        }

        return $seconds;
    }

    public static function promotionDiscount($price, $promotionPrice)
    {
        // Cálculo del descuento en valor monetario
        $amount_discount = $price - $promotionPrice;
        // Cálculo del porcentaje de descuento
        $porcentage_discount = ($amount_discount / $price) * 100;
        // Redondeo a 2 decimales
        return round($porcentage_discount, 2);
    }

    public static function taxPrice($tax, $price)
    {
        $porcentageTax = round($tax / 100, 4);
        return round($price * ($porcentageTax + 1), 2);
    }
}
