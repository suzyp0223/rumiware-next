"use client";

import { useState } from "react";

// ColorSelector 컴포넌트
const ColorSelector = ({ item }: { item: { color: string[] } }) => {
  const [selectedColor, setSelectedColor] = useState(item.color[0]);

  return (
    <div>
      <label htmlFor="item-color">
        <span>색상</span>
      </label>
      <div className="p-2 rounded mt-2" style={{ backgroundColor: selectedColor }}>
        <select
          id="item-color"
          className="border px-2 py-1 rounded"
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
        >
          {item.color.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ColorSelector;
