import { Image } from '@/components/image';
import ProductQuickView from '@/components/products/product-quick-view';
import { Button } from '@/components/ui/button';
import { cn, formatCurrency } from '@/lib/utils';
import type { Product } from '@/types';
import { Link, useForm } from '@inertiajs/react';
import { Eye } from 'lucide-react';
import { useState } from 'react';

interface Props {
    product: Product;
    className?: string;
}

export default function ProductCard({ product, className }: Props) {
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
                <div
                    className={cn(
                        'group relative h-[254px] w-full overflow-hidden rounded-[10px] bg-neutral-50 p-2 transition-all duration-300 dark:bg-neutral-800',
                        className,
                    )}
                >
                    <div className="flex h-fit w-full flex-col items-center justify-center gap-4">
                        <div className="flex h-[170px] w-full items-center justify-center text-[5em] font-black transition-all duration-300 group-hover:h-[120px]">
                            <Image
                                src={product?.custom?.url_imagen}
                                alt={product.part_number || product.name}
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className="flex h-fit w-full flex-col items-start justify-between overflow-hidden">
                            <p className="truncate text-[0.72em] font-medium text-neutral-600 uppercase dark:text-neutral-50">
                                {product.part_number}
                            </p>
                            <p className="text-[1em] font-bold text-neutral-600 uppercase dark:text-neutral-50">{formatCurrency(product.price)}</p>
                            <p></p>
                        </div>
                        <Button
                            className="mt-2.5 h-10 w-full cursor-pointer rounded-[40px] border-0 bg-neutral-900 font-medium text-white transition-all duration-300 group-hover:mt-0 hover:bg-lime-400 hover:text-neutral-900"
                            onClick={addToCart}
                            disabled={processing}
                            aria-label={`Agregar ${product.name} al carrito`}
                        >
                            Agregar al carrito
                        </Button>
                    </div>

                    {/* Mostrar ofertas o similar */}
                    <p className="rounded-4 absolute top-5 left-5 bg-lime-400 px-3 py-1.5 text-[0.75em] font-medium text-black">-50%</p>

                    {/* Boton Quick View */}
                    <Button
                        className="absolute top-5 right-5 !h-8 rounded-full bg-neutral-900 !py-0.5 text-white transition-all duration-300 hover:bg-lime-400 hover:text-neutral-900"
                        onClick={(e) => {
                            e.preventDefault();
                            setOpenQuickView(true);
                        }}
                        aria-label={`Vista rápida de ${product.name}`}
                        title={`Vista rápida de ${product.part_number}`}
                    >
                        <Eye className="h-4 w-4" />
                    </Button>
                </div>
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
