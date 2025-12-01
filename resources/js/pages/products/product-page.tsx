import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import MainLayout from '@/layouts/common/main-layout';
import { getBreadcrumbs } from '@/lib/breadcrumb-helper';
import { formatCurrency, resolveImageSource } from '@/lib/utils';
import ProductCarousel from '@/pages/products/product-carousel';
import { Product } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { RotateCcw, Shield, ShoppingCart, Truck } from 'lucide-react';
import { useState } from 'react';

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

    const [quantity, setQuantity] = useState(1);
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
            href: `/products?filter[categories][0]=${category}`,
        },
        {
            title: product.name,
            href: '',
        },
    ]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={part_number || 'Producto'} />

            <MainLayout>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
                        {/* Columna Izquierda: Carrusel de imágenes */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-4 space-y-4">
                                <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
                                    <ProductCarousel images={images} />
                                </div>
                            </div>
                        </div>

                        {/* Columna Central y Derecha: Información del producto */}
                        <div className="space-y-6 lg:col-span-2">
                            {/* Card Principal de Compra */}
                            <Card className="shadow-none">
                                <CardHeader className="pb-4">
                                    <div className="space-y-4">
                                        <div className="block">
                                            <h1 className="text-2xl font-bold tracking-tight text-slate-900 lg:text-3xl dark:text-white">
                                                {part_number}
                                            </h1>
                                        </div>
                                        {/* Precio */}
                                        <div className="space-y-2">
                                            <p className="text-sm font-semibold tracking-wide text-slate-600 uppercase dark:text-slate-400">Precio</p>
                                            <p className="text-4xl font-bold text-slate-900 dark:text-white">{formatCurrency(price)}</p>
                                        </div>
                                        <Separator />
                                    </div>
                                </CardHeader>

                                <CardContent className="space-y-6">
                                    {/* Control de cantidad y botón de compra */}
                                    <div className="space-y-4">
                                        <Button
                                            size="lg"
                                            onClick={addToCart}
                                            disabled={processing}
                                            className="w-full cursor-pointer rounded-[40px] border-0 bg-neutral-900 font-medium text-white transition-all duration-300 group-hover:mt-0 hover:bg-lime-400 hover:text-neutral-900"
                                            aria-label={`Agregar ${quantity} ${product.name} al carrito`}
                                        >
                                            <ShoppingCart className="mr-2 h-5 w-5" />
                                            Agregar al Carrito
                                        </Button>
                                    </div>

                                    {/* Beneficios rápidos */}
                                    <Separator />
                                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                                        <div className="flex flex-col items-center gap-2 text-center">
                                            <Truck className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Envío Rápido</span>
                                        </div>
                                        <div className="flex flex-col items-center gap-2 text-center">
                                            <RotateCcw className="h-6 w-6 text-green-600 dark:text-green-400" />
                                            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Devoluciones</span>
                                        </div>
                                        <div className="flex flex-col items-center gap-2 text-center">
                                            <Shield className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                                            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Garantía</span>
                                        </div>
                                        <div className="flex flex-col items-center gap-2 text-center">
                                            <ShoppingCart className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Seguro</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Descripción del producto */}
                            {description && description.trim() !== '' && (
                                <Card className="shadow-none">
                                    <CardHeader>
                                        <CardTitle className="text-xl">Descripción del Producto</CardTitle>
                                    </CardHeader>
                                    <CardContent className="prose dark:prose-invert max-w-none">
                                        <div className="space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                                            {description.split('\n').map((line: string, index: number) => (
                                                <p key={index}>{line}</p>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Detalles y más información con Accordion */}
                            <Card className="shadow-none">
                                <CardHeader>
                                    <CardTitle className="text-xl">Información Adicional</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Accordion type="single" collapsible className="w-full" defaultValue="product-details">
                                        {/* Detalles del Producto */}
                                        <AccordionItem value="product-details" className="border-b border-slate-200 dark:border-slate-800">
                                            <AccordionTrigger className="py-4 hover:text-blue-600 dark:hover:text-blue-400">
                                                <span className="font-semibold">Detalles del Producto</span>
                                            </AccordionTrigger>
                                            <AccordionContent className="pb-4">
                                                <div className="space-y-3">
                                                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                                                        <div>
                                                            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Categoría</p>
                                                            <p className="text-sm text-slate-600 capitalize dark:text-slate-400">
                                                                {(categories[category] || category).toLowerCase()}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Subcategoría</p>
                                                            <p className="text-sm text-slate-600 capitalize dark:text-slate-400">
                                                                {(classes[clase_c] || clase_c).toLowerCase()}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Tipo</p>
                                                            <p className="text-sm text-slate-600 capitalize dark:text-slate-400">
                                                                {(types[type] || type).toLowerCase()}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>

                                        {/* Envío y Entrega */}
                                        <AccordionItem value="shipping-details" className="border-b border-slate-200 dark:border-slate-800">
                                            <AccordionTrigger className="py-4 hover:text-blue-600 dark:hover:text-blue-400">
                                                <span className="font-semibold">Envío y Entrega</span>
                                            </AccordionTrigger>
                                            <AccordionContent className="pb-4">
                                                <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
                                                    <p>
                                                        <strong>Envío Estándar:</strong> De 3 a 5 días hábiles. Incluye seguimiento en tiempo real.
                                                    </p>
                                                    <p>
                                                        <strong>Envío Exprés:</strong> De 1 a 2 días hábiles. Costo adicional aplicable.
                                                    </p>
                                                    <p className="text-slate-600 dark:text-slate-400">
                                                        Todos los pedidos están cuidadosamente empaquetados y completamente asegurados. Realiza un
                                                        seguimiento de tu envío en tiempo real a través de nuestro portal de seguimiento.
                                                    </p>
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>

                                        {/* Política de Devoluciones */}
                                        <AccordionItem value="return-policy">
                                            <AccordionTrigger className="py-4 hover:text-blue-600 dark:hover:text-blue-400">
                                                <span className="font-semibold">Política de Devoluciones</span>
                                            </AccordionTrigger>
                                            <AccordionContent className="pb-4">
                                                <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
                                                    <p>
                                                        Respaldamos nuestros productos con una completa política de devoluciones de{' '}
                                                        <strong>30 días</strong>. Si no estás completamente satisfecho, simplemente devuelve el
                                                        artículo en su estado original.
                                                    </p>
                                                    <p>
                                                        <strong>Proceso sin complicaciones:</strong> Envío de devolución gratuito y reembolsos
                                                        completos procesados dentro de las 48 horas posteriores a la recepción del artículo devuelto.
                                                    </p>
                                                    <p className="text-slate-600 dark:text-slate-400">
                                                        Contáctanos si tienes cualquier pregunta sobre nuestras políticas.
                                                    </p>
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </MainLayout>
        </AppLayout>
    );
}
