"use client";

import React, { useState } from "react";
import { HuePicker, ColorResult } from "react-color"; // Importing the required type

const ColorPicker: React.FC = () => {
  const [color, setColor] = useState<string>("#ff0000"); // Default color with type

  const handleChange = (color: ColorResult): void => {
    setColor(color.hex); // Update color state with the hex value
  };

  return (
    <div className="flex items-center space-x-5">
      {/* Hue Picker */}
      <div className="border border-gray-300 flex items-center space-x-6 rounded p-3.5">
        <HuePicker color={color} onChange={handleChange} />
      </div>

      {/* Input Field and Color Preview */}
      <div className="border border-gray-300 flex items-center space-x-6 rounded p-2">
        <input
          type="text"
          value={color}
          onChange={(e) => setColor(e.target.value)} // Update color state from input
          className="focus:outline-none w-[100px] border-none"
        />
        <div
          className="w-7 h-7 rounded mx-2"
          style={{
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
};

export default ColorPicker;
