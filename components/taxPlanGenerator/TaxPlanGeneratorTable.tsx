"use client";

import { getAllClientData } from "@/app/actions/client";
import { Spinner } from "@nextui-org/react";
import debounce from "lodash.debounce";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { GoSearch } from "react-icons/go";

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

const TaxPlanGeneratorTable = () => {
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
  }, [debouncedSearch, currentPage, limit]);

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

  const handlePaginationClick = (page: number) => {
    if (page > 0 && page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const renderPagination = useMemo(() => {
    const generatePageNumbers = () => {
      const pageNumbers: number[] = [];

      // Use default values to prevent issues with null or undefined
      const safeCurrentPage = currentPage ?? 1;
      const safeTotalPages = pagination?.totalPages ?? 1;

      const startPage = Math.max(1, safeCurrentPage - 1);
      const endPage = Math.min(safeTotalPages, safeCurrentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      return pageNumbers;
    };

    const pageNumbers = generatePageNumbers();

    return (
      pageNumbers.length > 0 && (
        <nav aria-label="Page navigation" className="flex justify-end mt-8">
          <ul className="inline-flex -space-x-px text-base items-center">
            {/* Previous button */}
            <li>
              <button
                onClick={() => handlePaginationClick((currentPage ?? 1) - 1)}
                disabled={pagination?.previousPage === null || currentPage <= 1}
                className="bg-white border rounded-l-lg text-gray-600 hover:bg-gray-100 h-[42px] w-[90px] flex items-center justify-center"
              >
                <span>Previous</span>
              </button>
            </li>

            {/* Ellipsis before page numbers */}
            {pagination?.previousPage && pagination.previousPage > 1 && (
              <li className="h-[42px] w-[45px] border text-gray-600 flex items-center justify-center hover:bg-gray-100">
                <BsThreeDots />
              </li>
            )}

            {/* Page number buttons */}
            {pageNumbers.map((page) => (
              <li key={page}>
                <button
                  onClick={() => handlePaginationClick(page)}
                  className={`px-4 py-2 border h-[42px] w-[45px] ${
                    page === currentPage
                      ? "bg-primary text-white"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              </li>
            ))}

            {/* Ellipsis after page numbers */}
            {pagination?.currentPage &&
              pagination.currentPage + 1 < (pagination.totalPages ?? 0) && (
                <li className="h-[42px] w-[45px] border text-gray-600 flex items-center justify-center hover:bg-gray-100">
                  <BsThreeDots />
                </li>
              )}

            {/* Next button */}
            <li>
              <button
                onClick={() => handlePaginationClick((currentPage ?? 1) + 1)}
                disabled={
                  pagination?.nextPage === null ||
                  currentPage >= (pagination?.totalPages ?? 1)
                }
                className="px-4 py-2 bg-white border rounded-r-lg text-gray-600 hover:bg-gray-100 h-[42px] w-[90px] flex items-center justify-center"
              >
                <span>Next</span>
              </button>
            </li>
          </ul>
        </nav>
      )
    );
  }, [pagination, currentPage]);

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
            value={search}
            onChange={handleSearchChange}
          />

          {/* Search Icon */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            <GoSearch className="size-5" />
          </div>
        </form>
      </div>

      <div className="relative overflow-x-auto bg-white pb-10 min-h-[50vh]">
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[50vh]">
            <Spinner size="lg" label="Loading..." />
          </div>
        ) : clientData.length > 0 ? (
          <div className="">
            <table className="w-full text-left rtl:text-right text-gray-500 ">
              <thead className="text-[16px] font-medium text-white text-center bg-[#383E54]">
                <tr>
                  {["User Name", "Number", "Email", "Action"].map(
                    (header, idx) => (
                      <th
                        key={idx}
                        className={`px-6 py-3  border-gray-500 border-r-1 `}
                      >
                        {header}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {clientData.map((el: any) => (
                  <tr
                    key={el._id}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b text-[16px] font-medium text-gray-800 text-center "
                  >
                    <td className="px-6 py-4 flex items-center space-x-2">
                      <Link
                        href={`/client/${el?._id}`}
                        className=" flex items-center space-x-2"
                      >
                        <Image
                          src="/assets/user-image/user-image.png"
                          alt="User Picture"
                          width={35}
                          height={35}
                        />
                        <span>{el.basicInformation.fullName}</span>
                      </Link>
                    </td>
                    <td className="px-6 py-4">{el.basicInformation.phone}</td>
                    <td className="px-6 py-4">{el.basicInformation.email}</td>
                    <td className="px-6 py-4 flex justify-center items-center space-x-3">
                      <Link
                        href={`/generate-plan/${el?._id}`}
                        className="px-4 py-2 text-white rounded-md font-medium text-base bg-primary hover:bg-hoverColor hover:text-white"
                      >
                        Generate Plan
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mr-5"> {renderPagination}</div>
          </div>
        ) : (
          <p className="text-center py-10 text-gray-600 flex items-center justify-center min-h-[50vh]">
            No client data available.
          </p>
        )}
      </div>
    </div>
  );
};

export default TaxPlanGeneratorTable;
