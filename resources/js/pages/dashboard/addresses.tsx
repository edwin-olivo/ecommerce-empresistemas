import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/app-layout';
import DashboardLayout from '@/layouts/common/profile-layout';
import { getBreadcrumbs } from '@/lib/breadcrumb-helper';
import { SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs = getBreadcrumbs('addresses', [{ title: 'Direcciones', href: route('dashboard.addresses') }]);

export default function Addresses() {
    const page = usePage<SharedData>();
    const { auth } = page.props;

    return (
        <AppLayout breadcrumbs={[]}>
            <Head title="Direcciones" />
            <DashboardLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title="Direcciones"
                        description="Aquí puedes ver y gestionar las direcciones que has añadido a tu cuenta."
                    />
                </div>
            </DashboardLayout>
        </AppLayout>
    );
}
