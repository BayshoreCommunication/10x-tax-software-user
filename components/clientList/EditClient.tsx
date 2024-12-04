import Image from "next/image";

const EditClient = () => {
  return (
    <div className="container  py-10">
      <div className="bg-white">
        <Image
          src="/assets/test-image/client-edit.jpg"
          alt="User Picture"
          width={1200}
          height={700}
          className="w-full h-auto"
        />
      </div>
    </div>
  );
};

export default EditClient;
