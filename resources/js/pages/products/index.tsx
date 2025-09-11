import React, { useState, useMemo, useEffect } from 'react';
import type { Product, FilterState, Color } from '@/types';
import { products as initialProducts } from '@/data/data';
import ProductCard from '@/components/ProductCard';
import FilterMenu from '@/components/FilterMenu';

const BrutalistHeader: React.FC = () => (
  <header className="border-b-4 border-black p-4 flex justify-between items-center bg-neutral-200 sticky top-0 z-10">
    <h1 className="text-2xl font-extrabold uppercase">TIENDA</h1>
    <nav className="flex gap-4 font-bold">
      <a href="#" className="hover:underline">Novedades</a>
      <a href="#" className="hover:underline">Hombre</a>
      <a href="#" className="hover:underline">Mujer</a>
    </nav>
  </header>
);

const ProductGridPage: React.FC = () => {
  const [colorOptions, setColorOptions] = useState<Color[]>([]);
  const [categoriesOptions, setCategoriesOptions] = useState<string[]>([]);

  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    colors: [],
    maxPrice: 5000
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
      maxPrice: 5000
    });
  };

  useEffect(() => {
    const uniqueColors = Array.from(new Set(initialProducts.map(p => p.color)));
    const colorValues: { [key: string]: string } = {};
    uniqueColors.forEach(color => {
      colorValues[color] = color;
    });
    setColorOptions(Object.entries(colorValues).map(([name, value]) => ({ name, value })));
  }, []);

  useEffect(() => {
    const uniqueCategories = Array.from(new Set(initialProducts.map(p => p.category)));
    setCategoriesOptions(uniqueCategories);
  }, []);

  return (
    <div className="font-mono bg-neutral-200 min-h-screen text-black">
      <BrutalistHeader />

      <main className="max-w-7xl mx-auto p-4 sm:p-8">
        <div className="flex flex-col md:flex-row gap-8">

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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-xl text-neutral-600">No se encontraron productos con los filtros seleccionados.</p>
                <button
                  onClick={handleClearFilters}
                  className="mt-4 px-6 py-2 border-2 border-black bg-white hover:bg-black hover:text-white transition-colors font-bold"
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

export default ProductGridPage;