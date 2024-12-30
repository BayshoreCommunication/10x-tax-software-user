"use client";
import { usersDemoData } from "@/config/data";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import ClientDeletedModal from "../shared/ui/Modal/ClientDeletedModal";

const ClientListTable = () => {
  const [clientDeletedModal, setClientDeletedModal] = useState(false);
  const router = useRouter();

  return (
    <div className="container ">
      <div className="flex items-center justify-between bg-secondary px-12 py-4">
        <h2 className="text-2xl font-bold text-white text-center py-4">
          Clients List
        </h2>
        <Link
          href={"/add-new-client"}
          className="px-4 py-2 text-white rounded-md font-medium text-base bg-primary hover:bg-hoverColor hover:text-white flex items-center "
        >
          Add New Client
        </Link>
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
              <th scope="col" className="px-6 py-3 border-r-1 border-gray-500">
                Address
              </th>
              <th scope="col" className="px-6 py-3 border-r-1 border-gray-500">
                Reg. Date
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
                <td className="px-6 py-4">{el?.address}</td>
                <td className="px-6 py-4">{el?.subscriptionsDate}</td>
                <td className="px-6 py-4 flex justify-center items-center space-x-3">
                  <button
                    className="bg-yellow-100 hover:bg-yellow-200 p-1.5 rounded-lg"
                    onClick={() => router.push(`/client-edit`)}
                  >
                    <FiEdit className="text-[#D5AD45] size-4" />
                  </button>
                  <button
                    className="bg-red-100 hover:bg-red-200 p-1.5 rounded-lg"
                    onClick={() => setClientDeletedModal(!clientDeletedModal)}
                  >
                    <RiDeleteBin6Fill className="text-red-500 size-4" />
                  </button>
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
      <ClientDeletedModal
        clientDeletedModal={clientDeletedModal}
        setClientDeletedModal={setClientDeletedModal}
      />
    </div>
  );
};

export default ClientListTable;
