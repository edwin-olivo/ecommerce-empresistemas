import FilterMenu from '@/components/filter-menu';
import ProductCard from '@/components/products/product-card';
import type { Color, FilterState, Product } from '@/types';
import React, { useEffect, useMemo, useState } from 'react';

const BrutalistHeader: React.FC = () => (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b-4 border-black bg-neutral-200 p-4">
        <h1 className="text-2xl font-extrabold uppercase">TIENDA</h1>
        <nav className="flex gap-4 font-bold">
            <a href="#" className="hover:underline">
                Novedades
            </a>
            <a href="#" className="hover:underline">
                Hombre
            </a>
            <a href="#" className="hover:underline">
                Mujer
            </a>
        </nav>
    </header>
);

interface ProductsProps {
    initialProducts: Product[];
}

export default function Products({initialProducts}: ProductsProps) {
    const [colorOptions, setColorOptions] = useState<Color[]>([]);
    const [categoriesOptions, setCategoriesOptions] = useState<string[]>([]);

    const [filters, setFilters] = useState<FilterState>({
        categories: [],
        colors: [],
        maxPrice: 5000,
    });

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

            // Price filter
            if (product.price > filters.maxPrice) {
                return false;
            }

            return true;
        });
    }, [filters]);

    const handleFiltersChange = (newFilters: FilterState) => {
        setFilters(newFilters);
    };

    const handleClearFilters = () => {
        setFilters({
            categories: [],
            colors: [],
            maxPrice: 5000,
        });
    };

    useEffect(() => {
        const uniqueColors = Array.from(new Set(initialProducts.map((p) => p.color)));
        const colorValues: { [key: string]: string } = {};
        uniqueColors.forEach((color) => {
            colorValues[color] = color;
        });
        setColorOptions(Object.entries(colorValues).map(([name, value]) => ({ name, value })));
    }, []);

    useEffect(() => {
        const uniqueCategories = Array.from(new Set(initialProducts.map((p) => p.category)));
        setCategoriesOptions(uniqueCategories);
    }, []);

    return (
        <div className="min-h-screen bg-neutral-200 font-mono text-black">
            <BrutalistHeader />

            <main className="mx-auto max-w-7xl p-4 sm:p-8">
                <div className="flex flex-col gap-8 md:flex-row">
                    {/* Columna de Filtros */}
                    <FilterMenu
                        filters={filters}
                        onFiltersChange={handleFiltersChange}
                        onClearFilters={handleClearFilters}
                        defaultOptions={{ categories: categoriesOptions, colors: colorOptions }}
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
        </div>
    );
};
