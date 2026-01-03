import { AppFooter } from '@/components/app-footer';
import { AppHeader } from '@/components/app-header';
import { AppShell } from '@/components/app-shell';
import HeroCarousel from '@/components/home/hero-carousel';
import ProductCard from '@/components/products/product-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ImageSlider, Product, type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight, Award, Package, Truck, Zap } from 'lucide-react';

interface HomeProps {
    featured_products: Product[];
    categories: string[];
    slides: ImageSlider[];
}

export default function Home({ featured_products = [], categories = [], slides = [] }: HomeProps) {
    const page = usePage<SharedData>();
    const { auth } = page.props;

    return (
        <>
            <Head title="Inicio - Tienda Online" />
            <AppShell variant="header">
                <AppHeader />

                <main className="flex-1">
                    {/* Hero Section */}
                    <HeroCarousel
                        slides={slides}
                        className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-black px-4 py-12 sm:px-6 lg:px-8"
                    />

                    {/* Features Section */}
                    <section className="border-b border-neutral-200 bg-white py-16 md:py-24 dark:border-neutral-800 dark:bg-neutral-950">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="mb-12 text-center">
                                <h2 className="text-3xl font-bold md:text-4xl">¿Por qué elegirnos?</h2>
                                <p className="mt-4 text-neutral-600 dark:text-neutral-400">Ofrecemos la mejor experiencia de compra online</p>
                            </div>

                            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                                {[
                                    {
                                        icon: Truck,
                                        title: 'Envío Rápido',
                                        description: 'Entrega en 24 horas a nivel nacional',
                                    },
                                    {
                                        icon: Zap,
                                        title: 'Rápido y Seguro',
                                        description: 'Pago seguro con múltiples opciones',
                                    },
                                    {
                                        icon: Award,
                                        title: 'Garantía',
                                        description: 'Garantía de satisfacción en todos los productos',
                                    },
                                    {
                                        icon: Package,
                                        title: 'Variedad',
                                        description: 'Miles de productos en todas las categorías',
                                    },
                                ].map((feature, index) => {
                                    const IconComponent = feature.icon;
                                    return (
                                        <div
                                            key={index}
                                            className="group rounded-lg border border-neutral-200 bg-neutral-50 p-6 text-center transition-all hover:border-blue-500 hover:bg-blue-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                                        >
                                            <div className="mb-4 inline-block rounded-lg bg-blue-100 p-3 group-hover:bg-blue-200 dark:bg-blue-900/30 dark:group-hover:bg-blue-900/50">
                                                <IconComponent className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                            </div>
                                            <h3 className="mb-2 font-semibold">{feature.title}</h3>
                                            <p className="text-sm text-neutral-600 dark:text-neutral-400">{feature.description}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>

                    {/* Featured Products Section */}
                    <section className="bg-neutral-50 py-16 md:py-24 dark:bg-neutral-900">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="mb-12 flex items-center justify-between">
                                <div>
                                    <h2 className="text-3xl font-bold md:text-4xl">Productos Destacados</h2>
                                    <p className="mt-2 text-neutral-600 dark:text-neutral-400">Los mejores productos seleccionados para ti</p>
                                </div>
                                <Link href={route('products.index')}>
                                    <Button variant="outline" className="hidden md:flex">
                                        Ver todos
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>

                            {featured_products.length > 0 ? (
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                    {featured_products.map((product) => (
                                        <ProductCard key={product.id} product={product} className="bg-neutral-200 dark:bg-neutral-800" />
                                    ))}
                                </div>
                            ) : (
                                <div className="rounded-lg border-2 border-dashed border-neutral-300 bg-neutral-100 py-12 text-center dark:border-neutral-700 dark:bg-neutral-800">
                                    <Package className="mx-auto h-12 w-12 text-neutral-400" />
                                    <p className="mt-4 text-neutral-600 dark:text-neutral-400">No hay productos destacados disponibles</p>
                                    <p className="text-sm text-neutral-500 dark:text-neutral-500">Vuelve pronto para ver nuestras novedades</p>
                                </div>
                            )}

                            <div className="mt-8 flex justify-center md:hidden">
                                <Link href={route('products.index')}>
                                    <Button className="w-full sm:w-auto">
                                        Ver todos los productos
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </section>

                    {/* Categories Section */}
                    {categories.length > 0 && (
                        <section className="border-b border-neutral-200 py-16 md:py-24 dark:border-neutral-800 dark:bg-neutral-950">
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <h2 className="mb-8 text-3xl font-bold md:text-4xl">Categorías</h2>
                                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                    {categories.map((category) => (
                                        <Link key={category} href={`${route('products.index')}?category=${category}`}>
                                            <Card className="group cursor-pointer overflow-hidden transition-all hover:shadow-lg dark:hover:shadow-neutral-900/50">
                                                <CardContent className="flex items-center justify-between p-6">
                                                    <span className="font-semibold capitalize group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                                        {category}
                                                    </span>
                                                    <ArrowRight className="h-5 w-5 opacity-0 transition-all group-hover:opacity-100" />
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* CTA Section */}
                    <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 text-white md:py-24">
                        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                            <h2 className="text-3xl font-bold md:text-4xl">¿Listo para comprar?</h2>
                            <p className="mt-4 text-lg text-blue-100">Descubre miles de productos con los mejores precios</p>
                            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                                <Link href={route('products.index')}>
                                    <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                                        Explorar Catálogo
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                                {!auth.user && (
                                    <Link href={route('register')}>
                                        <Button
                                            size="lg"
                                            variant="outline"
                                            className="w-full border-neutral-600 text-black hover:bg-neutral-800 hover:text-white dark:border-neutral-400 dark:text-white dark:hover:bg-neutral-700"
                                        >
                                            Crear Cuenta
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Footer */}
                    <AppFooter />
                </main>
            </AppShell>
        </>
    );
}
