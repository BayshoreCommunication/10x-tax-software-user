import Image from "next/image";

const GeneratePlan = () => {
  return (
    <div className="container  py-10">
      <div className="bg-white">
        <Image
          src="/assets/test-image/tax-pro-gen-form.jpg"
          alt="User Picture"
          width={1200}
          height={700}
          className="w-full h-auto"
        />
      </div>
    </div>
  );
};

export default GeneratePlan;
