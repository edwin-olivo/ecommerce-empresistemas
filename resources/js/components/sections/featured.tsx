import ProductCard from '@/components/products/product-card-modern';

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
}

function Featured({ featuredProducts = [] }: FeaturedProps) {
    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <div className="mb-12 flex items-center justify-between">
                    <h2 className="text-3xl font-bold">Featured Products</h2>
                    <div className="flex space-x-1 rounded-full bg-gray-100 px-1 py-1">
                        <button className="rounded-full bg-white px-4 py-1.5 text-sm font-medium whitespace-nowrap text-gray-800 shadow-sm">
                            All
                        </button>
                        <button className="rounded-full px-4 py-1.5 text-sm font-medium whitespace-nowrap text-gray-600 transition hover:bg-white hover:shadow-sm">
                            New Arrivals
                        </button>
                        <button className="rounded-full px-4 py-1.5 text-sm font-medium whitespace-nowrap text-gray-600 transition hover:bg-white hover:shadow-sm">
                            Best Sellers
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {featuredProducts.map((product, index) => (
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

                <div className="mt-12 text-center">
                    <a
                        href="#"
                        className="rounded-button inline-block border border-gray-300 px-8 py-3 font-medium whitespace-nowrap text-gray-800 transition-colors hover:bg-gray-50"
                    >
                        View All Products
                    </a>
                </div>
            </div>
        </section>
    );
}

export default Featured;
