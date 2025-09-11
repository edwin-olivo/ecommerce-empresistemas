import React from 'react';

interface CategoryFilterProps {
  defaultCategories?: string[];
  selectedCategories?: string[];
  onCategoryChange?: (categories: string[]) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  defaultCategories = [],
  selectedCategories = [],
  onCategoryChange
}) => {
  const handleCategoryToggle = (category: string) => {
    if (!onCategoryChange) return;
    const updatedCategories = selectedCategories.includes(category) ? selectedCategories.filter(c => c !== category) : [...selectedCategories, category];
    onCategoryChange(updatedCategories);
  };

  return (
    <div className="border-b-4 border-black pb-6 mb-6">
      <h3 className="text-xl font-extrabold uppercase mb-4">Categoría</h3>
      <div className="flex flex-col gap-2">
        {defaultCategories.map((category) => (
          <label key={category} className="flex items-center gap-3 text-lg cursor-pointer">
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
    </div>
  );
};

export default CategoryFilter;