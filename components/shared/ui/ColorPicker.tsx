"use client";
import React, { useState } from "react";
import { HuePicker } from "react-color";

const ColorPicker = () => {
  const [color, setColor] = useState("#ff0000"); // Default color

  const handleChange = (color) => {
    setColor(color.hex); // Update color state
  };

  return (
    <div className="flex items-center space-x-5">
      <div className="border border-gray-300 flex items-center space-x-6 rounded p-3.5">
        <HuePicker color={color} onChange={handleChange} />
      </div>

      <div className="border border-gray-300 flex items-center space-x-6 rounded p-2">
        <input
          type="text"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          style={{ width: "100px", outline: "none", border: "none" }}
          className="focus:outline-none"
        />

        <div
          className="size-7 rounded mx-2"
          style={{
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
};

export default ColorPicker;
