import CustomPagination, { CustomPaginationProps } from '@/components/custom-pagination';
import FilterMenu from '@/components/filter-menu';
import ProductCard from '@/components/products/product-card';
import AppLayout from '@/layouts/app-layout';
import { getArrayParam } from '@/lib/utils';
import type { BreadcrumbItem, CheckboxOption, FilterState } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

interface ProductsProps {
    products: CustomPaginationProps;
    categories: Record<string, string>;
    classes: Record<string, string>;
    colors: Record<string, string>;
}

const initialFilterState: FilterState = {
    categories: [],
    colors: [],
    classes: [],
    priceRange: [0, 5000],
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/products',
    },
];

export default function Products() {
    const { products, categories, classes, colors } = usePage().props as unknown as ProductsProps;
    // No necesitamos estado local para la paginación cuando usamos Inertia
    const productsList = products.data;

    const [colorOptions, setColorOptions] = useState<CheckboxOption>({});
    const [categoryOptions, setCategoryOptions] = useState<CheckboxOption>(categories);
    const [classOptions, setClassOptions] = useState<CheckboxOption>(classes);
    const [filters, setFilters] = useState<FilterState>(initialFilterState);

    // Obtener los filtros iniciales de la URL al cargar la página
    useEffect(() => {
        const parsedUrl = new URL(window.location.href);
        const params = new URLSearchParams(parsedUrl.search);

        const categoriesParam = getArrayParam('categories', params);
        const classesParam = getArrayParam('classes', params);
        const minPriceParam = params.get('min_price');
        const maxPriceParam = params.get('max_price');

        // Configurar los filtros iniciales basados en los parámetros de URL
        const initialFilters: FilterState = {
            categories: categoriesParam || [],
            classes: classesParam || [],
            colors: [],
            priceRange: [
                minPriceParam ? parseInt(minPriceParam) : initialFilterState.priceRange[0],
                maxPriceParam ? parseInt(maxPriceParam) : initialFilterState.priceRange[1],
            ],
        };

        setFilters(initialFilters);
    }, []);

    function handleFiltersChange(newFilters: FilterState) {
        setFilters(newFilters);

        // Preparar los parámetros para la URL
        const params: Record<string, any> = {};

        // Añadir categorías si existen
        if (newFilters.categories && newFilters.categories.length > 0) {
            params.categories = newFilters.categories;
        }

        // Añadir clases si existen
        if (newFilters.classes && newFilters.classes.length > 0) {
            params.classes = newFilters.classes;
        }

        // Añadir rango de precios si existe y es diferente del predeterminado
        if (
            newFilters.priceRange &&
            (newFilters.priceRange[0] !== initialFilterState.priceRange[0] || newFilters.priceRange[1] !== initialFilterState.priceRange[1])
        ) {
            params.min_price = newFilters.priceRange[0];
            params.max_price = newFilters.priceRange[1];
        }

        // Navegar usando Inertia
        router.get('/products', params, {
            preserveState: true,
            preserveScroll: true,
            only: ['products'],
        });
    }

    function handleClearFilters() {
        setFilters(initialFilterState);

        // Navegar a la URL sin filtros
        router.get(
            '/products',
            {},
            {
                preserveState: true,
                preserveScroll: true,
                only: ['products'],
            },
        );
    }

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
                            ...initialFilterState,
                            categories: categories,
                            classes: classes,
                            colors: colors,
                            priceRange: [0, 5000],
                        }}
                    />

                    {/* Columna de Productos */}
                    <section className="flex-1">
                        <div className="mb-4">
                            <p className="text-sm text-neutral-600">
                                Mostrando {products.to} de {products.total} productos
                            </p>
                        </div>
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {productsList.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                        {productsList.length === 0 && (
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

                        <div className="mt-8 w-full">
                            <CustomPagination {...products} />
                        </div>
                    </section>
                </div>
            </main>
        </AppLayout>
    );
}
