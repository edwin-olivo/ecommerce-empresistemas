<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Address extends Model
{
    use HasUuids, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'name',
        'recipient',
        'phone',
        'street_address',
        'apartment',
        'city',
        'state',
        'postal_code',
        'country',
        'instructions',
        'is_default',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'is_default' => 'boolean',
        ];
    }

    /**
     * Obtener el usuario propietario de la dirección.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Establecer esta dirección como la predeterminada para el usuario.
     * Elimina is_default de otras direcciones del mismo usuario.
     */
    public static function boot()
    {
        parent::boot();

        static::saving(static function ($model) {
            if ($model->is_default) {
                // Remove is_default from other addresses of the same user
                self::where('user_id', $model->user_id)->where('id', '!=', $model->id)->update(['is_default' => false]);
            }
        });
    }
}
