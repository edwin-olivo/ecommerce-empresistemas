import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { getBreadcrumbs } from '@/lib/breadcrumb-helper';
import { Head, Link } from '@inertiajs/react';
import { AlertCircle, ShoppingBag, ShoppingCart } from 'lucide-react';

interface CheckoutCancelProps {
    message: string;
}

export default function CheckoutCancel({ message }: CheckoutCancelProps) {
    const breadcrumbs = getBreadcrumbs('/cancel', [
        { title: 'Carrito de Compras', href: route('cart.index') },
        { title: 'Pago Cancelado', href: '' },
    ]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pago Cancelado" />
            <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                <div className="w-full max-w-md text-center">
                    <div className="space-y-4">
                        <AlertCircle className="mx-auto mb-6 h-16 w-16 text-amber-500" />
                        <h1 className="mb-4 text-4xl font-bold text-gray-900">Pago Cancelado</h1>
                        <p className="mb-8 text-gray-600">{message}</p>
                        <div className="space-x-4">
                            <Button asChild>
                                <Link href={route('cart.index')}>
                                    <ShoppingCart className="mr-2 h-4 w-4" />
                                    Ver Carrito
                                </Link>
                            </Button>
                            <Button variant={'outline'} asChild>
                                <Link href={route('home')}>
                                    <ShoppingBag className="mr-2 h-4 w-4" />
                                    Seguir Comprando
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
