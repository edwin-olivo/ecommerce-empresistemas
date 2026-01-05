import { Image } from '@/components/image';
import ProductQuickView from '@/components/products/product-quick-view';
import { Button } from '@/components/ui/button';
import WishlistSelectDialog from '@/components/whislists/wishlist-select-dialog';
import { cn, formatCurrency } from '@/lib/utils';
import type { Product, SharedData, Wishlist } from '@/types';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Eye, Heart, HeartOff } from 'lucide-react';
import { useState } from 'react';

interface Props {
    product: Product;
    className?: string;
    wishlists?: Wishlist[] | [];
}

export default function ProductCard({ product, className, wishlists = [] }: Props) {
    const { auth } = usePage<SharedData>().props;
    const [openQuickView, setOpenQuickView] = useState(false);
    const [openWishlistDialog, setOpenWishlistDialog] = useState(false);

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

    function toggleWishlist(event: React.FormEvent, wishlistId: string) {
        event.preventDefault();
        if (product.is_in_wishlist) {
            post(route('wishlist.remove-product', { product: product.id, wishlist: wishlistId }), {
                preserveState: true,
                preserveScroll: true,
            });
        } else {
            post(route('wishlist.add-product', { product: product.id, wishlist: wishlistId }), {
                preserveState: true,
                preserveScroll: true,
            });
        }
    }

    function handleWishlistSelect(wishlist: Wishlist) {
        toggleWishlist(new Event('submit') as any, wishlist.id);
    }

    const wishlistAriaLabel = product.is_in_wishlist
        ? `Eliminar ${product.name} de la lista de deseos`
        : `Agregar ${product.name} a la lista de deseos`;
    const wishlistTitle = product.is_in_wishlist
        ? `Eliminar ${product.part_number} de la lista de deseos`
        : `Agregar ${product.part_number} a la lista de deseos`;

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
                            <Image src={product.url_imagen} alt={product.part_number || product.name} className="h-full w-full object-cover" />
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
                    {/* <p className="rounded-4 absolute top-5 left-5 bg-lime-400 px-3 py-1.5 text-[0.75em] font-medium text-black">-50%</p> */}

                    {/* Boton Wishlist */}
                    {auth?.user && (
                        <Button
                            className="absolute top-5 right-16 !h-8 rounded-full bg-white !py-0.5 text-neutral-900 transition-all duration-300 hover:bg-lime-400 hover:text-neutral-900"
                            onClick={(e) => {
                                e.preventDefault();
                                setOpenWishlistDialog(true);
                            }}
                            aria-label={wishlistAriaLabel}
                            title={wishlistTitle}
                        >
                            {product.is_in_wishlist ? (
                                <HeartOff className="h-4 w-4 stroke-current text-red-500" />
                            ) : (
                                <Heart className="h-4 w-4 stroke-current" />
                            )}
                        </Button>
                    )}

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

            {auth?.user && (
                <WishlistSelectDialog
                    open={openWishlistDialog}
                    onOpenChange={setOpenWishlistDialog}
                    onSelectWishlist={handleWishlistSelect}
                    productName={product.part_number || product.name}
                    processing={processing}
                />
            )}
        </>
    );
}
