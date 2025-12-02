import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/app-layout';
import DashboardLayout from '@/layouts/common/profile-layout';
import { getBreadcrumbs } from '@/lib/breadcrumb-helper';
import { SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs = getBreadcrumbs('wishlist', [{ title: 'Listado de deseos', href: route('dashboard.wishlist') }]);

export default function Wishlist() {
    const page = usePage<SharedData>();
    const { auth } = page.props;

    return (
        <AppLayout breadcrumbs={[]}>
            <Head title="Listado de deseos" />
            <DashboardLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title="Listado de deseos"
                        description="Aquí puedes ver y gestionar los productos que has añadido a tu lista de deseos."
                    />
                </div>
            </DashboardLayout>
        </AppLayout>
    );
}
