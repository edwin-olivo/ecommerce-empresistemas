import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/app-layout';
import DashboardLayout from '@/layouts/common/dashboard-layout';
import { getBreadcrumbs } from '@/lib/breadcrumb-helper';
import { columns } from '@/pages/dashboard/orders/columns';
import { DataTable } from '@/pages/dashboard/orders/data-table';
import { Venta } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs = getBreadcrumbs('orders', [{ title: 'Ordenes', href: route('dashboard.orders') }]);

interface OrdersProps {
    orders: Venta[];
    listas: {
        estatus_envio_list: Record<string, string>;
        invoice_status_dom: Record<string, string>;
    };
}

function OrdersEmptyState() {
    return (
        <div className="flex flex-col items-center justify-center py-20">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">No tienes compras registradas</h2>
            <p className="mb-6 text-gray-600">
                Parece que aún no has realizado ninguna compra. Explora nuestros productos y realiza tu primera orden.
            </p>
        </div>
    );
}

export default function Orders({ orders, listas }: OrdersProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Ordenes" />
            <DashboardLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Ordenes" description="Aquí puedes ver y gestionar las ordenes que has realizado." />

                    <div className="grid grid-cols-1">
                        {orders.length > 0 ? <DataTable columns={columns} data={orders} listas={listas} /> : <OrdersEmptyState />}
                    </div>
                </div>
            </DashboardLayout>
        </AppLayout>
    );
}
