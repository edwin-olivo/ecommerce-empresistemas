<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

/**
 * Class AosInvoice
 *
 * @property string $id
 * @property string|null $name
 * @property Carbon|null $date_entered
 * @property Carbon|null $date_modified
 * @property string|null $modified_user_id
 * @property string|null $created_by
 * @property string|null $description
 * @property bool|null $deleted
 * @property string|null $assigned_user_id
 * @property string|null $billing_account_id
 * @property string|null $billing_contact_id
 * @property string|null $billing_address_street
 * @property string|null $billing_address_city
 * @property string|null $billing_address_state
 * @property string|null $billing_address_postalcode
 * @property string|null $billing_address_country
 * @property string|null $shipping_address_street
 * @property string|null $shipping_address_city
 * @property string|null $shipping_address_state
 * @property string|null $shipping_address_postalcode
 * @property string|null $shipping_address_country
 * @property string|null $number
 * @property float|null $total_amt
 * @property float|null $subtotal_amount
 * @property float|null $discount_amount
 * @property float|null $tax_amount
 * @property float|null $shipping_amount
 * @property float|null $total_amount
 * @property string|null $currency_id
 * @property int|null $quote_number
 * @property Carbon|null $quote_date
 * @property Carbon|null $invoice_date
 * @property Carbon|null $due_date
 * @property string|null $status
 * @property string|null $template_ddown_c
 * @property float|null $subtotal_tax_amount
 *
 * @package App\Models
 */
class AosInvoices extends Model
{
    use HasUuids;

    protected $table = 'aos_invoices';
    public $incrementing = false;
    public $timestamps = false;

    protected $casts = [
        'id' => 'string',
        'date_entered' => 'datetime',
        'date_modified' => 'datetime',
        'deleted' => 'bool',
        'total_amt' => 'float',
        'subtotal_amount' => 'float',
        'discount_amount' => 'float',
        'tax_amount' => 'float',
        'shipping_amount' => 'float',
        'total_amount' => 'float',
        'quote_number' => 'int',
        'quote_date' => 'datetime',
        'invoice_date' => 'datetime',
        'due_date' => 'datetime',
        'subtotal_tax_amount' => 'float',
    ];

    protected $fillable = [
        'name',
        'date_entered',
        'date_modified',
        'modified_user_id',
        'created_by',
        'description',
        'deleted',
        'assigned_user_id',
        'billing_account_id',
        'billing_contact_id',
        'billing_address_street',
        'billing_address_city',
        'billing_address_state',
        'billing_address_postalcode',
        'billing_address_country',
        'shipping_address_street',
        'shipping_address_city',
        'shipping_address_state',
        'shipping_address_postalcode',
        'shipping_address_country',
        'number',
        'total_amt',
        'subtotal_amount',
        'discount_amount',
        'tax_amount',
        'shipping_amount',
        'total_amount',
        'currency_id',
        'quote_number',
        'quote_date',
        'invoice_date',
        'due_date',
        'status',
        'template_ddown_c',
        'subtotal_tax_amount',
    ];

    /**
     * Relacion uno a uno con la tabla personalizada AosInvoicesCstm
     */
    public function custom()
    {
        return $this->hasOne(AosInvoicesCstm::class, 'id_c', 'id');
    }

    /**
     * Convierte el modelo actual en un arreglo.
     *
     * @return array El modelo representado como un arreglo.
     */
    public function toArray()
    {
        $array = parent::toArray();

        if ($this->custom) {
            $array = array_merge($array, $this->custom->toArray());
        }

        return $array;
    }
}
