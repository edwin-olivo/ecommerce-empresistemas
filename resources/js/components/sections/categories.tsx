import CategoryItem from '@/components/sections/category-item';

export type Category = {
    src: string;
    alt: string;
    title: string;
    description: string;
};

type CategoriesProps = {
    categories?: Category[];
}

function Categories({ categories = [] }: CategoriesProps) {
    return (
        <section className="bg-gray-50 py-16">
            <div className="container mx-auto px-4">
                <h2 className="mb-12 text-center text-3xl font-bold">Shop by Category</h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
                    {categories.map((category, index) => (
                        <CategoryItem key={index} src={category.src} alt={category.alt} title={category.title} description={category.description} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Categories;
