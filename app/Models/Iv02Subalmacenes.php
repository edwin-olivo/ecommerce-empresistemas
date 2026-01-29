<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Iv02Subalmacene
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
 * @property string|null $subalmacen
 * @property string|null $almacenpadre
 * @property string|null $id_producto
 * @property float|null $deficit
 * @property float|null $cantidad
 * @property float|null $existenciareal
 *
 * @package App\Models
 */
class Iv02Subalmacenes extends Model
{
    protected $table = 'iv02_subalmacenes';
    public $incrementing = false;
    public $timestamps = false;

    protected $casts = [
        'date_entered' => 'datetime',
        'date_modified' => 'datetime',
        'deleted' => 'bool',
        'deficit' => 'float',
        'cantidad' => 'float',
        'existenciareal' => 'float',
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
        'subalmacen',
        'almacenpadre',
        'id_producto',
        'deficit',
        'cantidad',
        'existenciareal',
    ];
}
