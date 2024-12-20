"use client";
import { usersDemoData } from "@/config/data";
import { GoSearch } from "react-icons/go";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const TaxPlanGeneratorTable = () => {
  const router = useRouter();

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between bg-secondary px-12 py-4">
        <h2 className="w-[25%] text-2xl font-bold text-white text-left py-4">
          Tax Plan Generator
        </h2>
        <form className="w-[40%] flex justify-center items-center mx-0 relative">
          <input
            autoComplete="off"
            type="text"
            id="email-address-icon"
            className="bg-[#282E44] border-2 border-[#383E54] text-lg focus:ring-[#383E54] focus:border-[#383E54] block pl-12 py-2 placeholder-[#383E54] active:border-[#383E54] outline-none rounded-full placeholder:text-lg text-white w-full placeholder:text-gray-400"
            placeholder="Search for something..."
          />
          {/* Search Icon */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            <GoSearch className="size-5" />
          </div>
        </form>
      </div>
      <div className="relative overflow-x-auto bg-white pb-10">
        <table className="w-full text-left rtl:text-right text-gray-500 ">
          <thead className="text-[16px] font-medium text-white text-center bg-[#383E54]">
            <tr>
              <th scope="col" className="px-6 py-3 border-r-1 border-gray-500">
                User Name
              </th>
              <th scope="col" className="px-6 py-3 border-r-1 border-gray-500">
                Number
              </th>
              <th scope="col" className="px-6 py-3 border-r-1 border-gray-500">
                Email
              </th>

              <th scope="col" className="px-6 py-3 ">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {usersDemoData?.map((el: any, index: number) => (
              <tr
                key={index}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b text-[16px] font-medium text-gray-800 text-center "
              >
                <td className="px-6 py-4 flex items-center space-x-2">
                  <Image
                    src="/assets/user-image/user-image.png"
                    alt="User Picture"
                    width={100}
                    height={100}
                    className="w-[35px] h-[35px]"
                  />
                  <p> {el?.name}</p>
                </td>
                <td className="px-6 py-4">{el?.phone}</td>
                <td className="px-6 py-4">{el?.email}</td>

                <td className="px-6 py-4 flex justify-center items-center space-x-3">
                  <Link
                    href={"/generate-plan"}
                    className="px-4 py-2 text-white rounded-md font-medium text-base bg-primary hover:bg-[#be9837] hover:text-white"
                  >
                    Generate Plan
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <nav
          aria-label="Page navigation example "
          className="flex justify-end mt-8 px-12"
        >
          <ul className="inline-flex -space-x-px text-base h-10">
            <Link
              href="#"
              className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-800"
            >
              Previous
            </Link>

            <Link
              href="#"
              className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
            >
              1
            </Link>

            <Link
              href="#"
              className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
            >
              2
            </Link>

            <Link
              href="#"
              className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
            >
              ...
            </Link>

            <Link
              href="#"
              className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 "
            >
              Next
            </Link>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default TaxPlanGeneratorTable;
