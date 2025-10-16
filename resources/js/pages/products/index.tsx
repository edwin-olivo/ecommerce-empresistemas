import CustomPagination, { CustomPaginationProps } from '@/components/custom-pagination';
import { FilterAndSortMenu } from '@/components/filter-menu-mobile';
import ProductCard from '@/components/products/product-card';
import { Button } from '@/components/ui/button';
import { useProductFilters } from '@/hooks/use-product-filters'; // Hook para manejar filtros
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, CheckboxOption, MultiSelectOption } from '@/types';
import { Head, usePage } from '@inertiajs/react';

// Tipos actualizados
interface ProductsProps {
    products: CustomPaginationProps;
    categories: Record<string, string>;
    classes: Record<string, string>;
    colors: Record<string, string>;
    filters: Record<string, any>; // Recibimos los filtros del controlador
    minPrice: number;
    maxPrice: number;
    [key: string]: any; // Index signature to satisfy PageProps constraint
}

const orderByOptions: CheckboxOption = {
    part_number: 'Nombre: A a Z',
    '-part_number': 'Nombre: Z a A',
    price: 'Precio: Bajo a Alto',
    '-price': 'Precio: Alto a Bajo',
};

const pageSizeOptions: CheckboxOption = { '12': '12', '24': '24', '48': '48', all: 'Todos' };
const breadcrumbs: BreadcrumbItem[] = [{ title: 'Products', href: '/products' }];

export default function Products() {
    const { products, categories, classes, filters: initialFilters } = usePage<ProductsProps>().props;
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Productos" />
            <main className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl px-4 py-8">
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
                            <div className="order-1 flex flex-grow justify-start gap-2 lg:order-none lg:flex-1 lg:justify-center">
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
                            <div className="order-2 flex flex-grow justify-end align-middle md:flex-1 lg:order-none">
                                <FilterAndSortMenu
                                    // Pasamos el estado actual de los filtros
                                    filters={{
                                        categories: currentCategories,
                                        classes: currentClasses,
                                        priceRange: currentPriceRange as [number, number],
                                        orderBy: filters.sort || 'part_number',
                                    }}
                                    // Pasamos los manejadores del hook
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
                            {productsList.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
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
            </main>
        </AppLayout>
    );
}
