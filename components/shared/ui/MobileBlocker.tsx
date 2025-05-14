"use client";
import { useEffect, useState } from "react";

const MobileBlocker = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Run on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Disable body scroll when mobile
  useEffect(() => {
    if (isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobile]);

  if (!isMobile) return null;

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-lg bg-black/70 flex items-center justify-center">
      <div className="bg-white rounded-xl px-6 text-center shadow-xl max-w-sm mx-auto py-20">
        <h2 className="text-lg font-semibold mb-2">Not Available on Mobile</h2>
        <p className="text-sm text-gray-600">
          This app is not available on mobile devices. Please use a laptop or
          desktop.
        </p>
      </div>
    </div>
  );
};

export default MobileBlocker;
