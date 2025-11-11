import { Image } from '@/components/image';
import ProductQuickView from '@/components/products/product-quick-view';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import type { Product } from '@/types';
import { Link, useForm } from '@inertiajs/react';
import { ArrowRight, Package } from 'lucide-react';
import { useState } from 'react';

interface Props {
    product: Product;
}

export default function ProductCard({ product }: Props) {
    const [openQuickView, setOpenQuickView] = useState(false);

    const { post, processing } = useForm({
        id: product.id,
        quantity: 1,
    });

    function addToCart(event: React.FormEvent) {
        event.preventDefault();
        post(route('cart.add', { product: product.id }), {
            preserveState: true,
            preserveScroll: true,
        });
    }

    return (
        <>
            <Link href={route('products.show', { id: product.id })} className="">
                <Card className="flex-shrink-0 overflow-hidden pt-0 transition-all hover:shadow-lg dark:hover:shadow-neutral-900/50">
                    <div className="aspect-square overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                        {product?.custom?.url_imagen ? (
                            <Image
                                src={product?.custom?.url_imagen}
                                alt={product.name}
                                className="h-full w-full object-cover transition-transform hover:scale-110"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center">
                                <Package className="h-12 w-12 text-neutral-400" />
                            </div>
                        )}
                    </div>
                    <CardHeader className="pb-3">
                        {product.category && (
                            <Badge variant="secondary" className="w-fit bg-blue-200 text-xs">
                                {product.category}
                            </Badge>
                        )}
                        <CardTitle className="line-clamp-2 text-base">{product.part_number}</CardTitle>
                        <CardDescription className="line-clamp-2">{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{formatCurrency(product.price)}</p>
                            <Button size="sm" variant="ghost">
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </Link>

            <ProductQuickView
                product={product}
                open={openQuickView}
                onOpenChange={setOpenQuickView}
                handleAddToCart={addToCart}
                processing={processing}
            />
        </>
    );
}
