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
import { useState } from 'react';

const breadcrumbs = getBreadcrumbs('wishlist', [{ title: 'Listado de Deseos', href: route('wishlist.index') }]);

interface WishlistProps {
    wishlists: Wishlist[] | [];
}

export default function UserWishList({ wishlists }: WishlistProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [editingWishlist, setEditingWishlist] = useState<Wishlist | null>(null);

    const { delete: destroy, processing } = useForm({
        id: '',
    });

    // Función auxiliar para abrir el modal en modo "Crear"
    const openCreateModal = () => {
        setEditingWishlist(null);
        setIsOpen(true);
    };

    // Función auxiliar para abrir el modal en modo "Editar"
    const openEditModal = (wishlist: Wishlist) => {
        setEditingWishlist(wishlist);
        setIsOpen(true);
    };

    function handleDeleteWishlist(id: string) {
        destroy(route('wishlist.destroy', id), {
            preserveScroll: true,
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Listas de Deseos" />
            <DashboardLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title="Listas de Deseos"
                        description="Aquí puedes ver y gestionar los productos que has añadido a tu lista de deseos."
                    />

                    <Button variant="outline" onClick={openCreateModal}>
                        Crear Lista de Deseos
                    </Button>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {wishlists.length > 0 ? (
                            wishlists.map((item) => (
                                <div key={item.id}>
                                    <Link href={route('wishlist.show', item.id)} className="">
                                        <div className="min-h-[100px] cursor-pointer rounded-lg border p-4 transition-shadow hover:shadow-lg">
                                            <h3 className="text-lg font-medium">{item.name}</h3>
                                            <p className="text-sm text-gray-600">{trimTextWithEllipsis(item.description ?? '', 60)}</p>
                                        </div>
                                    </Link>

                                    <div className="mt-2 grid grid-cols-2 gap-2">
                                        <Button variant="outline" onClick={() => openEditModal(item)} disabled={processing}>
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

                    <WishlistForm open={isOpen} onOpenChange={setIsOpen} wishlist={editingWishlist} />
                </div>
            </DashboardLayout>
        </AppLayout>
    );
}
