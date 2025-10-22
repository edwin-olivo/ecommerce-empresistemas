import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { resolveImageSource } from '@/lib/utils';
import ProductCarousel from '@/pages/products/product-carousel';
import { Product } from '@/types';
import { Head, useForm } from '@inertiajs/react';

interface ProductPageProps {
    product: Product;
    categories: Record<string, string>;
    classes: Record<string, string>;
    types: Record<string, string>;
}

const breadcrumbs = [{ title: 'Productos', href: '/products' }];

export default function ProductPage({ product, categories, classes, types }: ProductPageProps) {
    const { post, processing } = useForm({
        id: product.id,
        quantity: 1,
    });

    const { part_number, description, price, category, type } = product;
    const clase_c = product.custom?.clase_c ?? '';

    const imageSrc = resolveImageSource(product.custom?.url_imagen);

    const images = [
        { src: imageSrc, alt: part_number || 'Product Image' },
        { src: imageSrc, alt: part_number || 'Product Image' },
    ];

    function addToCart(event: React.FormEvent) {
        event.preventDefault();
        post(route('cart.add', { product: product.id }), {
            preserveState: true,
            preserveScroll: true,
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Productos" />
            <main className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl px-4 py-8">
                <div className="container mx-auto">
                    <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
                        <div className="flex justify-center">
                            <ProductCarousel images={images} />
                        </div>
                        <div className="flex flex-col gap-6">
                            <div>
                                <h1 className="text-2xl font-bold lg:text-3xl">{part_number}</h1>
                                <p className="mt-2 text-xl font-semibold">${price}</p>
                            </div>
                            <Separator />
                            <div>
                                <p className="text-muted-foreground">{description}</p>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-0">
                                    {/* <label htmlFor="size" className="text-lg font-medium">Talla:</label>
                                    <Select>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Selecciona una talla" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {sizes.map((size) => (
                                                <SelectItem key={size} value={size.toLowerCase()}>
                                                    {size}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select> */}
                                </div>
                                <Button size="lg" onClick={addToCart} disabled={processing} aria-label={`Agregar ${product.name} al carrito`}>
                                    Agregar al Carrito
                                </Button>
                            </div>
                            <Separator />
                            <Card>
                                <CardHeader>
                                    <CardTitle>Detalles del Producto</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2 text-sm text-muted-foreground">
                                        <li className="flex justify-between">
                                            <span className="font-semibold">Categoría:</span>
                                            <span className="capitalize">{(categories[category] || category).toLocaleLowerCase()}</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span className="font-semibold">Sub Categoría:</span>
                                            <span className="capitalize">{(classes[clase_c] || clase_c).toLocaleLowerCase()}</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span className="font-semibold">Tipo:</span>
                                            <span className="capitalize">{(types[type] || type).toLocaleLowerCase()}</span>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
        </AppLayout>
    );
}
