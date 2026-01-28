<?php

namespace App\Http\Controllers;

use App\Models\JbAdministracionEcommerce;
use App\Models\ObFaq;
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
        $adminEcommerce = JbAdministracionEcommerce::first();
        return Inertia::render('static/about', ['adminEcommerce' => $adminEcommerce]);
    }

    public function contact()
    {
        $correo = config('settings.contact_email', 'clientes.dulcerialasuiza@gmail.com');
        return Inertia::render('static/contact', ['correo' => $correo]);
    }

    public function faq()
    {
        $faqs = ObFaq::where('deleted', false)
            ->orderBy('orden', 'asc')
            ->get()
            ->map(static function ($faq) {
                return [
                    'id' => $faq->id,
                    'name' => $faq->name,
                    'description' => $faq->description,
                    'order' => $faq->orden,
                ];
            });
        return Inertia::render('static/faq', ['faqs' => $faqs]);
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

    public function concepto()
    {
        return Inertia::render('static/concepto');
    }
}
