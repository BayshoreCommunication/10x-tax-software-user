"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NotFound() {
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
      router.push("/");
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-white">
      <div className="">
        <h1 className="text-4xl font-bold  text-center">
          401 - Page Not Found
        </h1>
        <p className="text-lg mt-4 text-center">
          {`Redirecting to the home page in ${counter} seconds...`}
        </p>
      </div>
    </div>
  );
}
