import { AddressForm } from '@/components/addresses/address-form';
import { DeleteAddress } from '@/components/addresses/delete-address';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import DashboardLayout from '@/layouts/common/dashboard-layout';
import { getBreadcrumbs } from '@/lib/breadcrumb-helper';
import { DireccionCompleta } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { CheckCircle, Circle } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs = getBreadcrumbs('addresses', [{ title: 'Direcciones', href: route('address.index') }]);

interface AddressProps {
    addresses: DireccionCompleta[] | [];
    paqueterias: Record<string, string>;
    entidades_federativas: Record<string, string>;
    paises: Record<string, string>;
}

export default function Addresses({ addresses, paqueterias, entidades_federativas, paises }: AddressProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [editingAddress, setEditingAddress] = useState<DireccionCompleta | null>(null);

    const { delete: destroy, patch, processing } = useForm();

    // Función auxiliar para abrir el modal en modo "Crear"
    const openCreateModal = () => {
        setEditingAddress(null);
        setIsOpen(true);
    };

    // Función auxiliar para abrir el modal en modo "Editar"
    const openEditModal = (shippingAddress: DireccionCompleta) => {
        setEditingAddress(shippingAddress);
        setIsOpen(true);
    };

    // Función para manejar la eliminación de una dirección
    const handleDeleteAddress = (id: string) => {
        destroy(route('address.destroy', id), { preserveScroll: true });
    };

    // Función para manejar el establecimiento de una dirección como predeterminada
    const handleSetDefault = (id: string) => {
        patch(route('address.set-default', id), { preserveScroll: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Direcciones" />
            <DashboardLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Direcciones" description="Gestiona tus direcciones de envío" />

                    <Button variant="outline" onClick={openCreateModal}>
                        Crear nueva dirección
                    </Button>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {addresses?.length > 0 ? (
                            addresses.map((item) => (
                                <div key={item.id}>
                                    <Link href={route('address.show', item.id)} className="">
                                        <div className="min-h-[100px] cursor-pointer rounded-lg border p-4 transition-shadow hover:shadow-lg">
                                            <h3 className="text-lg font-medium">{item.name}</h3>
                                            <p className="mt-2 text-sm text-gray-600">
                                                {item.calle} {item.noextenv} {item.nointenvio}
                                            </p>
                                            <p className="mt-1 text-sm text-gray-600">
                                                {item.ciudadenvio}, {item.estadoenvio} {item.cpenvio}
                                            </p>
                                            <p className="mt-1 text-sm text-gray-600">{item.paisenvio}</p>
                                        </div>
                                    </Link>

                                    <div className="mt-2 grid grid-cols-2 gap-2">
                                        {item.direccion_predeterminada_c ? (
                                            <Button variant="outline" disabled className="col-span-2 cursor-not-allowed">
                                                <CheckCircle className="mr-2 inline-block h-4 w-4 text-green-500" />
                                                Predeterminada
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="outline"
                                                className="col-span-2"
                                                disabled={processing}
                                                onClick={() => handleSetDefault(item.id)}
                                            >
                                                <Circle className="mr-2 inline-block h-4 w-4 text-gray-500" />
                                                Establecer como predeterminada
                                            </Button>
                                        )}

                                        <Button
                                            variant="outline"
                                            onClick={() => openEditModal(item)} // <--- Aquí abrimos el modal único
                                            disabled={processing}
                                        >
                                            Editar
                                        </Button>

                                        {!item.direccion_predeterminada_c && (
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

                    {/* Renderizamos UN SOLO formulario fuera del loop */}
                    <AddressForm
                        open={isOpen}
                        onOpenChange={setIsOpen}
                        address={editingAddress}
                        listas={{ paqueterias, entidades_federativas, paises }}
                    />
                </div>
            </DashboardLayout>
        </AppLayout>
    );
}
