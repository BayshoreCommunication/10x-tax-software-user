import Image from "next/image";
import Link from "next/link";
import { formatDate } from "../shared/ui/DateFormat";

const AccountInfo = ({ userData }: { userData: any }) => {
  const {
    logoUrl,
    businessName,
    email,
    address,
    currentSubscriptionExpiredDate,
    businessWebsite,
    phone,
    brandColor = "#E9A31C",
  } = userData || {};

  return (
    <div className="container py-10">
      <div className="bg-white p-8 md:p-12 shadow-sm rounded-lg">
        <h2 className="text-3xl font-bold text-[#11142D] mb-8">
          Business Information
        </h2>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 border p-6 rounded-md">
          {/* Profile Image */}
          <div className="relative w-[150px] h-[150px] shrink-0">
            <Image
              src={logoUrl || "/assets/user-image/user-image.png"}
              alt="User Picture"
              fill
              loading="lazy"
              className="rounded-full object-cover object-center border-2"
            />
          </div>

          {/* User Basic Info */}
          <table className="text-left text-xl font-medium w-full md:w-auto">
            <tbody>
              <InfoRow label="Business Name:" value={businessName} />
              <InfoRow label="Email:" value={email} />
            </tbody>
          </table>
        </div>

        {/* Additional Info */}
        <div className="mt-10 space-y-4 max-w-[650px]">
          <table className="w-full text-left text-xl font-medium">
            <tbody>
              <InfoRow label="Address:" value={address} />
              <InfoRow
                label="Subscription End Date:"
                value={formatDate(currentSubscriptionExpiredDate)}
              />
              <InfoRow label="Website:" value={businessWebsite} />
              <InfoRow label="Phone Number:" value={phone} />
            </tbody>
          </table>

          {/* Brand Color */}
          <div className="w-full md:w-[225px] px-1">
            <label className="block mb-2 text-xl font-medium text-gray-900">
              Brand Color
            </label>
            <div className="border border-gray-300 flex items-center justify-between rounded p-2">
              <input
                type="text"
                value={brandColor}
                readOnly
                className="focus:outline-none w-[100px] bg-white text-black"
              />
              <div
                className="w-7 h-7 rounded"
                style={{ backgroundColor: brandColor }}
              />
            </div>
          </div>
        </div>

        {/* Edit Profile Button */}
        <div className="mt-10">
          <Link
            href="/settings"
            className="px-4 py-2 bg-primary hover:bg-hoverColor text-white text-base rounded-md font-medium inline-block w-[140px] text-center"
          >
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

// Subcomponent for cleaner JSX
const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: string | undefined;
}) => (
  <tr>
    <td className="px-6 py-3 text-[#666666]">{label}</td>
    <td className="px-6 py-3 text-[#11142D]">{value || "—"}</td>
  </tr>
);

export default AccountInfo;
