<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
    public function show(?string $page)
    {
        if ($page === null) {
            abort(404);
        }

        if (!in_array($page, ['contact', 'faq', 'cookies', 'privacy', 'terms', 'shipping', 'about'])) {
            abort(404);
        }

        $component = 'static/' . $page;

        return Inertia::render($component);
    }

    public function about()
    {
        return Inertia::render('static/about');
    }

    public function contact()
    {
        return Inertia::render('static/contact');
    }

    public function faq()
    {
        return Inertia::render('static/faq');
    }
    public function cookies()
    {
        return Inertia::render('static/cookies');
    }

    public function privacy()
    {
        $correo = config('settings.contact_email', 'clientes.dulcerialasuiza@gmail.com');
        return Inertia::render('static/privacy', ['correo' => $correo]);
    }

    public function terms()
    {
        return Inertia::render('static/terms');
    }

    public function shipping()
    {
        return Inertia::render('static/shipping');
    }
}
