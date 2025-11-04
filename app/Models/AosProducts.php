<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class AosProduct
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
 * @property string|null $maincode
 * @property string|null $part_number
 * @property string|null $category
 * @property string|null $type
 * @property float|null $cost
 * @property string|null $currency_id
 * @property float|null $price
 * @property string|null $url
 * @property string|null $contact_id
 * @property string|null $product_image
 *
 * @package App\Models
 */
class AosProducts extends Model
{
	protected $table = 'aos_products';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'date_entered' => 'datetime',
		'date_modified' => 'datetime',
		'deleted' => 'bool',
		'cost' => 'float',
		'price' => 'float'
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
		'maincode',
		'part_number',
		'category',
		'type',
		'cost',
		'currency_id',
		'price',
		'url',
		'contact_id',
		'product_image'
	];

	/**
	 * Relacion uno a uno con la tabla personalizada AosProductsCstm
	 */
	public function custom()
	{
		return $this->hasOne(AosProductsCstm::class, 'id_c', 'id');
	}
}
