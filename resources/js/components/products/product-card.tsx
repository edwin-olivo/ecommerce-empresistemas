import type { Product } from '@/types';

interface Props {
    product: Product;
}

const ProductCard = ({ product }: Props) => {
    return (
        <div className="group cursor-pointer bg-neutral-50 p-4 shadow-lg">
            <div className="overflow-hidden border-4 border-black">
                <img
                    src={product.custom?.url_imagen ?? 'https://placehold.co/600x400'}
                    alt={product.part_number}
                    className="h-80 w-full transform object-cover transition-transform duration-300 group-hover:scale-110"
                />
            </div>
            <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-lg font-bold uppercase">{product.part_number}</h3>
                    <p className="text-sm text-neutral-600">{product.name}</p>
                </div>
                <p className="text-lg font-extrabold">${product.price.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default ProductCard;
