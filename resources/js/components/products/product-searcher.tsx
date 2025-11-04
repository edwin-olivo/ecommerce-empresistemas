import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useProductSearch } from '@/hooks/use-product-search';
import { cn } from '@/lib/utils';
import { Product } from '@/types';
import { Link } from '@inertiajs/react';
import { Fragment } from 'react';
import { Separator } from '../ui/separator';

interface ProductSearcherProps {
    onProductSelect?: (product: Product) => void;
}

export default function ProductSearcher({ onProductSelect }: ProductSearcherProps) {
    const { search, setSearch, products, loading } = useProductSearch();

    return (
        <>
            <Input
                type="text"
                placeholder="Buscar..."
                className="w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                disabled={loading}
                autoComplete="off"
            />
            <ScrollArea
                className={cn('mt-4 w-full rounded-md border', {
                    'pointer-events-none opacity-50': loading,
                    'h-72': products.length > 0,
                    'h-20': products.length === 0,
                    hidden: !loading && search.trim() === '',
                })}
            >
                <div className="p-4">
                    {loading ? (
                        <div className="text-sm text-gray-500">Buscando...</div>
                    ) : products.length === 0 ? (
                        <div className="text-sm text-gray-500">No se encontraron productos</div>
                    ) : (
                        products.map((product) => (
                            <Fragment key={product.id}>
                                <Link href={route('products.show', { id: product.id })}>
                                    <div className="text-xs hover:text-blue-500">{product.part_number}</div>
                                </Link>
                                <Separator className="my-2" />
                            </Fragment>
                        ))
                    )}
                </div>
            </ScrollArea>
        </>
    );
}
