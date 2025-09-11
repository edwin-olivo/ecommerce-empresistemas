import type { Product } from '@/types';

interface Props {
    product: Product;
}

const ProductCard = ({ product }: Props) => {
    return (
        <div className="group">
            <div className="border-4 border-black overflow-hidden">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-80 object-cover transform transition-transform duration-300 group-hover:scale-110"
                />
            </div>
            <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-lg font-bold uppercase">{product.name}</h3>
                    <p className="text-sm text-neutral-600">{product.category}</p>
                </div>
                <p className="text-lg font-extrabold">${product.price.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default ProductCard;