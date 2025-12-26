<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ObFaq
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
 * @property int|null $orden
 *
 * @package App\Models
 */
class ObFaq extends Model
{
    use HasUuids;

    protected $table = 'ob_faq';
    public $incrementing = false;
    public $timestamps = false;

    protected $casts = [
        'id' => 'string',
        'date_entered' => 'datetime',
        'date_modified' => 'datetime',
        'deleted' => 'bool',
        'orden' => 'int',
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
        'orden',
    ];
}
