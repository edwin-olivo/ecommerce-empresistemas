import { AppFooter } from '@/components/app-footer';
import { AppHeader } from '@/components/app-header';
import { AppShell } from '@/components/app-shell';
import ProductCard from '@/components/products/product-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Product, type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight, Award, Package, Truck, Zap } from 'lucide-react';

interface HomeProps {
    featured_products: Product[];
    categories: string[];
}

export default function Home({ featured_products = [], categories = [] }: HomeProps) {
    const page = usePage<SharedData>();
    const { auth } = page.props;

    return (
        <>
            <Head title="Inicio - Tienda Online" />
            <AppShell variant="header">
                <AppHeader />

                <main className="flex-1">
                    {/* Hero Section */}
                    <section className="relative overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-800 to-black py-20 text-white md:py-32">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="absolute -top-1/2 -right-1/2 h-96 w-96 rounded-full bg-gradient-to-b from-blue-500/20 to-transparent blur-3xl" />
                            <div className="absolute -bottom-1/2 -left-1/2 h-96 w-96 rounded-full bg-gradient-to-t from-purple-500/20 to-transparent blur-3xl" />
                        </div>

                        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
                                <div className="space-y-6">
                                    <Badge className="w-fit bg-blue-500/20 text-blue-300 hover:bg-blue-500/30">✨ Bienvenido a nuestra tienda</Badge>

                                    <h1 className="text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
                                        Descubre productos de{' '}
                                        <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">calidad</span>
                                    </h1>

                                    <p className="text-lg text-neutral-300 md:text-xl">
                                        Explora nuestra amplia colección de productos seleccionados. Envíos rápidos, precios competitivos y garantía
                                        de satisfacción.
                                    </p>

                                    <div className="flex flex-wrap gap-3">
                                        <Link href={route('products.index')}>
                                            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                                                Explorar Productos
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </Link>
                                        {!auth.user && (
                                            <Link href={route('register')}>
                                                <Button size="lg" variant="outline" className="border-neutral-600 hover:bg-neutral-800">
                                                    Registrarse
                                                </Button>
                                            </Link>
                                        )}
                                    </div>

                                    {/* Stats */}
                                    <div className="grid grid-cols-3 gap-4 pt-6">
                                        <div>
                                            <p className="text-2xl font-bold text-blue-400">500+</p>
                                            <p className="text-sm text-neutral-400">Productos</p>
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-purple-400">10K+</p>
                                            <p className="text-sm text-neutral-400">Clientes</p>
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-pink-400">24h</p>
                                            <p className="text-sm text-neutral-400">Envío</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Hero Image Placeholder */}
                                <div className="relative hidden md:block">
                                    <div className="aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-neutral-700 to-neutral-900 p-8">
                                        <div className="flex h-full w-full items-center justify-center">
                                            <Package className="h-32 w-32 text-neutral-600" />
                                        </div>
                                    </div>
                                    <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 opacity-50 blur-2xl" />
                                </div>
                            </div>
                        </div>
                    </section>

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
                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                    {featured_products.map((product) => (
                                        <ProductCard key={product.id} product={product} />
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
                                        <Button size="lg" variant="outline" className="w-full border-white text-white hover:bg-white/10 sm:w-auto">
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
