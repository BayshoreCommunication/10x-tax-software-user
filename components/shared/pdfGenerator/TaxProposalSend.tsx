"use client";

import { taxProposalSend } from "@/app/actions/client";
import html2canvas from "html2canvas";
import { useState } from "react";
import { IoSend } from "react-icons/io5";
import { toast } from "react-toastify";

const TaxProposalSend = ({
  RenderComponent,
}: {
  RenderComponent: React.FC;
}) => {
  const [loading, setLoading] = useState(false);

  const captureAndSendImage = async () => {
    setLoading(true);

    try {
      const element = document.querySelector(".page") as HTMLElement;
      if (!element) throw new Error("Target element not found");

      // Use html2canvas to capture the element as a canvas
      const canvas = await html2canvas(element, {
        scale: 0.8,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      // Convert the canvas to a JPEG data URL
      const imageData = canvas.toDataURL("image/jpeg", 0.8);

      // Check if the image size exceeds the limit
      if (imageData.length > 20 * 1024 * 1024) {
        toast.error("Image exceeds 20 MB size limit. Try optimizing further.");
        return;
      }

      // Prepare the FormData object
      const formData = new FormData();
      formData.append("image", imageData);
      // formData.append("clientName", "AR Sahaka");
      // formData.append("email", "arsahak.bayshore@gmail.com");

      // Send the data using taxProposalSend
      const response = await taxProposalSend(formData);

      if (response.ok) {
        toast.success("Proposal sent successfully!");
        console.log("Image sent successfully!");
      } else {
        throw new Error(
          "Failed to send the proposal. Server responded with an error."
        );
      }
    } catch (error) {
      console.error("Error capturing and sending image:", error);
      toast.error(
        "An error occurred while sending the proposal. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <div className="page fixed top-0 left-0  pointer-events-none -z-50 w-[1536px] h-auto">
        <RenderComponent />
      </div>

      <button
        onClick={captureAndSendImage}
        className={`flex items-center space-x-2 mt-3 text-lg justify-start hover:text-primary duration-300 font-medium  ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        <IoSend />
        <p>{loading ? "Sending..." : "Send"}</p>
      </button>
    </div>
  );
};

export default TaxProposalSend;
