<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

/**
 * Class De02Direccsenvio
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
 * @property string|null $account_id_c
 * @property string|null $contact_id_c
 * @property string|null $calle
 * @property string|null $noextenv
 * @property string|null $nointenvio
 * @property string|null $colenvio
 * @property string|null $ciudadenvio
 * @property string|null $estadoenvio
 * @property string|null $paisenvio
 * @property string|null $cpenvio
 * @property string|null $ubicaengoogle
 * @property string|null $paqueteria
 *
 * @package App\Models
 */
class De02Direccsenvio extends Model
{
    use HasUuids;

    protected $table = 'de02_direccsenvio';
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
        'account_id_c',
        'contact_id_c',
        'calle',
        'noextenv',
        'nointenvio',
        'colenvio',
        'ciudadenvio',
        'estadoenvio',
        'paisenvio',
        'cpenvio',
        'ubicaengoogle',
        'paqueteria',
    ];

    public function custom()
    {
        return $this->hasOne(De02DireccsenvioCstm::class, 'id_c', 'id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'account_id_c', 'id');
    }

    /**
     * Establecer esta dirección como la predeterminada para el usuario.
     * Elimina direccion_predeterminada_c de otras direcciones del mismo usuario.
     * También se encarga de crear/guardar el registro custom si es necesario.
     */
    public function markAsDefault()
    {
        // Buscar o crear el registro custom asociado
        $custom = $this->custom ?? new De02DireccsenvioCstm();
        $custom->id_c = $this->id;
        $custom->save();

        // Eliminar la dirección predeterminada de otras direcciones del mismo usuario
        De02DireccsenvioCstm::whereHas('direccionEnvio', function ($query) {
            $query->where('account_id_c', $this->account_id_c);
        })->update(['direccion_predeterminada_c' => false]);

        // Establecer esta dirección como predeterminada
        $this->custom()->update(['direccion_predeterminada_c' => true]);
    }

    public function toArray()
    {
        $array = parent::toArray();

        if ($this->custom) {
            $array = array_merge($array, $this->custom->toArray());
        }

        return $array;
    }
}
