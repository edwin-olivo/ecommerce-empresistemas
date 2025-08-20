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

    public function webhook()
    {
        // Replace this endpoint secret with your unique endpoint secret key
        // If you're testing with the CLI, run 'stripe listen' to find the secret key
        // # If you defined your endpoint using the API or the Dashboard, check your webhook settings for your endpoint secret: https://dashboard.stripe.com/webhooks
        $endpoint_secret = 'whsec_...';

        $payload = @file_get_contents('php://input');
        $event = null;

        try {
            $event = \Stripe\Event::constructFrom(
                json_decode($payload, true)
            );
        } catch (\UnexpectedValueException $e) {
            // Invalid payload
            http_response_code(400);
            exit();
        }

        if ($endpoint_secret) {
            // Only verify the event if you've defined an endpoint secret
            // Otherwise, use the basic decoded event
            $sig_header = $_SERVER['HTTP_STRIPE_SIGNATURE'];
            try {
                $event = \Stripe\Webhook::constructEvent(
                    $payload,
                    $sig_header,
                    $endpoint_secret
                );
            } catch (\Stripe\Exception\SignatureVerificationException $e) {
                // Invalid signature
                echo '⚠️  Webhook error while validating signature.';
                http_response_code(400);
                exit();
            }
        }

        // Handle the event
        switch ($event->type) {
            case 'payment_intent.succeeded':
                $paymentIntent = $event->data->object; // contains a \Stripe\PaymentIntent
                // Then define and call a method to handle the successful payment intent.
                // handlePaymentIntentSucceeded($paymentIntent);
                break;
            case 'payment_method.attached':
                $paymentMethod = $event->data->object; // contains a \Stripe\PaymentMethod
                // Then define and call a method to handle the successful attachment of a PaymentMethod.
                // handlePaymentMethodAttached($paymentMethod);
                break;
            // ... handle other event types
            default:
                echo 'Received unknown event type ' . $event->type;
        }

        http_response_code(200);
    }
}
