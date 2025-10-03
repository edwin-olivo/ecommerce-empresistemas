import PriceFilter from '@/components/filters/price-filter';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { CheckboxOption, FilterState, MultiSelectOption } from '@/types';
import { SlidersHorizontal } from 'lucide-react';
import MultiSelect from './multi-select';

const orderByOptions: CheckboxOption = {
    part_number: 'Nombre: A a Z',
    '-part_number': 'Nombre: Z a A',
    price: 'Precio: Bajo a Alto',
    '-price': 'Precio: Alto a Bajo',
};

interface FilterMenuProps {
    filters: FilterState;
    defaultOptions: {
        categories: MultiSelectOption[];
        classes: MultiSelectOption[];
        priceRange: [number, number];
    };
    onCategoryChange: (categories: string[]) => void;
    onClassChange: (classes: string[]) => void;
    onPriceChange: (priceRange: [number, number]) => void;
    onSortChange: (sortBy: string) => void;
    onClearFilters: () => void;
}

export function FilterAndSortMenu({
    filters,
    defaultOptions,
    onCategoryChange,
    onClassChange,
    onPriceChange,
    onSortChange,
    onClearFilters,
}: FilterMenuProps) {
    const minPriceRange = defaultOptions.priceRange?.[0] ?? 0;
    const maxPriceRange = defaultOptions.priceRange?.[1] ?? 5000;

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                    <SlidersHorizontal className="h-4 w-4" />
                    Filtrar y Ordenar
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Filtrar y Ordenar</DialogTitle>
                </DialogHeader>

                <div className="grid gap-6 py-4">
                    {/* Ordenar por */}
                    <div className="grid grid-cols-1 items-center gap-4">
                        <Label htmlFor="sort-by" className="text-left font-semibold">
                            Ordenar por
                        </Label>
                        <Select onValueChange={onSortChange} value={filters.orderBy || 'part_number'}>
                            <SelectTrigger>
                                <SelectValue placeholder="Ordenar por" />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                                {Object.entries(orderByOptions).map(([key, label]) => (
                                    <SelectItem key={key} value={key}>
                                        {label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Solo en stock */}
                    <div className="flex items-center justify-between">
                        <Label htmlFor="in-stock" className="font-semibold">
                            Solo en stock
                        </Label>
                        <Switch id="in-stock" />
                    </div>

                    {/* Categoría */}
                    <div className="grid grid-cols-1 items-center gap-4">
                        <Label htmlFor="category" className="text-left font-semibold">
                            Categoría
                        </Label>
                        <MultiSelect
                            options={defaultOptions.categories}
                            value={filters.categories}
                            onChange={onCategoryChange}
                            placeholder="Seleccionar categorías"
                        />
                    </div>

                    {/* Subcategoría */}
                    <div className="grid grid-cols-1 items-center gap-4">
                        <Label htmlFor="class" className="text-left font-semibold">
                            Clase
                        </Label>
                        <MultiSelect
                            options={defaultOptions.classes}
                            value={filters.classes}
                            onChange={onClassChange}
                            placeholder="Seleccionar clases"
                        />
                    </div>

                    {/* Rango de precios */}
                    <div className="grid grid-cols-1 items-center gap-4">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="price-range" className="font-semibold">
                                Precio
                            </Label>
                        </div>
                        <PriceFilter
                            minPrice={filters.priceRange[0]}
                            maxPrice={filters.priceRange[1]}
                            priceRange={{ min: minPriceRange, max: maxPriceRange }}
                            onPriceChange={onPriceChange} // Pasa el manejador directamente
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button type="submit" className="w-full">
                        Aplicar filtros
                    </Button>
                    <Button variant="outline" onClick={onClearFilters} className="w-full">
                        Limpiar filtros
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
