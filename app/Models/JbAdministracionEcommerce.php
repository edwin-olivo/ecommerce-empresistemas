<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

/**
 * Class JbAdministracionEcommerce
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
 * @property string|null $historia_empresa
 * @property string|null $mision_empresa
 * @property string|null $vision_empresa
 * @property string|null $icono_valor_empresa1
 * @property string|null $icono_valor_empresa2
 * @property string|null $icono_valor_empresa3
 * @property string|null $icono_valor_empresa4
 * @property string|null $valor_ecommerce1
 * @property string|null $valor_ecommerce2
 * @property string|null $valor_ecommerce3
 * @property string|null $valor_ecommerce4
 *
 * @package App\Models
 */
class JbAdministracionEcommerce extends Model
{
    use HasUuids;

    protected $table = 'jb_administracion_ecommerce';
    public $incrementing = false;
    public $timestamps = false;

    protected $casts = [
        'id' => 'string',
        'date_entered' => 'datetime',
        'date_modified' => 'datetime',
        'deleted' => 'bool',
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
        'historia_empresa',
        'mision_empresa',
        'vision_empresa',
        'icono_valor_empresa1',
        'icono_valor_empresa2',
        'icono_valor_empresa3',
        'icono_valor_empresa4',
        'valor_ecommerce1',
        'valor_ecommerce2',
        'valor_ecommerce3',
        'valor_ecommerce4',
    ];
}
