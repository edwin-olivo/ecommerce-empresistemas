import { router } from '@inertiajs/react';
import { debounce } from 'lodash-es';
import { useCallback, useState } from 'react';

// Tipos para mayor claridad
type FilterValues = string | string[] | number[];
type Filters = Record<string, FilterValues>;

interface UseProductFiltersProps {
    initialFilters: Record<string, any>;
}

export function useProductFilters({ initialFilters }: UseProductFiltersProps) {
    // El estado se inicializa con los filtros que vienen del controlador
    const [filters, setFilters] = useState(initialFilters);

    // Función debounced para no saturar el servidor con peticiones (ej. slider de precio)
    const debouncedVisit = useCallback(
        debounce((newFilters: Filters) => {
            // Limpiamos los filtros vacíos para una URL más limpia
            Object.keys(newFilters).forEach((key) => {
                if (newFilters[key] === '' || (Array.isArray(newFilters[key]) && (newFilters[key] as any[]).length === 0)) {
                    delete newFilters[key];
                }
            });

            router.get(route('products.index'), newFilters, {
                preserveState: true,
                preserveScroll: true,
                replace: true, // Reemplaza el historial para no acumular cambios de filtro
            });
        }, 300), // Espera 300ms antes de ejecutar
        [],
    );

    const setFilter = (key: string, value: FilterValues, immediate = false) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);

        if (immediate) {
            debouncedVisit.cancel(); // Cancela cualquier visita pendiente
            debouncedVisit(newFilters);
        } else {
            debouncedVisit(newFilters);
        }
    };

    const clearFilters = () => {
        const clearedFilters = {
            // Mantenemos el pageSize y orderBy si queremos
            pageSize: filters.pageSize,
            sort: filters.sort,
        };
        setFilters(clearedFilters);
        router.get(route('products.index'), clearedFilters, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    return {
        filters,
        setFilter,
        clearFilters,
    };
}
