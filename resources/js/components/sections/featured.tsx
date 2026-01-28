import ProductCard from '@/components/products/product-card-modern';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export type FeaturedProduct = {
    imageUrl: string;
    imageAlt?: string;
    isNew?: boolean;
    isBestSeller?: boolean;
    isOnSale?: boolean;
    title: string;
    rating: number;
    ratingCount: number;
    price: string | number;
};

type FeaturedProps = {
    featuredProducts?: FeaturedProduct[];
};

function Featured({ featuredProducts = [] }: FeaturedProps) {
    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <Tabs defaultValue="all">
                    <TabsList className="mb-12 flex flex-wrap items-center bg-white justify-between">
                        <h2 className="text-3xl font-bold text-neutral-950">Productos Destacados</h2>
                        <div className="flex space-x-1 rounded-full bg-gray-100 px-1 py-1">
                            <TabsTrigger
                                value="all"
                                className="rounded-full px-4 py-1.5 text-sm font-medium whitespace-nowrap text-gray-600 transition hover:bg-white hover:shadow-sm"
                            >
                                Todos
                            </TabsTrigger>
                            <TabsTrigger
                                value="new"
                                className="rounded-full px-4 py-1.5 text-sm font-medium whitespace-nowrap text-gray-600 transition hover:bg-white hover:shadow-sm"
                            >
                                Novedades
                            </TabsTrigger>
                            <TabsTrigger
                                value="best"
                                className="rounded-full px-4 py-1.5 text-sm font-medium whitespace-nowrap text-gray-600 transition hover:bg-white hover:shadow-sm"
                            >
                                Más Vendidos
                            </TabsTrigger>
                            <TabsTrigger
                                value="sale"
                                className="rounded-full px-4 py-1.5 text-sm font-medium whitespace-nowrap text-gray-600 transition hover:bg-white hover:shadow-sm"
                            >
                                En Oferta
                            </TabsTrigger>
                        </div>
                    </TabsList>

                    <TabsContent value="all">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {featuredProducts.slice(0, 4).map((product, index) => (
                                <ProductCard
                                    key={index}
                                    imageUrl={product.imageUrl}
                                    imageAlt={product.imageAlt}
                                    isNew={product.isNew}
                                    isBestSeller={product.isBestSeller}
                                    isOnSale={product.isOnSale}
                                    title={product.title}
                                    rating={product.rating}
                                    ratingCount={product.ratingCount}
                                    price={product.price}
                                    onView={() => alert(`Viewing ${product.title}`)}
                                    onFavorite={() => alert(`Added ${product.title} to favorites`)}
                                    onAddToCart={() => alert(`Added ${product.title} to cart`)}
                                />
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="new">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {featuredProducts
                                .filter((product) => product.isNew)
                                .slice(0, 4)
                                .map((product, index) => (
                                    <ProductCard
                                        key={index}
                                        imageUrl={product.imageUrl}
                                        imageAlt={product.imageAlt}
                                        isNew={product.isNew}
                                        isBestSeller={product.isBestSeller}
                                        isOnSale={product.isOnSale}
                                        title={product.title}
                                        rating={product.rating}
                                        ratingCount={product.ratingCount}
                                        price={product.price}
                                        onView={() => alert(`Viewing ${product.title}`)}
                                        onFavorite={() => alert(`Added ${product.title} to favorites`)}
                                        onAddToCart={() => alert(`Added ${product.title} to cart`)}
                                    />
                                ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="best">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {featuredProducts
                                .filter((product) => product.isBestSeller)
                                .slice(0, 4)
                                .map((product, index) => (
                                    <ProductCard
                                        key={index}
                                        imageUrl={product.imageUrl}
                                        imageAlt={product.imageAlt}
                                        isNew={product.isNew}
                                        isBestSeller={product.isBestSeller}
                                        isOnSale={product.isOnSale}
                                        title={product.title}
                                        rating={product.rating}
                                        ratingCount={product.ratingCount}
                                        price={product.price}
                                        onView={() => alert(`Viewing ${product.title}`)}
                                        onFavorite={() => alert(`Added ${product.title} to favorites`)}
                                        onAddToCart={() => alert(`Added ${product.title} to cart`)}
                                    />
                                ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="sale">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {featuredProducts
                                .filter((product) => product.isOnSale)
                                .slice(0, 4)
                                .map((product, index) => (
                                    <ProductCard
                                        key={index}
                                        imageUrl={product.imageUrl}
                                        imageAlt={product.imageAlt}
                                        isNew={product.isNew}
                                        isBestSeller={product.isBestSeller}
                                        isOnSale={product.isOnSale}
                                        title={product.title}
                                        rating={product.rating}
                                        ratingCount={product.ratingCount}
                                        price={product.price}
                                        onView={() => alert(`Viewing ${product.title}`)}
                                        onFavorite={() => alert(`Added ${product.title} to favorites`)}
                                        onAddToCart={() => alert(`Added ${product.title} to cart`)}
                                    />
                                ))}
                        </div>
                    </TabsContent>
                </Tabs>

                <div className="mt-12 text-center">
                    <a
                        href="#"
                        className="rounded-button inline-block border border-gray-300 px-8 py-3 font-medium whitespace-nowrap text-gray-800 transition-colors hover:bg-gray-50"
                    >
                        Ver todos los productos
                    </a>
                </div>
            </div>
        </section>
    );
}

export default Featured;
