import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useProductSearch } from '@/hooks/use-product-search';
import { Product } from '@/types';
import { Link } from '@inertiajs/react';
import { Fragment } from 'react';
import { Separator } from '../ui/separator';

interface ProductSearcherProps {
    onProductSelect?: (product: Product) => void;
}

export default function ProductSearcher({ onProductSelect }: ProductSearcherProps) {
    const { search, setSearch, products, loading } = useProductSearch();

    const handleProductClick = (product: Product) => {
        if (onProductSelect) {
            onProductSelect(product);
        }
    };

    return (
        <>
            <Input
                type="text"
                placeholder="Search..."
                className="w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                disabled={loading}
            />
            <ScrollArea className="mt-4 h-72 w-full rounded-md border">
                <div className="p-4">
                    {loading && <div className="text-sm text-gray-500">Buscando...</div>}
                    {!loading && products.length === 0 && search.trim() && <div className="text-sm text-gray-500">No se encontraron productos</div>}
                    {!loading &&
                        products.map((product) => (
                            <Fragment key={product.id}>
                                <Link href={route('products.show', { id: product.id })}>
                                    <div className="text-xs hover:text-blue-500">{product.part_number}</div>
                                </Link>
                                <Separator className="my-2" />
                            </Fragment>
                        ))}
                </div>
            </ScrollArea>
        </>
    );
}
