<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class CheckoutController extends Controller
{

    /**
     * Muestra la página de checkout para que el usuario pueda finalizar su compra.
     *
     * @return \Illuminate\Http\Response
     */
    public function checkout()
    {
        \Stripe\Stripe::setApiKey(env('STRIPE_SECRET_KEY'));

        $products = Auth::user()->cart->items()->with('product')->get()->map(function ($item) {
            return [
                'part_number' => $item->product->part_number,
                'price' => $item->product->price,
                'quantity' => $item->quantity,
                'custom' => $item->product->custom,
            ];
        });

        $lineItems = [];
        $totalPrice = 0;

        foreach ($products as $product) {
            $lineItems[] = [
                'price_data' => [
                    'currency' => 'mxn',
                    'product_data' => [
                        'name' => $product['part_number'],
                        'images' => [$product['custom']['url_imagen']]
                    ],
                    'unit_amount' => $product['price'] * 100,
                ],
                'quantity' => $product['quantity'],
            ];

            $totalPrice += $product['price'] * $product['quantity'];
        }

        $session = \Stripe\Checkout\Session::create([
            'line_items' => $lineItems,
            'mode' => 'payment',
            'success_url' => route('checkout.success', [], true) . "?session_id={CHECKOUT_SESSION_ID}",
            'cancel_url' => route('checkout.cancel', [], true),
        ]);

        $order = new Order();
        $order->status = 'unpaid';
        $order->total_price = $totalPrice;
        $order->session_id = $session->id;
        $order->save();

        return response()->json(['url' => $session->url]);
    }

    /**
     * Maneja la lógica para mostrar la página de éxito después de completar el proceso de checkout.
     *
     * @param \Illuminate\Http\Request $request La solicitud HTTP recibida.
     * @return \Illuminate\Http\Response
     */
    public function success(Request $request)
    {
        \Stripe\Stripe::setApiKey(env('STRIPE_SECRET_KEY'));
        $sessionId = $request->get('session_id');

        try {
            $session = \Stripe\Checkout\Session::retrieve($sessionId);
            if (!$session) {
                throw new NotFoundHttpException('Session not found');
            }

            $order = Order::where('session_id', $session->id)->first();
            if (!$order) {
                throw new NotFoundHttpException('Order not found');
            }
            if ($order->status === 'unpaid') {
                $order->status = 'paid';
                $order->save();
            }

            CartController::clear();

            return Inertia::render('products/checkout-success', [
                'customerEmail' => $session->customer_details->email, // <-- Lee el email desde customer_details
                'order' => $order,
            ]);
        } catch (\Exception $e) {
            throw new NotFoundHttpException('Checkout session not found');
        }
    }

    public function cancel() {}
}
