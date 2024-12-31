import Image from "next/image";

const UserSideBar = ({ title }: { title: string }) => {
  return (
    <div className="bg-secondary p-10 rounded-s-xl space-y-12">
      {/* Logo Image with optimization */}
      <Image
        src="/assets/site-logo/10x-tax.png"
        alt="10x Tax Software"
        width={100} // Set width and height for better control
        height={100}
        className="w-[100px] h-[100px] object-contain"
        quality={100}
        priority // This ensures it loads first if it's above the fold
      />

      {/* Text content */}
      <div className="text-white space-y-4">
        <h2 className="font-bold text-4xl">{title}</h2>
        <p className="font-normal text-base">
          Welcome Back! Ready to dive into your personalized experience? Login
          to pick up where you left off and explore new possibilities.
        </p>
      </div>

      <div className="flex justify-center">
        <Image
          src="/assets/user-image/welcome-image.png"
          alt="User Welcome"
          width={550}
          height={500}
          className="w-full xl:max-w-[354px] h-[280px] xl:h-[300px] 2xl:h-[320px]"
          quality={85}
          priority
          // placeholder="blur"
          // blurDataURL="/assets/user-image/welcome-image-blur.png"
        />
      </div>
    </div>
  );
};

export default UserSideBar;
