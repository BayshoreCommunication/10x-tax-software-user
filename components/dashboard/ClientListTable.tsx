"use client";

import { getAllClientData } from "@/app/actions/client";
import { Spinner } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { formatDate } from "../shared/ui/DateFormat";
import ClientDeletedModal from "../shared/ui/Modal/ClientDeletedModal";

interface Pagination {
  totalPages: number | null;
  previousPage: number | null;
  currentPage: number | null;
  nextPage: number | null;
}

const ClientListTable = () => {
  const [clientDeletedModal, setClientDeletedModal] = useState(false);
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [clientData, setClientData] = useState([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userDeletedModalFlag, setUserDeletedModalFlag] = useState(false);
  const [clientId, setClientId] = useState<string | null>(null);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const result = await getAllClientData(search, currentPage, limit);

      if (result.ok && result.data) {
        setClientData(result.data.clients);
        setPagination(result.data.pagination);
      } else {
        console.error(result.error);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search, currentPage, clientDeletedModal]);

  const handleUserDelete = (id: string) => {
    setClientId(id);
    setClientDeletedModal(!clientDeletedModal);
  };

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
        {isLoading ? (
          <div className="w-full h-[50vh] flex items-center justify-center">
            <Spinner
              className="text-[#1B2639] "
              color="default"
              label="Loading..."
              labelColor="foreground"
              size="lg"
            />
          </div>
        ) : (
          <table className="w-full text-left rtl:text-right text-gray-500 ">
            <thead className="text-[16px] font-medium text-white text-center bg-[#383E54]">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 border-r-1 border-gray-500"
                >
                  User Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 border-r-1 border-gray-500"
                >
                  Number
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 border-r-1 border-gray-500"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 border-r-1 border-gray-500"
                >
                  Address
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 border-r-1 border-gray-500"
                >
                  Reg. Date
                </th>
                <th scope="col" className="px-6 py-3 ">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {clientData?.map((el: any, index: number) => (
                <tr
                  key={index}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b text-[16px] font-medium text-gray-800 text-center "
                >
                  <td className="px-6 py-4 flex items-center  space-x-2">
                    <Image
                      src="/assets/user-image/user-image.png"
                      alt="User Picture"
                      width={100}
                      height={100}
                      className="w-[35px] h-[35px]"
                    />
                    <p> {el?.basicInformation?.fullName}</p>
                  </td>
                  <td className="px-6 py-4">{el?.basicInformation?.phone}</td>
                  <td className="px-6 py-4">{el?.basicInformation?.email}</td>
                  <td className="px-6 py-4">{el?.basicInformation?.address}</td>
                  <td className="px-6 py-4">{formatDate(el?.createdAt)}</td>
                  <td className="px-6 py-4 flex justify-center items-center space-x-3">
                    <button
                      className="bg-yellow-100 hover:bg-yellow-200 p-1.5 rounded-lg"
                      onClick={() => router.push(`/client-edit/${el?._id}`)}
                    >
                      <FiEdit className="text-[#D5AD45] size-4" />
                    </button>
                    <button
                      className="bg-red-100 hover:bg-red-200 p-1.5 rounded-lg"
                      // onClick={() => setClientDeletedModal(!clientDeletedModal)}
                      onClick={() => handleUserDelete(el?._id)}
                    >
                      <RiDeleteBin6Fill className="text-red-500 size-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* No Data Message */}
        {clientData.length === 0 && (
          <p className="text-center text-gray-600 text-lg mt-16">
            User data not available!
          </p>
        )}

        {/* Pagination */}
        <nav
          aria-label="Page navigation"
          className="flex justify-end mt-8 mr-10"
        >
          <ul className="inline-flex -space-x-px text-base h-10">
            <li>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={pagination?.previousPage === null}
                className={`flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-800`}
              >
                Previous
              </button>
            </li>

            {Array.from(
              { length: pagination?.totalPages || 0 },
              (_, i) => i + 1
            ).map((page) => (
              <li key={page}>
                <button
                  onClick={() => setCurrentPage(page)}
                  className={`flex items-center justify-center px-4 h-10 leading-tight   border   hover:text-gray-700 text-gray-700 ${
                    page === currentPage
                      ? "bg-primary hover:bg-gray-100"
                      : "bg-white hover:bg-primary"
                  }`}
                >
                  {page}
                </button>
              </li>
            ))}

            <li>
              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(prev + 1, pagination?.totalPages || 1)
                  )
                }
                disabled={pagination?.nextPage === null}
                className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-80`}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <ClientDeletedModal
        clientDeletedModal={clientDeletedModal}
        setClientDeletedModal={setClientDeletedModal}
        clientId={clientId}
      />
    </div>
  );
};

export default ClientListTable;
