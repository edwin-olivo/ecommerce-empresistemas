import React from 'react';

interface CategoryFilterProps {
    defaultCategories?: string[];
    selectedCategories?: string[];
    onCategoryChange?: (categories: string[]) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ defaultCategories = [], selectedCategories = [], onCategoryChange }) => {
    const handleCategoryToggle = (category: string) => {
        if (!onCategoryChange) return;
        const updatedCategories = selectedCategories.includes(category)
            ? selectedCategories.filter((c) => c !== category)
            : [...selectedCategories, category];
        onCategoryChange(updatedCategories);
    };

    return (
        <div className="flex flex-col gap-2">
            {defaultCategories.map((category) => (
                <label key={category} className="flex cursor-pointer items-center gap-3 text-lg">
                    <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryToggle(category)}
                        className="h-6 w-6 appearance-none border-2 border-black checked:bg-black"
                    />
                    {category}
                </label>
            ))}
        </div>
    );
};

export default CategoryFilter;
