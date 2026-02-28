import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import DashboardLayout from '@/layouts/common/dashboard-layout';
import { getBreadcrumbs } from '@/lib/breadcrumb-helper';
import { Wishlist } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { columns } from './wishlists/columns';
import { DataTable } from './wishlists/data-table';

interface WishlistShowProps {
    wishlist: Wishlist;
}

function WishlistEmptyState() {
    return (
        <div className="flex flex-col items-center justify-center py-20">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">Tu lista de deseos está vacía</h2>
            <p className="mb-6 text-gray-600">
                Parece que aún no has añadido ningún producto a tu lista de deseos. Explora nuestros productos y añade tus favoritos.
            </p>
            <Link href={route('products.index')}>
                <Button>Explorar Productos</Button>
            </Link>
        </div>
    );
}

export default function WishlistShow({ wishlist }: WishlistShowProps) {
    const breadcrumbs = getBreadcrumbs('wishlist', [
        { title: 'Listado de Deseos', href: route('wishlist.index') },
        { title: wishlist.name, href: route('wishlist.show', wishlist.id) },
    ]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Lista de Deseos - ${wishlist.name}`} />
            <DashboardLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title={`Lista de Deseos - ${wishlist.name}`}
                        description={wishlist.description || 'Aquí puedes ver y gestionar los productos que has añadido a tu lista de deseos.'}
                    />

                    <div>
                        {wishlist?.products && wishlist?.products.length > 0 ? (
                            <DataTable columns={columns} data={wishlist.products} />
                        ) : (
                            <WishlistEmptyState />
                        )}
                    </div>
                </div>
            </DashboardLayout>
        </AppLayout>
    );
}
