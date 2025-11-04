import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { getBreadcrumbs } from '@/lib/breadcrumb-helper';
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

    const breadcrumbs = getBreadcrumbs('/products', [
        {
            title: categories[category] || category || 'Categoría',
            href: `/products?filter%5Bcategories%5D%5B0%5D=${categories[category] || category}`,
        },
        {
            title: product.name,
            href: '',
        },
    ]);

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
                                    <div>
                                        <p className="mb-4">Aquí encontrarás información adicional sobre el producto.</p>
                                    </div>
                                    <Accordion type="multiple" defaultValue={['product-details']} className="w-full">
                                        <AccordionItem value="product-details">
                                            <AccordionTrigger>Más Detalles</AccordionTrigger>
                                            <AccordionContent className="flex flex-col gap-4">
                                                <ul className="space-y-2">
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
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="shipping-details">
                                            <AccordionTrigger>Detalles de Envío</AccordionTrigger>
                                            <AccordionContent className="flex flex-col gap-4">
                                                <p>
                                                    Ofrecemos envío mundial a través de socios de mensajería de confianza. La entrega estándar tarda
                                                    de 3 a 5 días hábiles, mientras que el envío exprés garantiza la entrega en 1-2 días hábiles.
                                                </p>
                                                <p>
                                                    Todos los pedidos están cuidadosamente empaquetados y completamente asegurados. Realiza un
                                                    seguimiento de tu envío en tiempo real a través de nuestro portal de seguimiento dedicado.
                                                </p>
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="return-policy">
                                            <AccordionTrigger>Política de Devoluciones</AccordionTrigger>
                                            <AccordionContent className="flex flex-col gap-4">
                                                <p>
                                                    Respaldamos nuestros productos con una completa política de devoluciones de 30 días. Si no estás
                                                    completamente satisfecho, simplemente devuelve el artículo en su estado original.
                                                </p>
                                                <p>
                                                    Nuestro proceso de devolución sin complicaciones incluye el envío de devolución gratuito y
                                                    reembolsos completos procesados dentro de las 48 horas posteriores a la recepción del artículo
                                                    devuelto.
                                                </p>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
        </AppLayout>
    );
}
