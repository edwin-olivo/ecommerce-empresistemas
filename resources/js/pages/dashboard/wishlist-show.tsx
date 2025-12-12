import HeadingSmall from '@/components/heading-small';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import DashboardLayout from '@/layouts/common/dashboard-layout';
import { getBreadcrumbs } from '@/lib/breadcrumb-helper';
import { SharedData, Wishlist } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs = getBreadcrumbs('wishlist', [{ title: 'Listas de Deseos', href: route('wishlist') }]);

interface WishlistShowProps {
    wishlist: Wishlist;
}

export default function WishlistShow({ wishlist }: WishlistShowProps) {
    const page = usePage<SharedData>();
    const { auth } = page.props;

    return (
        <AppLayout breadcrumbs={[]}>
            <Head title={`Listado de deseos - ${wishlist.name}`} />
            <DashboardLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title={`Listado de deseos - ${wishlist.name}`}
                        description={wishlist.description || 'Aquí puedes ver y gestionar los productos que has añadido a tu lista de deseos.'}
                    />

                    <div>
                        <Table>
                            <TableCaption>Productos en la lista de deseos</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Producto</TableHead>
                                    <TableHead>Precio</TableHead>
                                    <TableHead>Disponibilidad</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {(wishlist?.products?.length ?? 0) > 0 ? (
                                    (wishlist?.products ?? []).map(({ product }: any) => (
                                        <TableRow key={product.id}>
                                            <TableCell>{product.part_number}</TableCell>
                                            <TableCell>{product.price}</TableCell>
                                            <TableCell>{product.availability ? 'Disponible' : 'No disponible'}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={3} className="text-center">
                                            No hay productos en esta lista de deseos.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell colSpan={3}>Total de productos: {wishlist.products?.length ?? 0}</TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </div>
                </div>
            </DashboardLayout>
        </AppLayout>
    );
}
