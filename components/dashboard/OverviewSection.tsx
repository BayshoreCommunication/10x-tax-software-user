import { LuCalendarDays } from "react-icons/lu";

const newPayment = [
  {
    name: "Travis",
    email: "travis@gmail.com",
    subscriptionsDate: "11-12-2024",
  },
  {
    name: "Neel",
    email: "neel@gmail.com",
    subscriptionsDate: "27-06-2024",
  },
  {
    name: "Salman",
    email: "salman@gmail.com",
    subscriptionsDate: "19-05-2024",
  },
  {
    name: "Sadit",
    email: "sadit@gmail.com",
    subscriptionsDate: "1-02-2024",
  },
  {
    name: "Sahak",
    email: "sahak@gmail.com",
    subscriptionsDate: "12-08-2024",
  },
  {
    name: "Milon",
    email: "milon@gmail.com",
    subscriptionsDate: "12-07-2024",
  },
  {
    name: "Raihan",
    email: "raihan@gmail.com",
    subscriptionsDate: "12-12-2024",
  },
  {
    name: "Kawsar",
    email: "kawsar@gmail.com",
    subscriptionsDate: "12-12-2024",
  },
];

const OverviewSection = () => {
  return (
    <div className=" my-7 flex items-stretch justify-between gap-x-7 w-full">
      <div className=" bg-white p-12 w-[55%]">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h2 className="text-2xl font-bold text-gray-800">New Payment</h2>
            <LuCalendarDays className="text-gray-700 size-6" />
          </div>
          <div className="">
            <button className="px-2 py-1.5 border-2 border-primary text-primary rounded-md font-medium text-base hover:bg-primary hover:text-white w-[120px]">
              View All
            </button>
          </div>
        </div>
        <div className="mt-8">
          <div className="relative overflow-x-auto  md:rounded-lg">
            <table className="w-full text-base text-center rtl:text-right text-gray-600 !font-normal">
              <thead className="text-base text-gray-700 border-b ">
                <tr>
                  <th scope="col" className="px-6 py-3 w-[15%]">
                    #
                  </th>
                  <th scope="col" className="px-6 py-3 w-[15%]">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3  w-[40%]">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3  w-[30%]">
                    Subscription Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {newPayment?.map((el: any, index: number) => (
                  <tr
                    className="bg-white border-b  hover:bg-gray-50 text-base font-medium"
                    key={index}
                  >
                    <td className="px-6 py-4">0{index + 1}</td>
                    <td className="px-6 py-4 ">{el?.name}</td>
                    <td className="px-6 py-4 ">{el?.email}</td>
                    <td className="px-6 py-4">{el?.subscriptionsDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className=" bg-white p-12 w-[45%]">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h2 className="text-2xl font-bold text-gray-800">Recent Client</h2>
            <LuCalendarDays className="text-gray-700 size-6" />
          </div>
          <div className="">
            <button className="px-2 py-1.5 border-2 border-primary text-primary rounded-md font-medium text-base hover:bg-primary hover:text-white w-[120px]">
              View All
            </button>
          </div>
        </div>
        <div className="mt-8">
          <div className="relative overflow-x-auto  md:rounded-lg">
            <table className="w-full text-base text-center rtl:text-right text-gray-600 !font-normal">
              <thead className="text-base text-gray-700 border-b ">
                <tr>
                  <th scope="col" className="px-6 py-3 w-[30%]">
                    #
                  </th>
                  <th scope="col" className="px-6 py-3 w-[30%]">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3  w-[40%]">
                    Email
                  </th>
                </tr>
              </thead>
              <tbody>
                {newPayment?.map((el: any, index: number) => (
                  <tr
                    className="bg-white border-b  hover:bg-gray-50 text-base font-medium"
                    key={index}
                  >
                    <td className="px-6 py-4">0{index + 1}</td>
                    <td className="px-6 py-4 ">{el?.name}</td>
                    <td className="px-6 py-4 ">{el?.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewSection;
