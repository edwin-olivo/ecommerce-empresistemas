import React from 'react';
import CategoryFilter from '@/components/filters/CategoryFilter';
import PriceFilter from '@/components/filters/PriceFilter';
import ColorFilter from '@/components/filters/ColorFilter';
import type { FilterState, Color } from '@/types';

interface FilterMenuProps {
  filters?: FilterState;
  defaultOptions?: {
    categories: string[];
    colors: Color[];
  };
  colorOptions?: Color[];
  onFiltersChange?: (filters: FilterState) => void;
  onClearFilters?: () => void;
}

const FilterMenu: React.FC<FilterMenuProps> = ({
  filters = { categories: [], colors: [], maxPrice: 5000 },
  defaultOptions = { categories: ["Abrigos", "Sudaderas", "Pantalones", "Camisetas", "Accesorios", "Calzado"], colors: [] },
  onFiltersChange,
  onClearFilters,
}) => {
  const handleCategoryChange = (categories: string[]) => {
    if (onFiltersChange) {
      onFiltersChange({ ...filters, categories });
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
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Filtros</h2>
          <button
            onClick={onClearFilters}
            className="text-sm underline cursor-pointer hover:text-neutral-600"
          >
            Limpiar
          </button>
        </div>

        <CategoryFilter
          selectedCategories={filters.categories}
          onCategoryChange={handleCategoryChange}
          defaultCategories={defaultOptions.categories}
        />
        <PriceFilter
          maxPrice={filters.maxPrice}
          onPriceChange={handlePriceChange}
        />
        <ColorFilter
          selectedColors={filters.colors}
          onColorChange={handleColorChange}
          defaultColors={defaultOptions.colors}
        />

      </div>
    </aside>
  );
};

export default FilterMenu;