"use client";

import React from "react";
import { ColorResult, HuePicker } from "react-color";

const ColorPicker: React.FC = ({
  brandColor,
  setBusinessInfoForm,
}: {
  brandColor: any;
  setBrandColor: any;
}) => {
  const handleChange = (color: ColorResult): void => {
    setBusinessInfoForm((prevState) => ({
      ...prevState,
      brandColor: color.hex,
    }));
  };

  return (
    <div className="flex items-center space-x-5">
      <div className="border border-gray-300 flex items-center space-x-6 rounded p-3.5">
        <HuePicker color={brandColor} onChange={handleChange} />
      </div>

      <div className="border border-gray-300 flex items-center space-x-6 rounded p-2">
        <input
          type="text"
          value={brandColor}
          onChange={(e) => setBrandColor(e.target.value)}
          className="focus:outline-none w-[100px] border-none"
        />
        <div
          className="w-7 h-7 rounded mx-2"
          style={{
            backgroundColor: brandColor,
          }}
        />
      </div>
    </div>
  );
};

export default ColorPicker;
