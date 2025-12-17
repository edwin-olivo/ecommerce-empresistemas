import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import DashboardLayout from '@/layouts/common/dashboard-layout';
import { getBreadcrumbs } from '@/lib/breadcrumb-helper';
import { trimTextWithEllipsis } from '@/lib/utils';
import { Address, SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Fragment, useState } from 'react';

const breadcrumbs = getBreadcrumbs('addresses', [{ title: 'Direcciones', href: route('address.index') }]);

interface AddressProps {
    addresses: Address[] | [];
}

export default function Addresses({ addresses }: AddressProps) {
    const page = usePage<SharedData>();
    const { auth } = page.props;
    const [openAddressForm, setOpenAddressForm] = useState<string | null>(null);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Direcciones" />
            <DashboardLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Direcciones" description="Aquí puedes ver y gestionar las direcciones que has añadido a tu cuenta." />

                    <Button variant="outline" onClick={() => setOpenAddressForm('create')}>
                        Crear nueva dirección
                    </Button>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <Fragment>
                            {/* <AddressForm
                                open={openAddressForm === 'create'}
                                onOpenChange={(open) => setOpenAddressForm(open ? 'create' : null)}
                                address={null}
                            /> */}
                        </Fragment>

                        {addresses?.length > 0 ? (
                            addresses.map((item) => (
                                <div key={item.id}>
                                    <Link href={route('address.show', item.id)} className="">
                                        <div className="min-h-[100px] cursor-pointer rounded-lg border p-4 transition-shadow hover:shadow-lg">
                                            <h3 className="text-lg font-medium">{item.name}</h3>
                                            <p className="text-sm text-gray-600">{trimTextWithEllipsis(item.description, 60)}</p>
                                        </div>
                                    </Link>

                                    {/* <WishlistForm
                                        open={openWishlistId === item.id}
                                        onOpenChange={(open) => setOpenWishlistId(open ? item.id : null)}
                                        wishlist={item}
                                    /> */}

                                    <div className="mt-2 grid grid-cols-2 gap-2">
                                        {/* <Button variant="outline" onClick={() => setOpenAddressForm(item.id)} disabled={processing}>
                                            Editar
                                        </Button> */}
                                        {/* <DeleteWishlistModal
                                            handleConfirm={() => handleDeleteWishlist(item.id)}
                                            className="w-full cursor-pointer"
                                            processing={processing}
                                            wishlist={item}
                                        /> */}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No hay direcciones disponibles.</p>
                        )}
                    </div>
                </div>
            </DashboardLayout>
        </AppLayout>
    );
}
