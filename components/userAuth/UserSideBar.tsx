import Image from "next/image";

const UserSideBar = ({ title }: any) => {
  return (
    <div className="bg-secondary p-10 rounded-s-xl space-y-12">
      <Image
        src="/assets/site-logo/10x-tax-logo.png"
        alt="10x Tax Software"
        width={500}
        height={500}
        className="w-[100px] h-auto"
      />
      <div className="text-white space-y-4">
        <h2 className="font-bold text-4xl">{title}</h2>
        <p className="font-normal text-base">
          Welcome Back! Ready to dive into your personalized experience? Login
          to pick up where you left off and explore new possibilities.
        </p>
      </div>
      <div className="flex justify-center">
        <Image
          src="/assets/user-image/home-welcome-image.png"
          alt="10x Tax Software"
          width={500}
          height={500}
          className="w-[354px] h-auto"
        />
      </div>
    </div>
  );
};

export default UserSideBar;
