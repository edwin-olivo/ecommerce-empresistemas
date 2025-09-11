import React from 'react';
import type { Color } from '../../types';

interface ColorFilterProps {
  defaultColors?: Color[];
  selectedColors?: string[];
  onColorChange?: (colors: string[]) => void;
}

const ColorFilter: React.FC<ColorFilterProps> = ({
  defaultColors = [],
  selectedColors = [],
  onColorChange
}) => {
  const handleColorToggle = (colorName: string) => {
    if (!onColorChange) return;
    const updatedColors = selectedColors.includes(colorName) ? selectedColors.filter(c => c !== colorName) : [...selectedColors, colorName];
    onColorChange(updatedColors);
  };

  return (
    <div>
      <h3 className="text-xl font-extrabold uppercase mb-4">Color</h3>
      <div className="flex flex-wrap gap-3">
        {defaultColors.map((color) => (
          <button
            key={color.name}
            title={color.name}
            onClick={() => handleColorToggle(color.name)}
            className={`w-8 h-8 border-2 border-black cursor-pointer focus:outline-none focus:ring-4 focus:ring-yellow-400 ${selectedColors.includes(color.name) ? 'ring-4 ring-yellow-400' : ''}`}
            style={{ backgroundColor: color.value.toLowerCase() }}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorFilter;