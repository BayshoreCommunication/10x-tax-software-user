"use client";

import { ColorResult, HuePicker } from "react-color";

const ColorPicker = ({
  brandColor,
  setBusinessInfoForm,
}: {
  brandColor: string; // Adjust type as needed
  setBusinessInfoForm: React.Dispatch<
    React.SetStateAction<{
      image: any;
      businessName: any;
      businessWebsite: any;
      website: any;
      phone: any;
      address: any;
      brandColor: string; // Adjust type as needed
    }>
  >;
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
          onChange={(e) =>
            setBusinessInfoForm((prevState) => ({
              ...prevState,
              brandColor: e.target.value,
            }))
          }
          className="focus:outline-none w-[100px] border-none bg-white text-black"
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
