import CategoryFilter from '@/components/filters/category-filter';
import PriceFilter from '@/components/filters/price-filter';
import type { Color, FilterState } from '@/types';
import React from 'react';

interface FilterMenuProps {
    filters?: FilterState;
    defaultOptions?: {
        categories: string[];
        colors: Color[];
        classes?: string[];
        priceRange?: { min: number; max: number } | undefined;
    };
    colorOptions?: Color[];
    onFiltersChange?: (filters: FilterState) => void;
    onClearFilters?: () => void;
}

const FilterMenu: React.FC<FilterMenuProps> = ({
    filters = { categories: [], colors: [], maxPrice: 5000, classes: [] },
    defaultOptions = { categories: ['Abrigos', 'Sudaderas', 'Pantalones', 'Camisetas', 'Accesorios', 'Calzado'], colors: [] },
    onFiltersChange,
    onClearFilters,
}) => {
    const minPriceRange = defaultOptions.priceRange?.min ?? 0;
    const maxPriceRange = defaultOptions.priceRange?.max ?? 5000;

    const handleCategoryChange = (categories: string[]) => {
        if (onFiltersChange) {
            onFiltersChange({ ...filters, categories });
        }
    };

    const handleClassChange = (classes: string[]) => {
        if (onFiltersChange) {
            onFiltersChange({ ...filters, classes });
        }
    };

    const handleColorChange = (colors: string[]) => {
        if (onFiltersChange) {
            onFiltersChange({ ...filters, colors });
        }
    };

    const handlePriceChange = (maxPrice: number) => {
        if (onFiltersChange) {
            onFiltersChange({ ...filters, maxPrice });
        }
    };

    return (
        <aside className="w-full md:w-64 lg:w-72">
            <div className="border-4 border-black p-6">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Filtros</h2>
                    <button onClick={onClearFilters} className="cursor-pointer text-sm underline hover:text-neutral-600">
                        Limpiar
                    </button>
                </div>

                <CategoryFilter
                    selectedCategories={filters.categories}
                    onCategoryChange={handleCategoryChange}
                    defaultCategories={defaultOptions.categories}
                />
                {defaultOptions.classes && defaultOptions.classes.length > 0 && (
                    <CategoryFilter
                        selectedCategories={filters.classes}
                        onCategoryChange={handleClassChange}
                        defaultCategories={defaultOptions.classes}
                    />
                )}
                <PriceFilter maxPrice={filters.maxPrice} priceRange={{ min: minPriceRange, max: maxPriceRange }} onPriceChange={handlePriceChange} />
                {/* <ColorFilter selectedColors={filters.colors} onColorChange={handleColorChange} defaultColors={defaultOptions.colors} /> */}
            </div>
        </aside>
    );
};

export default FilterMenu;
