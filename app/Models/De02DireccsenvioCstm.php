<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

/**
 * Class De02DireccsenvioCstm
 *
 * @property string $id_c
 * @property string|null $cargo_c
 * @property string|null $departamento_c
 * @property string|null $email_c
 * @property string|null $teloficina_c
 * @property string|null $tipo_c
 * @property string|null $pv01_proveedores_id_c
 * @property string|null $referencia_c
 * @property bool|null $direccion_predeterminada_c
 *
 * @package App\Models
 */
class De02DireccsenvioCstm extends Model
{
    use HasUuids;

    protected $table = 'de02_direccsenvio_cstm';
    protected $primaryKey = 'id_c';
    public $incrementing = false;
    public $timestamps = false;

    protected $casts = [
        'direccion_predeterminada_c' => 'bool',
    ];

    protected $fillable = [
        'cargo_c',
        'departamento_c',
        'email_c',
        'teloficina_c',
        'tipo_c',
        'pv01_proveedores_id_c',
        'referencia_c',
        'direccion_predeterminada_c',
    ];

    public function direccionEnvio()
    {
        return $this->belongsTo(De02Direccsenvio::class, 'id_c', 'id');
    }

    /**
     * Establecer esta dirección como la predeterminada para el usuario.
     * Elimina direccion_predeterminada_c de otras direcciones del mismo usuario.
     */
    public static function boot()
    {
        parent::boot();

        static::saving(static function ($model) {
            if ($model->direccion_predeterminada_c) {
                De02DireccsenvioCstm::where('id_c', '!=', $model->id_c)
                    ->whereHas('direccionEnvio', static function ($query) use ($model) {
                        $query->where('account_id_c', $model->direccionEnvio->account_id_c);
                    })
                    ->update(['direccion_predeterminada_c' => false]);
            }
        });
    }
}
