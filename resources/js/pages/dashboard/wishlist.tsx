import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { DeleteWishlistModal } from '@/components/whislists/delete-wishlist';
import { WishlistForm } from '@/components/whislists/wishlist-form';
import AppLayout from '@/layouts/app-layout';
import DashboardLayout from '@/layouts/common/dashboard-layout';
import { getBreadcrumbs } from '@/lib/breadcrumb-helper';
import { trimTextWithEllipsis } from '@/lib/utils';
import { Wishlist } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Fragment, useState } from 'react';

const breadcrumbs = getBreadcrumbs('wishlist', [{ title: 'Listado de Deseos', href: route('wishlist.index') }]);

interface WishlistProps {
    wishlists: Wishlist[];
}

export default function UserWishList({ wishlists }: WishlistProps) {
    const [openWishlistId, setOpenWishlistId] = useState<string | null>(null);

    const { delete: deleteWishlist, processing } = useForm({
        id: '',
    });

    function handleDeleteWishlist(id: string) {
        deleteWishlist(route('wishlist.destroy', id), {
            preserveScroll: true,
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
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

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <Fragment>
                            <WishlistForm
                                open={openWishlistId === 'create'}
                                onOpenChange={(open) => setOpenWishlistId(open ? 'create' : null)}
                                wishlist={null}
                            />
                        </Fragment>

                        {wishlists.length > 0 ? (
                            wishlists.map((item) => (
                                <div key={item.id}>
                                    <Link href={route('wishlist.show', item.id)} className="">
                                        <div className="min-h-[100px] cursor-pointer rounded-lg border p-4 transition-shadow hover:shadow-lg">
                                            <h3 className="text-lg font-medium">{item.name}</h3>
                                            <p className="text-sm text-gray-600">{trimTextWithEllipsis(item.description, 60)}</p>
                                        </div>
                                    </Link>

                                    <WishlistForm
                                        open={openWishlistId === item.id}
                                        onOpenChange={(open) => setOpenWishlistId(open ? item.id : null)}
                                        wishlist={item}
                                    />

                                    <div className="mt-2 grid grid-cols-2 gap-2">
                                        <Button variant="outline" onClick={() => setOpenWishlistId(item.id)} disabled={processing}>
                                            Editar
                                        </Button>
                                        <DeleteWishlistModal
                                            handleConfirm={() => handleDeleteWishlist(item.id)}
                                            className="w-full cursor-pointer"
                                            processing={processing}
                                            wishlist={item}
                                        />
                                    </div>
                                </div>
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
