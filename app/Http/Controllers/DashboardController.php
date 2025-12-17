<?php

namespace App\Http\Controllers;

class DashboardController extends Controller
{
    function orders()
    {
        return inertia('dashboard/orders');
    }
}
