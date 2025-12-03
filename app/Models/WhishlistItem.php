<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WhishlistItem extends Model
{
    protected $fillable = ['whishlist_id', 'product_id'];

    public function whishlist()
    {
        return $this->belongsTo(Whishlist::class);
    }

    public function product()
    {
        return $this->belongsTo(AosProducts::class);
    }
}
