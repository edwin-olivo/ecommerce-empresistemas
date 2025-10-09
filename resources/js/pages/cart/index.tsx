import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Cart', href: '/cart' }];

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

// Componente principal del carrito
export default function CartIndex({ cartContent, total }: CartIndexProps) {
    const { patch, delete: destroy, processing } = useForm();

    // Función para actualizar la cantidad de un ítem
    const updateQuantity = (itemId: string, newQuantity: string) => {
        const quantity = parseInt(newQuantity, 10);
        if (quantity > 0) {
            patch(route('cart.update', { itemId }), {
                preserveScroll: true,
            });
        }
    };

    // Función para eliminar un ítem del carrito
    const removeItem = (itemId: string) => {
        destroy(route('cart.remove', { itemId }), {
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
                        <CardTitle className="text-2xl font-bold tracking-tight">Tu Carrito de Compras</CardTitle>
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
                                            <TableCell className="font-medium">{item.name}</TableCell>
                                            <TableCell className="text-center">
                                                <Input
                                                    type="number"
                                                    value={item.quantity}
                                                    onChange={(e) => updateQuantity(item.id, e.target.value)}
                                                    className="mx-auto w-20 text-center"
                                                    min="1"
                                                    disabled={processing}
                                                />
                                            </TableCell>
                                            <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                                            <TableCell className="text-right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                                            <TableCell className="text-center">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => removeItem(item.id)}
                                                    disabled={processing}
                                                    aria-label="Eliminar producto"
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
                                    <Link href="/">Ir a la tienda</Link>
                                </Button>
                            </div>
                        )}
                    </CardContent>
                    {cartItems.length > 0 && (
                        <CardFooter className="flex items-center justify-between bg-gray-50 p-6">
                            <span className="text-xl font-bold">Total: ${total.toFixed(2)}</span>
                            <Button size="lg">Proceder al Pago</Button>
                        </CardFooter>
                    )}
                </Card>
            </main>
        </AppLayout>
    );
}
