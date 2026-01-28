type ProductCardModernProps = {
    imageUrl: string;
    imageAlt?: string;
    isNew?: boolean;
    isBestSeller?: boolean;
    isOnSale?: boolean;
    title: string;
    rating?: number;
    ratingCount?: number;
    price: string | number;
    onView?: () => void;
    onFavorite?: () => void;
    onAddToCart?: () => void;
};

function ProductCardModern({
    imageUrl,
    imageAlt = '',
    isNew = false,
    isBestSeller = false,
    isOnSale = false,
    title,
    rating = 0,
    ratingCount = 0,
    price,
    onView,
    onFavorite,
    onAddToCart,
}: ProductCardModernProps) {
    // Helper to render stars
    const renderStars = () => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const stars = [];
        for (let i = 0; i < fullStars; i++) {
            stars.push(<i key={i} className="ri-star-fill"></i>);
        }
        if (halfStar) {
            stars.push(<i key="half" className="ri-star-half-fill"></i>);
        }
        while (stars.length < 5) {
            stars.push(<i key={`empty-${stars.length}`} className="ri-star-line"></i>);
        }
        return stars;
    };

    return (
        <div className="group">
            <div className="relative mb-4 overflow-hidden rounded-lg">
                {isNew && <span className="absolute top-3 left-3 rounded bg-primary px-2 py-1 text-xs text-white">New</span>}
                {isBestSeller && <span className="absolute top-3 left-3 rounded bg-amber-500 px-2 py-1 text-xs text-white">Best Seller</span>}
                {isOnSale && <span className="absolute top-3 left-3 rounded bg-rose-500 px-2 py-1 text-xs text-white">Sale</span>}
                <img src={imageUrl} alt={imageAlt} className="h-80 w-full object-cover object-top" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                        className="mx-1 flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-900 shadow-md transition hover:bg-gray-100"
                        onClick={onView}
                        type="button"
                    >
                        <i className="ri-eye-line"></i>
                    </button>
                    <button
                        className="mx-1 flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-900 shadow-md transition hover:bg-gray-100"
                        onClick={onFavorite}
                        type="button"
                    >
                        <i className="ri-heart-line"></i>
                    </button>
                    <button
                        className="mx-1 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white shadow-md transition hover:bg-primary/90"
                        onClick={onAddToCart}
                        type="button"
                    >
                        <i className="ri-shopping-bag-line"></i>
                    </button>
                </div>
            </div>
            <div>
                <h3 className="mb-1 font-medium text-gray-900">{title}</h3>
                <div className="mb-1 flex items-center">
                    <div className="flex text-sm text-amber-400">{renderStars()}</div>
                    <span className="ml-1 text-xs text-gray-500">({ratingCount})</span>
                </div>
                <p className="font-medium text-gray-900">${price}</p>
            </div>
        </div>
    );
}

export default ProductCardModern;
