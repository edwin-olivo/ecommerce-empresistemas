import { CheckboxOption } from '@/types';
import React from 'react';

interface CategoryFilterProps {
    defaultCategories?: CheckboxOption;
    selectedCategories?: string[];
    onCategoryChange?: (categories: string[]) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ defaultCategories = {}, selectedCategories = [], onCategoryChange }) => {
    const handleCategoryToggle = (categoryKey: string) => {
        if (!onCategoryChange) return;
        const updatedCategories = selectedCategories.includes(categoryKey)
            ? selectedCategories.filter((c) => c !== categoryKey)
            : [...selectedCategories, categoryKey];
        onCategoryChange(updatedCategories);
    };

    const uid = Math.random().toString(36).substring(2, 15);

    return (
        <div className="flex flex-col gap-2">
            {Object.entries(defaultCategories).map(([key, label]) => (
                <label key={`${uid}-${key}`} className="flex cursor-pointer items-center gap-3 text-sm">
                    <input
                        type="checkbox"
                        checked={selectedCategories.includes(key)}
                        onChange={() => handleCategoryToggle(key)}
                        className="h-4 w-4 cursor-pointer appearance-none border-2 border-black checked:bg-black dark:border-neutral-500 dark:checked:bg-neutral-500"
                    />
                    {label === '' ? 'N/A' : label}
                </label>
            ))}
        </div>
    );
};

export default CategoryFilter;
