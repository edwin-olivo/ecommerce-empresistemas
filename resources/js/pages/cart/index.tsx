import { useForm } from '@inertiajs/react';

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

interface CartIndexProps {
    cartContent: CartItem[];
    total: number;
}

export default function CartIndex({ cartContent, total }: CartIndexProps) {
    const { patch, delete: destroy, processing } = useForm();

    function updateQuantity(itemId: string, newQuantity: number) {
        if (newQuantity > 0) {
            patch(route('cart.update', { itemId: itemId, quantity: newQuantity }), { preserveScroll: true });
        }
    }

    function removeItem(itemId: string) {
        destroy(route('cart.remove', { itemId: itemId }), { preserveScroll: true });
    }

    return (
        <div>
            <h1>Tu Carrito de Compras</h1>

            {Object.values(cartContent).length > 0 ? (
                <>
                    {Object.values(cartContent).map((item) => (
                        <div key={item.id} className="cart-item">
                            <span>{item.name}</span>
                            <span>${item.price}</span>
                            <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
                                min="1"
                            />
                            <button onClick={() => removeItem(item.id)}>Eliminar</button>
                        </div>
                    ))}
                    <div className="total">
                        <strong>Total: ${total}</strong>
                    </div>
                </>
            ) : (
                <p>Tu carrito está vacío.</p>
            )}
        </div>
    );
}
