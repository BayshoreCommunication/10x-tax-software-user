"use client";

import React from "react";
import { HuePicker } from "react-color";

const ColorPickerView: React.FC<{ brandColor: string }> = ({ brandColor }) => {
  return (
    <div className="flex items-center space-x-5 ">
      <div className="border border-gray-300 flex items-center space-x-6 rounded p-3.5">
        <HuePicker color={brandColor} />
      </div>

      <div className="border border-gray-300 flex items-center space-x-6 rounded p-2 ">
        <input
          type="text"
          value={brandColor}
          readOnly
          className="focus:outline-none w-[100px] border-none bg-white text-black"
        />
        <div
          className="w-7 h-7 rounded mx-2 "
          style={{
            backgroundColor: brandColor,
          }}
        />
      </div>
    </div>
  );
};

export default ColorPickerView;
