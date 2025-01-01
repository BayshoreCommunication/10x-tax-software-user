import Link from "next/link";

const Strategy = () => {
  return (
    <div>
      <div>
        <h3 className="text-xl font-semibold mt-3">Maximize Deductions</h3>
        <div className="flex items-center space-x-6 py-3">
          <div className="w-full">
            <label
              htmlFor="name-icon"
              className="block mb-2 text-lg font-normal text-gray-900"
            >
              Home Office<span className="text-primary">*</span>
            </label>

            <input
              autoComplete="off"
              type="text"
              id="email-address-icon"
              className="bg-[#eeeeee] border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
              placeholder="$"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="name-icon"
              className="block mb-2 text-lg font-normal text-gray-900"
            >
              Depreciation<span className="text-primary">*</span>
            </label>

            <input
              autoComplete="off"
              type="text"
              id="email-address-icon"
              className="bg-[#eeeeee] border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
              placeholder="$"
            />
          </div>
        </div>
        <div className="flex items-center space-x-6 py-3">
          <div className="w-full">
            <label
              htmlFor="name-icon"
              className="block mb-2 text-lg font-normal text-gray-900"
            >
              Travel<span className="text-primary">*</span>
            </label>

            <input
              autoComplete="off"
              type="text"
              id="email-address-icon"
              className="bg-[#eeeeee] border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
              placeholder="$"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="name-icon"
              className="block mb-2 text-lg font-normal text-gray-900"
            >
              Meals<span className="text-primary">*</span>
            </label>

            <input
              autoComplete="off"
              type="text"
              id="email-address-icon"
              className="bg-[#eeeeee] border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
              placeholder="$"
            />
          </div>
        </div>
        <div className="flex items-center space-x-6 py-3">
          <div className="w-[49%]">
            <label
              htmlFor="name-icon"
              className="block mb-2 text-lg font-normal text-gray-900"
            >
              Hiring Children<span className="text-primary">*</span>
            </label>

            <input
              autoComplete="off"
              type="text"
              id="email-address-icon"
              className="bg-[#eeeeee] border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
              placeholder="$"
            />
          </div>
        </div>
        <h3 className="text-xl font-semibold mt-4 mb-1">Entry Structuring</h3>
        <div className="flex items-center space-x-6 py-3">
          <div className="w-[49%]">
            <label
              htmlFor="name-icon"
              className="block mb-2 text-lg font-normal text-gray-900"
            >
              Hiring Children<span className="text-primary">*</span>
            </label>

            <input
              autoComplete="off"
              type="text"
              id="email-address-icon"
              className="bg-[#eeeeee] border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
              placeholder="$"
            />
          </div>
        </div>
        <h3 className="text-xl font-semibold mt-4 mb-1">Entry Structuring</h3>
        <div className="flex items-center space-x-6 py-3">
          <div className="w-[49%]">
            <label
              htmlFor="name-icon"
              className="block mb-2 text-lg font-normal text-gray-900"
            >
              Schedule C to S Corp<span className="text-primary">*</span>
            </label>

            <input
              autoComplete="off"
              type="text"
              id="email-address-icon"
              className="bg-[#eeeeee] border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
              placeholder="$"
            />
          </div>
        </div>
        <h3 className="text-xl font-semibold mt-4 mb-1">Niche</h3>
        <div className="flex items-center space-x-6 py-3">
          <div className="w-[49%]">
            <label
              htmlFor="name-icon"
              className="block mb-2 text-lg font-normal text-gray-900"
            >
              Cost Segregation
              <span className="text-primary">*</span>
            </label>

            <input
              autoComplete="off"
              type="text"
              id="email-address-icon"
              className="bg-[#eeeeee] border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
              placeholder="$"
            />
          </div>
        </div>
        <h3 className="text-xl font-semibold mt-4 mb-1">Advanced Strategies</h3>
        <div className="flex items-center space-x-6 py-3">
          <div className="w-[49%]">
            <label
              htmlFor="name-icon"
              className="block mb-2 text-lg font-normal text-gray-900"
            >
              Rent home to corporation (Augusta)
              <span className="text-primary">*</span>
            </label>

            <input
              autoComplete="off"
              type="text"
              id="email-address-icon"
              className="bg-[#eeeeee] border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
              placeholder="$"
            />
          </div>
        </div>
        <div className="w-full flex items-center  justify-center mt-10 space-x-6">
          <Link
            href={"/"}
            className="px-4 py-2  text-white rounded-md font-medium text-lg bg-primary hover:bg-hoverColor hover:text-white w-[120px] text-center"
          >
            Back
          </Link>
          <Link
            href={"/"}
            className="px-4 py-2  text-white rounded-md font-medium text-lg bg-primary hover:bg-hoverColor hover:text-white w-[120px] text-center"
          >
            Next
          </Link>
          <Link
            href={"/"}
            className="px-4 py-2  text-white rounded-md font-medium text-lg bg-secondary hover:bg-[#0d121c] hover:text-white w-[120px] text-center"
          >
            Save
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Strategy;
