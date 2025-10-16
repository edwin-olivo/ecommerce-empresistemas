import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Minus, Plus, Trash2 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Cart', href: '/cart' }];

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
    total: number;
}

// Componente principal del carrito
export default function CartIndex({ cartContent, total }: CartIndexProps) {
    const { patch, delete: destroy, processing } = useForm();

    // Función para actualizar la cantidad de un ítem
    const updateQuantity = (item: CartItem, newQuantity: number) => {
        if (newQuantity > 0) {
            patch(route('cart.update', { item, quantity: newQuantity }), {
                preserveScroll: true,
            });
        }
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
            preserveScroll: true,
        });
    };

    // Convertimos el objeto a un array para poder usar .map() y .length
    const cartItems = Object.values(cartContent);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Carrito de Compras" />
            <main className="container mx-auto px-4 py-8">
                <Card className="mx-auto max-w-4xl">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold tracking-tight">Carrito de Compras</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {cartItems.length > 0 ? (
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
                                    {cartItems.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell className="font-medium">
                                                <div className="flex flex-col items-start">
                                                    <div className="font-bold whitespace-nowrap text-neutral-900">{item.product?.part_number}</div>
                                                    <div className="text-xs text-neutral-600">{item.product?.name}</div>
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
                                                        value={item.quantity}
                                                        onChange={(e) => updateQuantity(item, parseInt(e.target.value, 10) || 1)}
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
                                            <TableCell className="text-right">${item.product?.price.toFixed(2)}</TableCell>
                                            <TableCell className="text-right">${(item.product?.price * item.quantity).toFixed(2)}</TableCell>
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
                                    ))}
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
                    {cartItems.length > 0 && (
                        <CardFooter className="flex items-center justify-between bg-gray-50 p-6">
                            <span className="text-xl font-bold">Total: ${total.toFixed(2)}</span>
                            <div className="flex space-x-4">
                                <Button variant={'outline'} size="lg" className="cursor-pointer" onClick={clearCart}>
                                    Limpiar Carrito
                                </Button>
                                <Button size="lg" className="cursor-pointer">
                                    Proceder al Pago
                                </Button>
                            </div>
                        </CardFooter>
                    )}
                </Card>
            </main>
        </AppLayout>
    );
}
