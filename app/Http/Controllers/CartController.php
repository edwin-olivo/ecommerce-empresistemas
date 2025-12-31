<?php

namespace App\Http\Controllers;

use App\Http\Requests\CartItemRequest;
use App\Models\AosProducts;
use App\Models\CartItem;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CartController extends Controller
{
    private const TAX_RATE = 0.16; // 16% IVA
    private const FREE_SHIPPING_THRESHOLD = 1000; // Umbral para envío gratis
    private const SHIPPING_FEE = 140; // Costo de envío estándar
    private const TAX_INCLUDED = true;

    /**
     * Muestra la vista del carrito.
     */
    public function index()
    {
        $cartItems = [];
        $subtotal = 0;
        $taxes = 0;
        $shipping = 0;
        $total = 0;

        if (Auth::check()) {
            $cart = Auth::user()->cart;
            if ($cart) {
                $cartItems = $cart->items()->with('product')->get();

                // Filtramos los items con "product" cargado
                $cartItems = $cartItems->filter(static function ($item) {
                    return $item->product !== null;
                });

                $subtotal = $cartItems->sum(static function ($item) {
                    return $item->product->price * $item->quantity;
                });
            }
        } else {
            $sessionCart = session()->get('cart', []);

            // Consultamos la base de datos para obtener los productos
            $productIds = array_keys($sessionCart);
            $products = AosProducts::whereIn('id', $productIds)->get()->keyBy('id');
            foreach ($sessionCart as $productId => $item) {
                if (!isset($products[$productId])) {
                    continue;
                }

                $product = $products[$productId];
                $quantity = $item['quantity'];
                $cartItems[] = (object) [
                    'id' => $product->id,
                    'cart_id' => null,
                    'product_id' => $product->id,
                    'product' => $product,
                    'quantity' => $quantity,
                    'created_at' => null,
                    'updated_at' => null,
                ];
                $subtotal += $product->price * $quantity;
            }
        }

        // Calcular IVA: el precio ya incluye IVA, así que usamos el cálculo inverso
        $taxCalculation = $this->calculateTaxes($subtotal, self::TAX_INCLUDED, self::TAX_RATE);
        $subtotalWithoutTax = $taxCalculation['subtotal'];
        $taxes = $taxCalculation['taxes'];

        $shipping = $subtotal > self::FREE_SHIPPING_THRESHOLD ? 0 : self::SHIPPING_FEE; // Envío gratis si el subtotal es mayor a FREE_SHIPPING_THRESHOLD
        $total = $subtotal + $shipping;

        return Inertia::render('cart/index', [
            'cartContent' => $cartItems,
            'subtotal' => $subtotalWithoutTax,
            'taxes' => $taxes,
            'shipping' => $shipping,
            'total' => $total,
        ]);
    }

    /**
     * Agrega un producto al carrito.
     */
    public function add(AosProducts $product)
    {
        if (Auth::check()) {
            $user = Auth::user();
            $cart = $user->cart()->firstOrCreate([]); // Obtiene o crea el carrito

            $cartItem = $cart->items()->where('product_id', $product->id)->first();

            if ($cartItem) {
                $cartItem->increment('quantity');
            } else {
                $cart->items()->create([
                    'product_id' => $product->id,
                    'quantity' => 1,
                ]);
            }
        } else {
            $cart = session()->get('cart', []);

            if (isset($cart[$product->id])) {
                $cart[$product->id]['quantity']++;
            } else {
                $cart[$product->id] = [
                    'product_id' => $product->id,
                    'quantity' => 1,
                ];
            }
            session()->put('cart', $cart);
        }

        return redirect()->back()->with('success', '¡Producto añadido al carrito!');
    }

    /**
     * Actualiza la cantidad de un producto en el carrito.
     */
    public function update(CartItemRequest $request, $itemId)
    {
        $quantity = $request->input('quantity');
        $quantity = max(1, (int) $quantity); // Asegura que la cantidad sea al menos 1

        if (Auth::check()) {
            $cartItem = CartItem::where('id', $itemId)->where('cart_id', Auth::user()->cart->id)->firstOrFail();

            $cartItem->update(['quantity' => $quantity]);
        } else {
            $cart = session()->get('cart', []);

            if (isset($cart[$itemId])) {
                $cart[$itemId]['quantity'] = $quantity;
                session()->put('cart', $cart);
            }
        }

        return redirect()->route('cart.index')->with('success', '¡Cantidad actualizada!');
    }

    /**
     * Elimina un producto del carrito.
     */
    public function remove($itemId)
    {
        if (Auth::check()) {
            $cartItem = CartItem::where('id', $itemId)->where('cart_id', Auth::user()->cart->id)->firstOrFail();

            $cartItem->delete();
        } else {
            $cart = session()->get('cart', []);

            if (isset($cart[$itemId])) {
                unset($cart[$itemId]);
                session()->put('cart', $cart);
            }
        }

        return redirect()->route('cart.index')->with('success', '¡Producto eliminado del carrito!');
    }

    /**
     * Vacía el carrito.
     */
    public static function clear()
    {
        if (Auth::check()) {
            $cart = Auth::user()->cart;
            if ($cart) {
                $cart->items()->delete();
            }
        } else {
            session()->forget('cart');
        }

        return redirect()->route('cart.index')->with('success', '¡Carrito vaciado!');
    }

    /**
     * Calcula IVA y subtotal según si el precio ya incluye IVA o no.
     *
     * @param float $monto Monto a calcular
     * @param bool $incluyeImpuesto Si true, el monto ya incluye IVA (inverso). Si false, suma el IVA.
     * @param float $tasaImpuesto Tasa de IVA (default: 0.16 = 16%)
     * @return array ['subtotal' => float, 'taxes' => float]
     */
    private function calculateTaxes(float $monto, bool $incluyeImpuesto = true, float $tasaImpuesto = 0.16): array
    {
        if ($incluyeImpuesto) {
            // Cálculo inverso: el monto ya incluye IVA
            // Fórmula: IVA = (Monto × tasa) / (1 + tasa)
            $taxes = ($monto * $tasaImpuesto) / (1 + $tasaImpuesto);
            $subtotal = $monto - $taxes;
        } else {
            // Cálculo directo: el monto NO incluye IVA, hay que sumarlo
            $taxes = $monto * $tasaImpuesto;
            $subtotal = $monto;
        }

        return [
            'subtotal' => round($subtotal, 2),
            'taxes' => round($taxes, 2),
        ];
    }
}
