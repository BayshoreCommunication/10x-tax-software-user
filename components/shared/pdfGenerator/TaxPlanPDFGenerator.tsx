"use client";

import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useState } from "react";
import { FaDownload } from "react-icons/fa";

const TaxPlanPDFGenerator = ({
  RenderComponent,
}: {
  RenderComponent: React.FC;
}) => {
  const [loading, setLoading] = useState(false);
  const captureAndGeneratePDF = async () => {
    setLoading(true);

    try {
      const element = document.querySelector(".page") as HTMLElement;
      if (!element) {
        throw new Error("Target element not found");
      }

      // Render the element to a canvas
      const canvas = await html2canvas(element, {
        scale: 2, // Enhance resolution
        useCORS: true, // Handle cross-origin
        backgroundColor: "#ffffff", // Ensure a white background
      });

      const pdf = new jsPDF("p", "mm", "a4");

      // Dimensions of A4 in mm
      const pdfWidth = 210; // Full width of A4
      const pdfHeight = 297; // Full height of A4

      // Define padding
      const padding = 6; // Padding in mm
      const contentWidth = pdfWidth - padding * 2; // Inner width
      const contentHeight = pdfHeight - padding * 2; // Inner height

      // Scale image dimensions to fit the padded area
      const imgWidth = contentWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Calculate the total number of pages
      const totalPages = Math.ceil(imgHeight / contentHeight);

      // Create and add pages
      for (let page = 0; page < totalPages; page++) {
        const sourceY = page * (contentHeight * (canvas.height / imgHeight)); // Slice starting Y-axis

        // Create a new canvas for the current section
        const sectionCanvas = document.createElement("canvas");
        sectionCanvas.width = canvas.width;
        sectionCanvas.height = (contentHeight * canvas.height) / imgHeight;

        const sectionContext = sectionCanvas.getContext("2d");
        sectionContext?.drawImage(
          canvas,
          0,
          sourceY,
          canvas.width,
          sectionCanvas.height,
          0,
          0,
          sectionCanvas.width,
          sectionCanvas.height
        );

        const sectionImgData = sectionCanvas.toDataURL("image/png");

        pdf.addImage(
          sectionImgData,
          "PNG",
          padding, // X-axis start point for padding
          padding, // Y-axis start point for padding
          contentWidth, // Inner content width
          contentHeight // Inner content height
        );

        if (page < totalPages - 1) {
          pdf.addPage(); // Add a new page for subsequent content
        }
      }

      pdf.save("padded-multi-page.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      {/* Hidden Component */}
      <div className="page fixed top-0 left-0  pointer-events-none -z-50 ">
        <RenderComponent />
      </div>

      {/* Download Button */}
      <button
        onClick={captureAndGeneratePDF}
        className={`flex items-center space-x-3 mt-3 text-lg justify-start hover:text-primary duration-300 font-medium  ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        <p>{loading ? "Processing..." : "Download PDF"}</p>
        <FaDownload />
      </button>
    </div>
  );
};

export default TaxPlanPDFGenerator;
