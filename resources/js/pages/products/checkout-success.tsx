import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { getBreadcrumbs } from '@/lib/breadcrumb-helper';
import { Venta } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { CircleCheckBig, ShoppingBag, ShoppingCart } from 'lucide-react';

interface CheckoutSuccessProps {
    customerEmail: string;
    order: Venta;
}

export default function CheckoutSuccess({ customerEmail, order }: CheckoutSuccessProps) {
    const breadcrumbs = getBreadcrumbs('/success', [
        { title: 'Carrito de Compras', href: route('cart.index') },
        { title: 'Éxito en la Compra', href: '' },
    ]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Carrito de Compras" />
            <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                <div className="w-full max-w-md text-center">
                    <div className="space-y-4">
                        <CircleCheckBig className="mx-auto mb-6 h-16 w-16 text-green-500" />
                        <h1 className="mb-4 text-4xl font-bold text-gray-900">Compra Exitosa</h1>
                        <h2 className="mb-4 text-xl font-semibold text-gray-700">
                            <span className="font-bold text-blue-600">{customerEmail}</span>, tu pago ha sido procesado correctamente.
                        </h2>
                        <p className="mb-2 text-gray-600">
                            Número de Orden: <span className="font-bold">{order.name ?? order.id}</span>
                        </p>
                        <p className="mb-8 text-gray-600">Gracias por tu compra. Recibirás un correo de confirmación en breve.</p>
                        <div className="space-x-4">
                            <Link href={route('dashboard.orders')}>
                                <Button value={'default'} className="cursor-pointer">
                                    <ShoppingBag className="mr-2 h-4 w-4" />
                                    Ver Órdenes
                                </Button>
                            </Link>
                            <Link href={route('home')}>
                                <Button variant={'outline'} className="cursor-pointer">
                                    <ShoppingCart className="mr-2 h-4 w-4" />
                                    Seguir Comprando
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
