import { AddressForm } from '@/components/addresses/address-form';
import { DeleteAddress } from '@/components/addresses/delete-address';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import DashboardLayout from '@/layouts/common/dashboard-layout';
import { getBreadcrumbs } from '@/lib/breadcrumb-helper';
import { Address } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { CheckCircle, Circle } from 'lucide-react';
import { Fragment, useState } from 'react';

const breadcrumbs = getBreadcrumbs('addresses', [{ title: 'Direcciones', href: route('address.index') }]);

interface AddressProps {
    addresses: Address[] | [];
}

export default function Addresses({ addresses }: AddressProps) {
    const [openAddressForm, setOpenAddressForm] = useState<string | null>(null);

    const { delete: deleteAddress, processing } = useForm({
        id: '',
    });

    function handleDeleteAddress(id: string) {
        deleteAddress(route('address.destroy', id), {
            preserveScroll: true,
        });
    }

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
                            <AddressForm
                                open={openAddressForm === 'create'}
                                onOpenChange={(open) => setOpenAddressForm(open ? 'create' : null)}
                                address={null}
                            />
                        </Fragment>

                        {addresses?.length > 0 ? (
                            addresses.map((item) => (
                                <div key={item.id}>
                                    <Link href={route('address.show', item.id)} className="">
                                        <div className="min-h-[100px] cursor-pointer rounded-lg border p-4 transition-shadow hover:shadow-lg">
                                            <h3 className="text-lg font-medium">{item.recipient}</h3>
                                            <p className="mt-2 text-sm text-gray-600">{item.street_address}</p>
                                            <p className="mt-1 text-sm text-gray-600">
                                                {item.city}, {item.state} {item.postal_code}
                                            </p>
                                            <p className="mt-1 text-sm text-gray-600">{item.country}</p>
                                        </div>
                                    </Link>

                                    <AddressForm
                                        open={openAddressForm === item.id}
                                        onOpenChange={(open) => setOpenAddressForm(open ? item.id : null)}
                                        address={item}
                                    />

                                    <div className="mt-2 grid grid-cols-2 gap-2">
                                        {item.is_default ? (
                                            <Button variant="outline" disabled className="col-span-2 cursor-not-allowed">
                                                <CheckCircle className="mr-2 inline-block h-4 w-4 text-green-500" />
                                                Predeterminada
                                            </Button>
                                        ) : (
                                            <Button variant="outline" asChild className="col-span-2" disabled={processing}>
                                                <Link href={route('address.set-default', item.id)}>
                                                    <Circle className="mr-2 inline-block h-4 w-4 text-gray-500" />
                                                    Establecer como predeterminada
                                                </Link>
                                            </Button>
                                        )}
                                        <Button variant="outline" onClick={() => setOpenAddressForm(item.id)} disabled={processing}>
                                            Editar
                                        </Button>
                                        {!item.is_default && (
                                            <DeleteAddress
                                                handleConfirm={() => handleDeleteAddress(item.id)}
                                                className="w-full cursor-pointer"
                                                processing={processing}
                                                address={item}
                                            />
                                        )}
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
