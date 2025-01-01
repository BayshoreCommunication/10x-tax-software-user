const GeneratePlanView = () => {
  return (
    <div className="">
      <div className="flex justify-between items-start space-x-4">
        <div className="w-[30%] bg-secondary p-5">
          <h2 className="text-2xl font-bold text-white text-left">
            Tax Generator
          </h2>
        </div>
        <div className="w-[70%] border border-secondary p-5">
          <h2 className="text-2xl font-bold text-secondary text-left">
            Tax Plan
          </h2>
        </div>
      </div>
    </div>
  );
};

export default GeneratePlanView;
