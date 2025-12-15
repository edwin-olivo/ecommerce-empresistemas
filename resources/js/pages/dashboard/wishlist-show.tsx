import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import DashboardLayout from '@/layouts/common/dashboard-layout';
import { getBreadcrumbs } from '@/lib/breadcrumb-helper';
import { formatCurrency } from '@/lib/utils';
import { SharedData, Wishlist } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

const breadcrumbs = getBreadcrumbs('wishlist', [{ title: 'Listas de Deseos', href: route('wishlist') }]);

interface WishlistShowProps {
    wishlist: Wishlist;
}

export default function WishlistShow({ wishlist }: WishlistShowProps) {
    const page = usePage<SharedData>();
    const { auth } = page.props;

    const { delete: destroy, processing } = useForm({});

    function handleRemoveProduct(event: React.FormEvent, productId: string) {
        event.preventDefault();
        destroy(route('wishlist.remove-product', { product: productId, wishlist: wishlist.id }), {
            preserveState: true,
            preserveScroll: true,
        });
    }

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
                                    <TableHead className="font-bold text-gray-900">Producto</TableHead>
                                    <TableHead className="font-bold text-gray-900">Precio</TableHead>
                                    <TableHead className="font-bold text-gray-900">Disponibilidad</TableHead>
                                    <TableHead className="font-bold text-gray-900">Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {(wishlist?.products?.length ?? 0) > 0 ? (
                                    (wishlist?.products ?? []).map(({ product }: any) => (
                                        <TableRow key={product.id}>
                                            <TableCell>
                                                <Link href={route('products.show', product.id)} className="text-blue-600 hover:underline">
                                                    {product.part_number}
                                                </Link>
                                            </TableCell>
                                            <TableCell className="text-right">{product.price && formatCurrency(product.price)}</TableCell>
                                            <TableCell>{product.availability ? 'Disponible' : 'No disponible'}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    className="cursor-pointer"
                                                    disabled={processing}
                                                    onClick={(e) => handleRemoveProduct(e, product.id)}
                                                >
                                                    Eliminar
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center">
                                            No hay productos en esta lista de deseos.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell colSpan={4}>Total de productos: {wishlist.products?.length ?? 0}</TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </div>
                </div>
            </DashboardLayout>
        </AppLayout>
    );
}
