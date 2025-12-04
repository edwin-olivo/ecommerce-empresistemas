<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class WishlistItem extends Model
{
    use HasUuids;

    protected $fillable = ['wishlist_id', 'product_id'];
    public function wishlist()
    {
        return $this->belongsTo(Wishlist::class);
    }

    public function product()
    {
        return $this->belongsTo(AosProducts::class);
    }
}
