import CustomPagination, { CustomPaginationProps } from '@/components/custom-pagination';
import { FilterAndSortMenu } from '@/components/filter-menu-mobile';
import ProductCard from '@/components/products/product-card';
import { Button } from '@/components/ui/button';
import { useProductFilters } from '@/hooks/use-product-filters'; // Hook para manejar filtros
import AppLayout from '@/layouts/app-layout';
import MainLayout from '@/layouts/common/main-layout';
import { getBreadcrumbs } from '@/lib/breadcrumb-helper';
import type { BreadcrumbItem, CheckboxOption, MultiSelectOption } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { ShoppingCart } from 'lucide-react';

interface ProductsProps {
    products: CustomPaginationProps;
    filters: Record<string, any>; // Recibimos los filtros del controlador
    minPrice: number;
    maxPrice: number;
    listas: {
        categorias: Record<string, string>;
        clases: Record<string, string>;
        colores?: Record<string, string> | undefined;
        tipos?: Record<string, string> | undefined;
    };
    [key: string]: any;
}

const pageSizeOptions: CheckboxOption = { '12': '12', '24': '24', '48': '48', all: 'Todos' };

export default function Products() {
    const { products, listas, filters: initialFilters } = usePage<ProductsProps>().props;
    const { categorias: categories, clases: classes } = listas;
    let { minPrice, maxPrice } = usePage<ProductsProps>().props;

    minPrice = Number(minPrice) || 0;
    maxPrice = Number(maxPrice) || 5000;

    const categoriesArray: MultiSelectOption[] = Object.entries(categories).map(([value, label]) => {
        if (label === '') label = 'Sin categoría';
        return { value, label };
    });
    const classesArray: MultiSelectOption[] = Object.entries(classes).map(([value, label]) => {
        if (label === '') label = 'Sin clase';
        return { value, label };
    });

    // Usamos el hook para manejar toda la lógica de filtros
    const { filters, setFilter, clearFilters } = useProductFilters({ initialFilters });

    const productsList = products.data || products || [];
    const currentPriceRange = filters['filter[price]']?.split(',').map(Number) || [minPrice, maxPrice];
    const currentCategories = filters['filter[categories]'] || [];
    const currentClasses = filters['filter[classes]'] || [];
    const currentPageSize = filters.pageSize || pageSizeOptions['24'];

    const crumbs: BreadcrumbItem[] = [];

    if (currentCategories && categories[currentCategories]) {
        crumbs.push({
            title: categories[currentCategories],
            href: '', // Página actual
        });
    }

    const breadcrumbs = getBreadcrumbs('/products', crumbs);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Productos" />

            <MainLayout>
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center">
                        <div className="mb-4 flex justify-center">
                            <div className="rounded-lg bg-blue-100 p-3 dark:bg-blue-900/30">
                                <ShoppingCart className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                        <h1 className="mb-2 text-4xl font-bold text-neutral-900 dark:text-white">Productos</h1>
                        <p className="text-lg text-neutral-600 dark:text-neutral-400">Todos los productos disponibles</p>
                    </div>
                </div>

                <div className="flex flex-col gap-8 md:flex-row">
                    <section className="flex-1">
                        <div className="mb-4 flex flex-wrap items-center justify-between gap-y-4 lg:gap-y-0">
                            <div className="order-3 w-full lg:order-none lg:flex-1">
                                {currentPageSize === 'all' ? (
                                    <p className="text-sm text-neutral-600 dark:text-white">Mostrando todos los productos</p>
                                ) : (
                                    products.total > 0 && (
                                        <p className="text-sm text-neutral-600 dark:text-white">
                                            Mostrando {products.from} - {products.to} de {products.total} productos
                                        </p>
                                    )
                                )}
                            </div>
                            <div className="order-1 flex flex-grow justify-center gap-2 lg:order-none lg:flex-1">
                                {Object.entries(pageSizeOptions).map(([key, label]) => (
                                    <Button
                                        variant={currentPageSize === key ? 'default' : 'outline'}
                                        key={key}
                                        onClick={() => setFilter('pageSize', key, true)}
                                    >
                                        {label}
                                    </Button>
                                ))}
                            </div>
                            <div className="order-2 flex flex-grow justify-center align-middle md:flex-1 lg:order-none lg:justify-end">
                                <FilterAndSortMenu
                                    filters={{
                                        categories: currentCategories,
                                        classes: currentClasses,
                                        priceRange: currentPriceRange as [number, number],
                                        orderBy: filters.sort,
                                    }}
                                    onCategoryChange={(value) => setFilter('filter[categories]', value)}
                                    onClassChange={(value) => setFilter('filter[classes]', value)}
                                    onPriceChange={(value) => setFilter('filter[price]', value.join(','))}
                                    onSortChange={(value) => setFilter('sort', value, true)}
                                    onClearFilters={clearFilters}
                                    defaultOptions={{
                                        categories: categoriesArray,
                                        classes: classesArray,
                                        priceRange: [minPrice, maxPrice],
                                    }}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                            {productsList.map((product) => {
                                product.category = categories[product.category] || product.category;
                                return <ProductCard key={product.id} product={product} />;
                            })}
                        </div>

                        {productsList.length === 0 && (
                            <div className="py-12 text-center">
                                <p className="text-xl text-neutral-600">No se encontraron productos.</p>
                                <button
                                    onClick={clearFilters}
                                    className="mt-4 border-2 border-black bg-white px-6 py-2 font-bold transition-colors hover:bg-black hover:text-white"
                                >
                                    Limpiar filtros
                                </button>
                            </div>
                        )}

                        {products.last_page > 1 && (
                            <div className="mt-8 w-full">
                                <CustomPagination {...products} />
                            </div>
                        )}
                    </section>
                </div>
            </MainLayout>
        </AppLayout>
    );
}
