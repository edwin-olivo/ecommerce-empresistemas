import CategoryFilter from '@/components/filters/category-filter';
import PriceFilter from '@/components/filters/price-filter';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import type { CheckboxOption, FilterState } from '@/types';
import React from 'react';

interface FilterMenuProps {
    filters: FilterState;
    defaultOptions: {
        categories: CheckboxOption;
        classes: CheckboxOption;
        colors: CheckboxOption;
        priceRange: [number, number];
    };
    onFiltersChange?: (filters: FilterState) => void;
    onClearFilters?: () => void;
}

const FilterMenu: React.FC<FilterMenuProps> = ({ filters, defaultOptions, onFiltersChange, onClearFilters }) => {
    const minPriceRange = defaultOptions.priceRange?.[0] ?? 0;
    const maxPriceRange = defaultOptions.priceRange?.[1] ?? 5000;

    const minPrice = filters.priceRange ? filters.priceRange[0] : minPriceRange;
    const maxPrice = filters.priceRange ? filters.priceRange[1] : maxPriceRange;

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

    const handlePriceChange = (priceRange: [number, number]) => {
        if (onFiltersChange) {
            onFiltersChange({ ...filters, priceRange });
        }
    };

    return (
        <aside className="w-full md:w-64 lg:w-72">
            <div className="rounded-xl border border-neutral-200 p-6">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Filtros</h2>
                    <button onClick={onClearFilters} className="cursor-pointer text-sm underline hover:text-neutral-600">
                        Limpiar
                    </button>
                </div>

                <Accordion type="multiple" className="w-full" defaultValue={['item-1', 'item-2', 'item-3']}>
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="cursor-pointer border-b-4 border-black pb-4 text-left text-xl font-extrabold uppercase">
                            Categoría
                        </AccordionTrigger>
                        <AccordionContent className="pt-4">
                            <CategoryFilter
                                selectedCategories={filters.categories}
                                onCategoryChange={handleCategoryChange}
                                defaultCategories={defaultOptions.categories}
                            />
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger className="cursor-pointer border-b-4 border-black pb-4 text-left text-xl font-extrabold uppercase">
                            Clase
                        </AccordionTrigger>
                        <AccordionContent className="pt-4">
                            <CategoryFilter
                                selectedCategories={filters.classes}
                                onCategoryChange={handleClassChange}
                                defaultCategories={defaultOptions.classes}
                            />
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger className="cursor-pointer border-b-4 border-black pb-4 text-left text-xl font-extrabold uppercase">
                            Precio
                        </AccordionTrigger>
                        <AccordionContent className="pt-4">
                            <PriceFilter
                                minPrice={minPrice}
                                maxPrice={maxPrice}
                                priceRange={{ min: minPriceRange, max: maxPriceRange }}
                                onPriceChange={handlePriceChange}
                            />
                        </AccordionContent>
                    </AccordionItem>
                    {/* <AccordionItem value="item-4">
                        <AccordionTrigger className="border-b-4 border-black pb-4 text-left text-xl font-extrabold uppercase">Color</AccordionTrigger>
                        <AccordionContent className="pt-4">
                            <ColorFilter selectedColors={filters.colors} onColorChange={handleColorChange} defaultColors={defaultOptions.colors} />
                        </AccordionContent>
                    </AccordionItem> */}
                </Accordion>
            </div>
        </aside>
    );
};

export default FilterMenu;
