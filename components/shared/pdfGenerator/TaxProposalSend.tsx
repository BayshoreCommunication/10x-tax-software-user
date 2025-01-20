"use client";
import { taxProposalSend } from "@/app/actions/client";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useState } from "react";
import { IoSend } from "react-icons/io5";
import { toast } from "react-toastify";

const TaxProposalSend = ({
  RenderComponent,
  clientName,
  email,
  cleintId,
}: {
  RenderComponent: React.FC;
  clientName: string;
  email: string;
  cleintId: string;
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

        sectionContext.drawImage(
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

      const pdfBlob = pdf.output("blob");
      const pdfDataUri = URL.createObjectURL(pdfBlob);
      console.log(`PDF Size: ${(pdfBlob.size / 1024 / 1024).toFixed(2)} MB`);

      // Check file size and either save or upload
      if (pdfBlob.size <= 20 * 1024 * 1024) {
        console.log("PDF is within size limits");
      } else {
        alert("PDF exceeds 20 MB size limit. Try optimizing further.");
        return;
      }

      // Prepare form data to send
      const formData = new FormData();
      formData.append("file", pdfBlob, "tax-proposal.pdf");
      formData.append("email", email);
      formData.append("clientName", clientName);
      formData.append("clientId", cleintId);

      const result = await taxProposalSend(formData);

      if (result?.ok) {
        toast.success("Proposal successfully sent!");
      } else {
        const errorMessage = result?.error || "Failed to send PDF.";
        toast.error(errorMessage);
        console.log("check error", errorMessage);
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("An error occurred while generating the PDF.");
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

// "use client";

// import { taxProposalSend } from "@/app/actions/client";
// import React, { useState } from "react";

// const TaxProposalSend: React.FC = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [message, setMessage] = useState<string>("");

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files.length > 0) {
//       setFile(event.target.files[0]); // Update state with selected file
//     }
//   };

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     if (!file) {
//       setMessage("Please select a file to upload.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("email", "arsahak.bayshore@gmail.com");
//     formData.append("clientName", "Abu Kawsar");

//     try {
//       const result = await taxProposalSend(formData);

//       if (result.ok) {
//         setMessage("File uploaded successfully!");
//       } else {
//         setMessage(result.error);
//       }
//     } catch (error: any) {
//       console.error("Error uploading file:", error);
//       setMessage("An error occurred while uploading the file.");
//     }
//   };

//   return (
//     <div className="file-upload-container">
//       <h2>Upload a File</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="fileInput">Choose a file:</label>
//           <input
//             type="file"
//             id="fileInput"
//             onChange={handleFileChange}
//             accept=".pdf,.jpg,.jpeg,.png"
//           />
//         </div>
//         <button type="submit">Upload and Send</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default TaxProposalSend;
