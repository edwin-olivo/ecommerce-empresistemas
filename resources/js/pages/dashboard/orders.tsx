import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/app-layout';
import DashboardLayout from '@/layouts/common/dashboard-layout';
import { getBreadcrumbs } from '@/lib/breadcrumb-helper';
import { SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs = getBreadcrumbs('orders', [{ title: 'Ordenes', href: route('dashboard.orders') }]);

export default function Orders() {
    const page = usePage<SharedData>();
    const { auth } = page.props;

    return (
        <AppLayout breadcrumbs={[]}>
            <Head title="Ordenes" />
            <DashboardLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Ordenes" description="Aquí puedes ver y gestionar las ordenes que has realizado." />
                </div>
            </DashboardLayout>
        </AppLayout>
    );
}
