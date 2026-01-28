import ProductCard from '@/components/products/product-card-modern';

export type ArrivalProduct = {
    imageUrl: string;
    title: string;
    rating: number;
    ratingCount: number;
    price: string | number;
};

type ArrivalsProps = {
    arrivals?: ArrivalProduct[];
};

function Arrivals({ arrivals = [] }: ArrivalsProps) {
    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <h2 className="mb-12 text-center text-3xl font-bold">Novedades</h2>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {arrivals.map((product, index) => (
                        <ProductCard
                            key={index}
                            imageUrl={product.imageUrl}
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
                        Ver todas las novedades
                    </a>
                </div>
            </div>
        </section>
    );
}

export default Arrivals;
