import FilterMenu from '@/components/filter-menu';
import ProductCard from '@/components/products/product-card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, Color, FilterState, Product } from '@/types';
import { Head } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';

interface ProductsProps {
    initialProducts: Product[];
}

const initialFilterState: FilterState = {
    categories: [],
    colors: [],
    classes: [],
    maxPrice: 200000,
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/products',
    },
];

export default function Products({ initialProducts }: ProductsProps) {
    const [colorOptions, setColorOptions] = useState<Color[]>([]);
    const [categoriesOptions, setCategoriesOptions] = useState<string[]>([]);
    const [classOptions, setClassOptions] = useState<string[]>([]);

    const [filters, setFilters] = useState<FilterState>(initialFilterState);

    // Filter products based on current filter state
    const filteredProducts = useMemo(() => {
        return initialProducts.filter((product: Product) => {
            // Category filter
            if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
                return false;
            }

            // Color filter
            if (filters.colors.length > 0 && !filters.colors.includes(product.color)) {
                return false;
            }

            // Class filter
            if (filters.classes && filters.classes.length > 0) {
                const productClass = product.custom?.clase_c;
                if (!productClass || !filters.classes.includes(productClass)) {
                    return false;
                }
            }

            // Price filter
            if (product.price > filters.maxPrice) {
                return false;
            }

            return true;
        });
    }, [initialProducts, filters]);

    const handleFiltersChange = (newFilters: FilterState) => {
        setFilters(newFilters);
    };

    const handleClearFilters = () => {
        setFilters(initialFilterState);
    };

    useEffect(() => {
        const uniqueColors = Array.from(new Set(initialProducts.map((p) => p.color)));
        const colorValues: { [key: string]: string } = {};
        uniqueColors.forEach((color) => {
            colorValues[color] = color;
        });
        setColorOptions(Object.entries(colorValues).map(([name, value]) => ({ name, value })));
    }, [initialProducts]);

    useEffect(() => {
        const uniqueCategories = Array.from(new Set(initialProducts.map((p) => p.category)));
        setCategoriesOptions(uniqueCategories);
    }, [initialProducts]);

    useEffect(() => {
        const uniqueClasses = Array.from(new Set(initialProducts.map((p) => p.custom?.clase_c)));
        setClassOptions(uniqueClasses);
    }, [initialProducts]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <main className="h-full overflow-x-auto rounded-xl p-4">
                <div className="flex flex-col gap-8 md:flex-row">
                    {/* Columna de Filtros */}
                    <FilterMenu
                        filters={filters}
                        onFiltersChange={handleFiltersChange}
                        onClearFilters={handleClearFilters}
                        defaultOptions={{
                            categories: categoriesOptions,
                            colors: colorOptions,
                            classes: classOptions,
                            priceRange: { min: 0, max: 200000 },
                        }}
                    />

                    {/* Columna de Productos */}
                    <section className="flex-1">
                        <div className="mb-4">
                            <p className="text-sm text-neutral-600">
                                Mostrando {filteredProducts.length} de {initialProducts.length} productos
                            </p>
                        </div>
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                        {filteredProducts.length === 0 && (
                            <div className="py-12 text-center">
                                <p className="text-xl text-neutral-600">No se encontraron productos con los filtros seleccionados.</p>
                                <button
                                    onClick={handleClearFilters}
                                    className="mt-4 border-2 border-black bg-white px-6 py-2 font-bold transition-colors hover:bg-black hover:text-white"
                                >
                                    Limpiar filtros
                                </button>
                            </div>
                        )}
                    </section>
                </div>
            </main>
        </AppLayout>
    );
}
