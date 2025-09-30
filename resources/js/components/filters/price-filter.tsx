import * as Slider from '@radix-ui/react-slider';
import React from 'react';

interface PriceFilterProps {
    minPrice: number;
    maxPrice: number;
    onPriceChange: (priceRange: [number, number]) => void;
    priceRange: {
        min: number;
        max: number;
    };
}

const PriceFilter: React.FC<PriceFilterProps> = ({ minPrice, maxPrice, onPriceChange, priceRange }) => {
    const handlePriceChange = (value: [number, number]) => {
        const newPriceRange = value;
        if (onPriceChange) {
            onPriceChange(newPriceRange);
        }
    };

    return (
        <div className="flex flex-col gap-3">
            <div className="flex justify-between">
                <label htmlFor="price" className="font-bold">
                    Min: ${minPrice}
                </label>
                <label htmlFor="price" className="font-bold">
                    Max: ${maxPrice}
                </label>
            </div>

            <Slider.Root
                className="relative flex w-full touch-none items-center select-none"
                min={priceRange.min}
                max={priceRange.max}
                step={100}
                defaultValue={[0, maxPrice]}
                onValueChange={handlePriceChange}
            >
                <Slider.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
                    <Slider.Range className="absolute h-full bg-primary" />
                </Slider.Track>
                <Slider.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50" />
                <Slider.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50" />
            </Slider.Root>

            <div className="flex justify-between text-sm text-neutral-600">
                <span>${priceRange.min}</span>
                <span>${priceRange.max}</span>
            </div>
        </div>
    );
};

export default PriceFilter;
