import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { WishlistForm } from '@/components/whislists/wishlist-form';
import AppLayout from '@/layouts/app-layout';
import DashboardLayout from '@/layouts/common/dashboard-layout';
import { getBreadcrumbs } from '@/lib/breadcrumb-helper';
import { Head } from '@inertiajs/react';
import { Fragment, useState } from 'react';

const breadcrumbs = getBreadcrumbs('wishlist', [{ title: 'Listado de deseos', href: route('wishlist') }]);

interface WishlistProps {
    wishlists: any[];
}

export default function Wishlist({ wishlists }: WishlistProps) {
    const [openWishlistId, setOpenWishlistId] = useState<string | null>(null);

    return (
        <AppLayout breadcrumbs={[]}>
            <Head title="Listado de deseos" />
            <DashboardLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title="Listado de deseos"
                        description="Aquí puedes ver y gestionar los productos que has añadido a tu lista de deseos."
                    />

                    <Button variant="outline" onClick={() => setOpenWishlistId('create')}>
                        Crear Lista de Deseos
                    </Button>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <Fragment>
                            <WishlistForm
                                open={openWishlistId === 'create'}
                                onOpenChange={(open) => setOpenWishlistId(open ? 'create' : null)}
                                wishlist={null}
                            />
                        </Fragment>

                        {wishlists.length > 0 ? (
                            wishlists.map((item) => (
                                <Fragment key={item.id}>
                                    <div
                                        className="cursor-pointer rounded-lg border p-4 transition-shadow hover:shadow-lg"
                                        onClick={() => setOpenWishlistId(item.id)}
                                    >
                                        <h3 className="text-lg font-medium">{item.name}</h3>
                                        <p className="text-sm text-gray-600">{item.description}</p>
                                    </div>

                                    <WishlistForm
                                        open={openWishlistId === item.id}
                                        onOpenChange={(open) => setOpenWishlistId(open ? item.id : null)}
                                        wishlist={item}
                                    />
                                </Fragment>
                            ))
                        ) : (
                            <p>No hay listas de deseos disponibles.</p>
                        )}
                    </div>
                </div>
            </DashboardLayout>
        </AppLayout>
    );
}
