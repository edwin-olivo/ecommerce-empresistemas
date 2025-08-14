<?php

class PaymentController extends Controller
{
    public function confirm()
    {
        $cartData = $_POST['cartData'] ?? null;

        if (!$cartData) {
            $this->json(['error' => 'Datos del carrito no válidos'], 400);
            return;
        }

        $cartDataDecoded = json_decode($cartData, true);

        $lineItems = [];

        foreach ($cartDataDecoded as $item) {
            $lineItems[] = [
                "quantity" => $item['quantity'],
                "price_data" => [
                    "currency" => "mxn",
                    "unit_amount" => $item['price'] * 100,
                    "product_data" => [
                        "name" => $item['name']
                    ]
                ]
            ];
        }

        \Stripe\Stripe::setApiKey(STRIPE_SECRET_KEY);

        $checkout_session = \Stripe\Checkout\Session::create([
            "mode" => "payment",
            "success_url" => Router::url('/pago/exito') . "?session_id={CHECKOUT_SESSION_ID}",
            "cancel_url" => Router::url('/pago/cancelar'),
            "locale" => "auto",
            "line_items" => $lineItems,
        ]);

        header("HTTP/1.1 303 See Other");
        header("Location: " . $checkout_session->url);
    }

    public function success()
    {
        // Lógica para manejar el éxito del pago
        \Stripe\Stripe::setApiKey(STRIPE_SECRET_KEY);

        $sessionId = $_GET['session_id'] ?? null;

        if (!$sessionId) {
            $this->view('404');
            return;
        }

        $session = \Stripe\Checkout\Session::retrieve($sessionId);

        if (!$session) {
            $this->view('404');
            return;
        }

        $customer = $session->customer_details;

        $this->view('payment/success', ['customer' => $customer]);
    }

    public function cancel()
    {
        // Lógica para manejar la cancelación del pago
        $this->view('payment/cancel');
    }
}
