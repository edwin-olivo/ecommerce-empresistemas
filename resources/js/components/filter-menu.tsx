import CategoryFilter from '@/components/filters/category-filter';
import PriceFilter from '@/components/filters/price-filter';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import type { CheckboxOption, FilterState } from '@/types';
import React from 'react';

// Props actualizadas para mayor claridad y desacoplamiento
interface FilterMenuProps {
    filters: Omit<FilterState, 'orderBy' | 'pageSize'>; // Solo necesita filtros visuales
    defaultOptions: {
        categories: CheckboxOption;
        classes: CheckboxOption;
        priceRange: [number, number];
    };
    onCategoryChange: (categories: string[]) => void;
    onClassChange: (classes: string[]) => void;
    onPriceChange: (priceRange: [number, number]) => void;
    onClearFilters: () => void;
}

const FilterMenu: React.FC<FilterMenuProps> = ({ filters, defaultOptions, onCategoryChange, onClassChange, onPriceChange, onClearFilters }) => {
    const minPriceRange = defaultOptions.priceRange?.[0] ?? 0;
    const maxPriceRange = defaultOptions.priceRange?.[1] ?? 5000;

    return (
        <aside className="w-full md:w-64 lg:w-72">
            <div className="rounded-xl border border-neutral-200 p-6">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Filtros</h2>
                    <button onClick={onClearFilters} className="cursor-pointer text-sm underline hover:text-neutral-600">
                        Limpiar
                    </button>
                </div>

                <Accordion type="multiple" className="w-full" defaultValue={['item-1', 'item-3']}>
                    {/* El resto del componente permanece igual, solo cambian las props que se pasan */}
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="cursor-pointer border-b-4 border-black pb-4 text-left font-extrabold uppercase">
                            Categoría
                        </AccordionTrigger>
                        <AccordionContent className="pt-4">
                            <CategoryFilter
                                selectedCategories={filters.categories}
                                onCategoryChange={onCategoryChange} // Pasa el manejador directamente
                                defaultCategories={defaultOptions.categories}
                            />
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger className="cursor-pointer border-b-4 border-black pb-4 text-left font-extrabold uppercase">
                            Clase
                        </AccordionTrigger>
                        <AccordionContent className="pt-4">
                            <CategoryFilter
                                selectedCategories={filters.classes}
                                onCategoryChange={onClassChange} // Pasa el manejador directamente
                                defaultCategories={defaultOptions.classes}
                            />
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger className="cursor-pointer border-b-4 border-black pb-4 text-left font-extrabold uppercase">
                            Precio
                        </AccordionTrigger>
                        <AccordionContent className="pt-4">
                            <PriceFilter
                                minPrice={filters.priceRange[0]}
                                maxPrice={filters.priceRange[1]}
                                priceRange={{ min: minPriceRange, max: maxPriceRange }}
                                onPriceChange={onPriceChange} // Pasa el manejador directamente
                            />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </aside>
    );
};

export default FilterMenu;
