<?php

namespace App\Http\Controllers;

use App\Models\AosProducts;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    function index() {
        $products = AosProducts::all()->take(20);
        return $products;
    }
}
