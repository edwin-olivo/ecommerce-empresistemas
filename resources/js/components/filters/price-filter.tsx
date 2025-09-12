import React from 'react';

interface PriceFilterProps {
    maxPrice?: number;
    onPriceChange?: (maxPrice: number) => void;
    priceRange?: {
        min: number;
        max: number;
    };
}

const PriceFilter: React.FC<PriceFilterProps> = ({ maxPrice = 5000, onPriceChange, priceRange = { min: 0, max: 5000 } }) => {
    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newPrice = parseInt(event.target.value);
        if (onPriceChange) {
            onPriceChange(newPrice);
        }
    };

    return (
        <div className="flex flex-col gap-3">
            <label htmlFor="price" className="font-bold">
                Max: ${maxPrice.toLocaleString()}
            </label>
            <input
                type="range"
                id="price"
                min={priceRange.min}
                max={priceRange.max}
                value={maxPrice}
                onChange={handlePriceChange}
                className="h-2 w-full appearance-none bg-neutral-300"
                style={
                    {
                        '--thumb-color': 'black',
                        '--thumb-size': '20px',
                        '--track-color': '#d4d4d4',
                    } as React.CSSProperties
                }
            />
            <div className="flex justify-between text-sm text-neutral-600">
                <span>${priceRange.min}</span>
                <span>${priceRange.max.toLocaleString()}</span>
            </div>
        </div>
    );
};

export default PriceFilter;
