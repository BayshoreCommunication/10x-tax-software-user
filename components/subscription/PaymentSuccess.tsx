"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const PaymentSuccess = () => {
  const [counter, setCounter] = useState(3);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => {
        if (prevCounter <= 1) {
          clearInterval(interval);
        }
        return prevCounter - 1;
      });
    }, 1000);

    const timer = setTimeout(() => {
      router.push("/update-business-infomation");
    }, 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-[60vh] ">
      <div className="p-16 bg-gray-50 border w-[500px] h-[350px] rounded-md flex flex-col items-center justify-center">
        {/* Animated Checkmark Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -90, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 10,
            duration: 0.5,
          }}
          className="flex justify-center"
        >
          <IoMdCheckmarkCircleOutline className="size-20 text-green-600" />
        </motion.div>

        {/* Subscription Activated Text */}
        <h2 className="text-gray-700 font-medium text-xl text-center mt-6">
          Your subscription has been activated.
        </h2>
      </div>
    </div>
  );
};

export default PaymentSuccess;
