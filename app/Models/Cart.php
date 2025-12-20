<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Cart extends Model
{
    use HasUuids;

    protected $fillable = ['user_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(CartItem::class);
    }

    public function getCartItemCount(): int
    {
        $cartCount = 0;
        if (Auth::check()) {
            $cart = Auth::user()->cart;
            if ($cart) {
                $cartCount = $cart->items()->sum('quantity');
            }
        } else {
            $sessionCart = session()->get('cart', []);
            $cartCount = array_sum(array_map(static fn($item) => $item['quantity'], $sessionCart));
        }

        return $cartCount;
    }
}
