import type { Product } from '@/types';

interface Props {
    product: Product;
}

function ProductCard({ product }: Props) {
    const getStatusBadgeVariant = (status: string) => {
        switch (status) {
            case 'En Stock':
                return 'default';
            case 'Pocas Unidades':
                return 'secondary';
            case 'Agotado':
                return 'destructive';
            default:
                return 'outline';
        }
    };

    const imageSrc =
        typeof product?.custom?.url_imagen === 'string' && product?.custom?.url_imagen.trim() !== ''
            ? product?.custom?.url_imagen
            : 'https://placehold.co/600x400';

    return (
        <div className="group relative h-[254px] w-full overflow-hidden rounded-[10px] bg-white p-[15px] transition-all duration-[0.3s] hover:bg-white">
            <div className="flex h-fit w-full flex-col items-center justify-center gap-[15px]">
                <div className="flex h-[170px] w-full items-center justify-center text-[5em] font-black transition-all duration-[0.3s] group-hover:h-[120px]">
                    <img src={imageSrc} alt={product.name} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <div className="flex h-fit w-full flex-col items-start justify-between overflow-hidden">
                    <p className="truncate text-[0.72em] font-medium text-neutral-600 uppercase">{product.part_number}</p>
                    <p className="text-[1em] font-bold text-neutral-600 uppercase">$ {product.price}</p>
                    <p></p>
                </div>
                <button className="mt-2.5 h-10 w-full cursor-pointer rounded-[40px] border-0 bg-[rgb(24,24,24)] font-medium text-white transition-all duration-[0.3s] group-hover:mt-0 hover:bg-[greenyellow] hover:text-[rgb(35,35,35)]">
                    Agregar al carrito
                </button>
            </div>
            <p className="absolute top-5 left-5 rounded-[15px] bg-[greenyellow] px-3 py-1.5 text-[0.75em] font-medium text-black">-50%</p>
        </div>
    );
}

export default ProductCard;
