const PaypalCheckoutForm = () => {
  return (
    <div className="">
      <div className="flex items-center justify-between space-x-8 py-3">
        <div className="w-[45%]">
          <label
            htmlFor="name-icon"
            className="block mb-2 text-xl font-normal text-gray-900"
          >
            Email
          </label>

          <input
            autoComplete="off"
            type="email"
            id="email"
            className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
            placeholder="example@gmail.com"
          />
        </div>

        <div className="w-[25%]">
          <label
            htmlFor="name-icon"
            className="block mb-2 text-xl font-normal text-gray-900"
          >
            Country
          </label>

          <input
            autoComplete="off"
            type="email"
            id="email"
            className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
            placeholder="United States"
          />
        </div>

        <div className="w-[30%]">
          <label
            htmlFor="name-icon"
            className="block mb-2 text-xl font-normal text-gray-900"
          >
            Zip Code
          </label>

          <input
            autoComplete="off"
            type="email"
            id="email"
            className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
            placeholder="12345"
          />
        </div>
      </div>
      <div className="py-8 flex justify-center items-center mx-0">
        <button
          type="submit"
          className="text-white bg-primary hover:bg-[#be9837] font-medium rounded-lg text-lg px-5 py-3 w-[50%] "
        >
          Payment
        </button>
      </div>
    </div>
  );
};

export default PaypalCheckoutForm;
