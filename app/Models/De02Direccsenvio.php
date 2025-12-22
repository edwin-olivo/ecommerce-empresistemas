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

    // public function account()
    // {
    // 	return $this->belongsTo(Account::class, 'account_id_c', 'id');
    // }
    // public function contact()
    // {
    // 	return $this->belongsTo(Contact::class, 'contact_id_c', 'id');
    // }
}
