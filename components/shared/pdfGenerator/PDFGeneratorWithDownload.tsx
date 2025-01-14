"use client";

import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useState } from "react";
import { FaDownload } from "react-icons/fa";

const PDFGeneratorWithDownload = ({
  RenderComponent,
  title,
}: {
  RenderComponent: React.FC;
  title: string;
}) => {
  const [loading, setLoading] = useState(false);
  const captureAndGeneratePDF = async () => {
    setLoading(true);

    try {
      const element = document.querySelector(".page") as HTMLElement;
      if (!element) throw new Error("Target element not found");

      const canvas = await html2canvas(element, {
        scale: 0.8,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = 210;
      const pdfHeight = 297;
      const padding = 6;
      const contentWidth = pdfWidth - padding * 2;
      const contentHeight = pdfHeight - padding * 2;

      const imgWidth = contentWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const totalPages = Math.ceil(imgHeight / contentHeight);

      for (let page = 0; page < totalPages; page++) {
        const sourceY = page * (contentHeight * (canvas.height / imgHeight));
        const sectionCanvas = document.createElement("canvas");
        sectionCanvas.width = canvas.width;
        sectionCanvas.height = (contentHeight * canvas.height) / imgHeight;

        const sectionContext = sectionCanvas.getContext("2d");

        if (!sectionContext) {
          throw new Error("Failed to get 2D context from the canvas.");
        }

        sectionContext.fillStyle = "#ffffff";

        sectionContext.fillRect(
          0,
          0,
          sectionCanvas.width,
          sectionCanvas.height
        );

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

        const sectionImgData = sectionCanvas.toDataURL("image/jpeg", 0.7);

        pdf.addImage(
          sectionImgData,
          "JPEG",
          padding,
          padding,
          contentWidth,
          contentHeight,
          undefined,
          "FAST"
        );

        if (page < totalPages - 1) {
          pdf.addPage();
        }
      }

      const pdfDataUri = pdf.output("datauristring");
      console.log(
        `PDF Size: ${(pdfDataUri.length / 1024 / 1024).toFixed(2)} MB`
      );

      if (pdfDataUri.length <= 20 * 1024 * 1024) {
        pdf.save(`${title}.pdf`);
      } else {
        alert("PDF exceeds 20 MB size limit. Try optimizing further.");
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
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

export default PDFGeneratorWithDownload;
