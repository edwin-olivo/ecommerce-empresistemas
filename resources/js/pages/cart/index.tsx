import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { getBreadcrumbs } from '@/lib/breadcrumb-helper';
import { formatCurrency } from '@/lib/utils';
import { Head, Link, useForm } from '@inertiajs/react';
import { debounce } from 'lodash-es';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useRef, useState } from 'react';

interface CartItem {
    cart_id: number;
    created_at: string;
    id: string;
    product: Record<string, any>;
    product_id: number;
    quantity: number;
    updated_at: string;
}

interface CartIndexProps {
    cartContent: CartItem[];
    subtotal: number;
    taxes: number;
    shipping: number;
    total: number;
}

function formatName(name: string) {
    if (name.length <= 37) return name;
    return name.slice(0, 37) + '...';
}

// Componente principal del carrito
export default function CartIndex({ cartContent, subtotal, taxes, shipping, total }: CartIndexProps) {
    const { patch, delete: destroy, processing } = useForm();
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [localQuantities, setLocalQuantities] = useState<Record<string, number>>({});
    const debouncedUpdateRef = useRef<Record<string, ReturnType<typeof debounce>>>({});
    const hasItems = cartContent.length > 0;

    // Función para actualizar la cantidad de un ítem
    const updateQuantity = (item: CartItem, newQuantity: number) => {
        if (newQuantity > 0) {
            // Sincroniza el estado local con la nueva cantidad
            setLocalQuantities((prev) => ({
                ...prev,
                [item.id]: newQuantity,
            }));

            patch(route('cart.update', { item, quantity: newQuantity }), {
                preserveScroll: true,
            });
        }
    };

    const handleQuantityChange = (item: CartItem, value: string) => {
        const newQuantity = parseInt(value, 10) || 1;

        // Actualiza el estado local inmediatamente para que el usuario vea lo que escribe
        setLocalQuantities((prev) => ({
            ...prev,
            [item.id]: newQuantity,
        }));

        // Crea o reutiliza la función debounced para este ítem
        if (!debouncedUpdateRef.current[item.id]) {
            debouncedUpdateRef.current[item.id] = debounce((qty: number) => {
                if (qty > 0) {
                    patch(route('cart.update', { item, quantity: qty }), {
                        preserveScroll: true,
                    });
                }
            }, 500);
        }

        // Ejecuta la función debounced
        debouncedUpdateRef.current[item.id](newQuantity);
    };

    // Función para eliminar un ítem del carrito
    const removeItem = (item: CartItem) => {
        destroy(route('cart.remove', { item }), {
            preserveScroll: true,
        });
    };

    // Función para limpiar el carrito
    const clearCart = () => {
        destroy(route('cart.clear'), {
            preserveScroll: false,
        });
    };

    // Función para ir al proceso de checkout
    const proceedToCheckout = async () => {
        setIsCheckingOut(true);

        try {
            // Obtenemos el token CSRF del <meta> tag
            const csrfToken = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content;

            const response = await fetch(route('checkout'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-CSRF-TOKEN': csrfToken, // ¡Muy importante para Laravel!
                },
                credentials: 'same-origin',
            });

            if (!response.ok) {
                throw new Error('Error al contactar el servidor');
            }

            const data = await response.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                console.error('No se recibió la URL de checkout');
            }
        } catch (error) {
            console.error('Error al procesar el pago:', error);
            alert('Hubo un error al procesar el pago. Por favor, intenta nuevamente.');
        } finally {
            // Si falla la redirección
            setIsCheckingOut(false);
        }
    };

    // Convertimos el objeto a un array para poder usar .map() y .length
    const cartItems = Object.values(cartContent);

    const textoBreadcrumb = hasItems ? `Productos en el Carrito` : 'El Carrito está Vacío';

    const breadcrumbs = getBreadcrumbs('/cart', [
        hasItems ? { title: textoBreadcrumb, href: '/cart' } : { title: 'El Carrito está Vacío', href: '/cart' },
    ]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Carrito de Compras" />
            <main className="container mx-auto px-4 py-8">
                <div className="flex flex-col space-y-6 xl:flex-row xl:space-y-0 xl:space-x-6">
                    <div className="w-full xl:w-2/3">
                        <Card className="mx-auto max-w-4xl">
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold tracking-tight">Carrito de Compras</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {hasItems ? (
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-1/2">Producto</TableHead>
                                                <TableHead className="text-center">Cantidad</TableHead>
                                                <TableHead className="text-right">Precio</TableHead>
                                                <TableHead className="text-right">Subtotal</TableHead>
                                                <TableHead></TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {cartItems.map((item) => {
                                                if (!item.product) return null;

                                                const product = item.product;
                                                const formattedPrice = formatCurrency(product?.price);
                                                const subtotal = formatCurrency(product?.price * item.quantity);

                                                return (
                                                    <TableRow key={item.id}>
                                                        <TableCell className="font-medium">
                                                            <div className="flex flex-col items-start">
                                                                <div
                                                                    className="font-bold whitespace-nowrap text-neutral-900"
                                                                    title={product?.part_number}
                                                                >
                                                                    <Link
                                                                        href={route('products.show', product?.id)}
                                                                        className="hover:text-blue-600 hover:underline"
                                                                    >
                                                                        {formatName(product?.part_number)}
                                                                    </Link>
                                                                </div>
                                                                <div className="text-xs text-neutral-600">{product?.name}</div>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <ButtonGroup>
                                                                <Button
                                                                    variant="outline"
                                                                    size="icon"
                                                                    onClick={() => updateQuantity(item, item.quantity - 1)}
                                                                    disabled={processing || item.quantity <= 1}
                                                                    aria-label="Quitar producto"
                                                                    className="group cursor-pointer"
                                                                >
                                                                    <Minus className="h-4 w-4 text-neutral-700 group-hover:text-red-700" />
                                                                </Button>
                                                                <Input
                                                                    type="number"
                                                                    value={localQuantities[item.id] ?? item.quantity}
                                                                    onChange={(e) => handleQuantityChange(item, e.target.value)}
                                                                    className="remove-arrow mx-auto w-12 text-center"
                                                                    min="1"
                                                                    disabled={processing}
                                                                />
                                                                <Button
                                                                    variant="outline"
                                                                    size="icon"
                                                                    onClick={() => updateQuantity(item, item.quantity + 1)}
                                                                    disabled={processing}
                                                                    aria-label="Agregar producto"
                                                                    className="group cursor-pointer"
                                                                >
                                                                    <Plus className="h-4 w-4 text-neutral-700 group-hover:text-green-700" />
                                                                </Button>
                                                            </ButtonGroup>
                                                        </TableCell>
                                                        <TableCell className="text-right">{formattedPrice}</TableCell>
                                                        <TableCell className="text-right">{subtotal}</TableCell>
                                                        <TableCell className="text-center">
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => removeItem(item)}
                                                                disabled={processing}
                                                                aria-label="Eliminar producto"
                                                                className="cursor-pointer hover:bg-red-100 focus:ring-2 focus:ring-red-300"
                                                            >
                                                                <Trash2 className="h-4 w-4 text-red-500" />
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                ) : (
                                    <div className="py-12 text-center">
                                        <p className="text-gray-500">Tu carrito está vacío.</p>
                                        <Button asChild className="mt-4">
                                            <Link href={route('products.index')}>Ir a la tienda</Link>
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                    <div className="w-full xl:w-1/3">
                        <Card className="mx-auto max-w-4xl">
                            <CardHeader>
                                <h2 className="text-lg font-bold">Resumen del Pedido</h2>
                            </CardHeader>
                            <CardContent>
                                {hasItems ? (
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span>Subtotal:</span>
                                            <span>{formatCurrency(subtotal)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Impuestos (16%):</span>
                                            <span>{formatCurrency(taxes)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Envío:</span>
                                            <span>{shipping === 0 ? 'Gratis' : formatCurrency(shipping)}</span>
                                        </div>
                                        <div className="mt-4 flex justify-between text-lg font-bold">
                                            <span>Total:</span>
                                            <span>{formatCurrency(total)}</span>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-gray-500">No hay productos en el carrito.</p>
                                )}
                            </CardContent>
                            {hasItems && (
                                <CardFooter className="flex justify-between">
                                    <Button variant={'outline'} size="lg" className="cursor-pointer" onClick={clearCart} disabled={processing}>
                                        Limpiar Carrito
                                    </Button>
                                    <Button size="lg" className="cursor-pointer" onClick={proceedToCheckout} disabled={processing || isCheckingOut}>
                                        {isCheckingOut ? 'Procesando...' : 'Proceder al Pago'}
                                    </Button>
                                </CardFooter>
                            )}
                        </Card>
                    </div>
                </div>
            </main>
        </AppLayout>
    );
}
