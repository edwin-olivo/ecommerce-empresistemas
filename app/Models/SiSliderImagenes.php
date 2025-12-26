<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

/**
 * Class SiSliderImagene
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
 * @property string|null $ce_configuracion_ecommerce_id_c
 *
 * @package App\Models
 */
class SiSliderImagenes extends Model
{
    use HasUuids;

    protected $table = 'si_slider_imagenes';
    protected $appends = ['url_imagen'];
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
        'ce_configuracion_ecommerce_id_c',
    ];

    public function getUrlImagenAttribute()
    {
        return $this->name
            ? config('app.base_url') . '/customcode/Ecommerce/Configuraciones/Slider/' . $this->name
            : null;
    }

    public function getTitleAttribute()
    {
        return $this->name;
    }
}
