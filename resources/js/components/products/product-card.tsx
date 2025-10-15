import { Button } from '@/components/ui/button';
import type { Product } from '@/types';
import { useForm } from '@inertiajs/react';

interface Props {
    product: Product;
}

function ProductCard({ product }: Props) {
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

    const imageSrc =
        typeof product?.custom?.url_imagen === 'string' && product?.custom?.url_imagen.trim() !== ''
            ? product?.custom?.url_imagen
            : 'https://placehold.co/600x400';

    return (
        <div className="group relative h-[254px] w-full overflow-hidden rounded-[10px] bg-neutral-100 p-[15px] transition-all duration-300 dark:bg-neutral-800">
            <div className="flex h-fit w-full flex-col items-center justify-center gap-[15px]">
                <div className="flex h-[170px] w-full items-center justify-center text-[5em] font-black transition-all duration-300 group-hover:h-[120px]">
                    <img src={imageSrc} alt={product.name} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <div className="flex h-fit w-full flex-col items-start justify-between overflow-hidden">
                    <p className="truncate text-[0.72em] font-medium text-neutral-600 uppercase dark:text-neutral-50">{product.part_number}</p>
                    <p className="text-[1em] font-bold text-neutral-600 uppercase dark:text-neutral-50">$ {product.price}</p>
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
            <p className="absolute top-5 left-5 rounded-[15px] bg-lime-400 px-3 py-1.5 text-[0.75em] font-medium text-black">-50%</p>
        </div>
    );
}

export default ProductCard;
