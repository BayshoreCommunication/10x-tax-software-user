"use client";

import { getAllClientData } from "@/app/actions/client";
import { Spinner } from "@nextui-org/react";
import debounce from "lodash.debounce";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { GoSearch } from "react-icons/go";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { formatDate } from "../shared/ui/DateFormat";
import ClientDeletedModal from "../shared/ui/Modal/ClientDeletedModal";

interface Pagination {
  totalPages: number | null;
  previousPage: number | null;
  currentPage: number | null;
  nextPage: number | null;
}
interface Client {
  _id: string;
  basicInformation: {
    fullName: string;
    phone: string;
    email: string;
    address: string;
  };
  createdAt: string;
}

const ClientList = () => {
  const [clientDeletedModal, setClientDeletedModal] = useState<boolean>(false);
  const [clientDeletedValue, setClientDeletedValue] = useState<boolean>(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [limit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [clientData, setClientData] = useState<Client[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [clientId, setClientId] = useState<string | null>(null);

  const router = useRouter();

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await getAllClientData(
        debouncedSearch,
        currentPage,
        limit
      );
      if (result.ok && result.data) {
        setClientData(result.data.clients);
        setPagination(result.data.pagination);

        if (result.data.pagination.totalPages < currentPage) {
          setCurrentPage(result.data.pagination.totalPages || 1);
        }
      } else {
        console.error(result.error || "Failed to fetch client data.");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearch, currentPage, limit, clientDeletedValue]);

  const debounceSearch = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedSearch(value);
      }, 300),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    debounceSearch(e.target.value);
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleUserDelete = async (id: string) => {
    setClientId(id);
    setClientDeletedModal(true);
  };

  const handlePaginationClick = (page: number) => {
    if (page > 0 && page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const renderPagination = useMemo(() => {
    if (!pagination || !pagination.totalPages || pagination.totalPages <= 1) {
      return null;
    }

    const pages = Array.from(
      { length: pagination.totalPages ?? 0 },
      (_, i) => i + 1
    );

    const renderPageNumbers = () => {
      let pageNumbers: (string | number)[] = [];

      if ((pagination.totalPages ?? 0) <= 2) {
        pageNumbers = pages;
      } else {
        pageNumbers = [1, 2];

        if (currentPage > 3) {
          pageNumbers.push("...");
        }

        if ((pagination.totalPages ?? 0) - currentPage >= 2) {
          pageNumbers.push(pagination.totalPages ?? 0);
        }
      }

      return pageNumbers;
    };

    const pageNumbers = renderPageNumbers();

    return (
      <nav aria-label="Page navigation" className="flex justify-end mt-8">
        <ul className="inline-flex -space-x-px text-base h-10">
          <li>
            <button
              onClick={() => handlePaginationClick(currentPage - 1)}
              disabled={pagination.previousPage === null}
              className="px-4 py-2 bg-white border rounded-l-lg text-gray-600 hover:bg-gray-100"
            >
              Previous
            </button>
          </li>
          {pageNumbers.map((page, index) =>
            page === "..." ? (
              <li key={index} className="px-4 py-2 text-gray-600">
                ...
              </li>
            ) : (
              <li key={page}>
                <button
                  onClick={() => handlePaginationClick(Number(page))}
                  className={`px-4 py-2 border ${
                    page === currentPage
                      ? "bg-primary text-white"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              </li>
            )
          )}
          <li>
            <button
              onClick={() => handlePaginationClick(currentPage + 1)}
              disabled={pagination.nextPage === null}
              className="px-4 py-2 bg-white border rounded-r-lg text-gray-600 hover:bg-gray-100"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    );
  }, [pagination, currentPage, clientDeletedValue]);

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between bg-secondary px-12 py-4">
        <h2 className="text-2xl font-bold text-white">Clients List</h2>
        <form className="flex items-center w-[50%] relative">
          <input
            type="text"
            className="bg-[#282E44] border-2 border-[#383E54] text-lg pl-12 py-2 text-white rounded-full w-full"
            placeholder="Search for clients..."
            value={search}
            onChange={handleSearchChange}
          />
          <GoSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </form>
        <Link
          href="/add-new-client"
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-hoverColor"
        >
          Add New Client
        </Link>
      </div>

      <div className="relative overflow-x-auto bg-white pb-10 min-h-[50vh]">
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[50vh]">
            <Spinner size="lg" label="Loading..." />
          </div>
        ) : clientData.length > 0 ? (
          <table className="w-full text-left rtl:text-right text-gray-500 ">
            <thead className="text-[16px] font-medium text-white text-center bg-[#383E54]">
              <tr>
                {[
                  "User Name",
                  "Number",
                  "Email",
                  "Address",
                  "Reg. Date",
                  "Action",
                ].map((header, idx) => (
                  <th key={idx} className="px-6 py-3 text-center">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {clientData.map((client) => (
                <tr
                  key={client?._id}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b text-[16px] font-medium text-gray-800 text-center "
                >
                  <td className="px-6 py-4 flex items-center space-x-2">
                    <Image
                      src="/assets/user-image/user-image.png"
                      alt="User Picture"
                      width={35}
                      height={35}
                    />
                    <span>{client.basicInformation.fullName}</span>
                  </td>
                  <td>{client.basicInformation.phone}</td>
                  <td>{client.basicInformation.email}</td>
                  <td>{client.basicInformation.address}</td>
                  <td>{formatDate(client.createdAt)}</td>
                  <td className="flex justify-center space-x-3">
                    <button
                      onClick={() => router.push(`/client-edit/${client._id}`)}
                      className="bg-yellow-100 p-1.5 rounded hover:bg-yellow-200"
                    >
                      <FiEdit className="text-yellow-600" />
                    </button>
                    <button
                      onClick={() => handleUserDelete(client._id)}
                      className="bg-red-100 p-1.5 rounded hover:bg-red-200"
                    >
                      <RiDeleteBin6Fill className="text-red-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center py-10 text-gray-600">
            No client data available.
          </p>
        )}
        <div className="mr-5"> {renderPagination}</div>
      </div>

      <ClientDeletedModal
        clientDeletedModal={clientDeletedModal}
        setClientDeletedModal={setClientDeletedModal}
        clientId={clientId}
        setClientDeletedValue={setClientDeletedValue}
        clientDeletedValue={clientDeletedValue}
      />
    </div>
  );
};

export default ClientList;
