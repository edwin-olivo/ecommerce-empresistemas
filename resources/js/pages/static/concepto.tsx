import { AppShell } from '@/components/app-shell';
import Arrivals from '@/components/sections/arrivals';
import Categories from '@/components/sections/categories';
import Featured from '@/components/sections/featured';
import Footer from '@/components/sections/footer';
import Header from '@/components/sections/header';
import Hero from '@/components/sections/hero';
import InstagramFeed from '@/components/sections/instagram-feed';
import Newsletter from '@/components/sections/newsletter';
import SpecialOfferBanner from '@/components/sections/special-offer-banner';
import Testimonials from '@/components/sections/testimonials';
import { arrivals, categories, featuredProducts } from '@/data/data';
import { Head, Link } from '@inertiajs/react';

export default function Concepto() {
    return (
        <>
            <Head title="Inicio - Tienda Online" />
            <AppShell variant="header">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Pacifico&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.6.0/remixicon.min.css" />
                <div className="bg-white">
                    {/* Header */}
                    <Header />

                    {/* Hero Section */}
                    <Hero
                        title="Summer Collection 2025"
                        description="Discover our latest arrivals designed for comfort and style. Premium quality that lasts."
                        backgroundImageUrl="https://readdy.ai/api/search-image?query=modern%20e-commerce%20website%20hero%20image%20with%20stylish%20clothing%20items%20arranged%20on%20a%20clean%20minimalist%20background%2C%20soft%20gradient%20lighting%2C%20professional%20product%20photography%20style%2C%20high-end%20fashion%20items%20displayed%20elegantly%2C%20neutral%20colors%20with%20subtle%20accent%20colors%2C%20plenty%20of%20whitespace%20on%20the%20left%20side%20for%20text&width=1920&height=600&seq=hero1&orientation=landscape"
                    >
                        <Link
                            href="#"
                            className="rounded-button bg-primary px-6 py-3 font-medium whitespace-nowrap text-white transition-colors hover:bg-primary/90"
                        >
                            Compra Ahora
                        </Link>
                        <Link
                            href="#"
                            className="rounded-button border border-gray-200 bg-white px-6 py-3 font-medium whitespace-nowrap text-gray-800 transition-colors hover:bg-gray-50"
                        >
                            Explorar Productos
                        </Link>
                    </Hero>

                    {/* Categories Section */}
                    <Categories categories={categories} />

                    {/* Featured Products */}
                    <Featured featuredProducts={featuredProducts} />

                    {/* Special Offer Banner */}
                    <SpecialOfferBanner
                        title="Venta de Invierno"
                        description="Hasta un 50% de descuento en artículos seleccionados. Oferta por tiempo limitado."
                        finishDate={new Date('2026-01-31T00:00:00')}
                    />

                    {/* New Arrivals */}
                    <Arrivals arrivals={arrivals} />

                    {/* Testimonials */}
                    <Testimonials />

                    {/* Instagram Feed */}
                    <InstagramFeed />

                    {/* Newsletter */}
                    <Newsletter />

                    {/* Footer */}
                    <Footer />
                </div>
            </AppShell>
        </>
    );
}
