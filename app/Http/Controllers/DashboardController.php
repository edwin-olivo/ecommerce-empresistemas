<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    function orders()
    {
        return inertia('dashboard/orders');
    }

    function addresses()
    {
        return inertia('dashboard/addresses');
    }

    function wishlist()
    {
        return inertia('dashboard/wishlist');
    }
}
