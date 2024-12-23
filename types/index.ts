import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

// type.ts
export interface UserDataResponse {
  success: boolean;
  message: string;
  payload?: {
    user: {
      _id: string;
      businessName: string;
      email: string;
      phone: string;
      subscription: boolean;
      isAdmin: boolean;
      isBanned: boolean;
      otp: string | null;
      otpExpiration: string | null;
      isActive: boolean;
      createdAt: string; // ISO date string
      updatedAt: string; // ISO date string
      __v: number;
      currentSubscriptionExpiredDate: string; // ISO date string
      currentSubscriptionPayDate: string; // ISO date string
      currentSubscriptionType: "yearly" | "monthly"; // Restricting to expected values
      address: string;
      brandColor: string; // HEX color code
      businessWebsite: string;
      logoUrl: string; // URL string
    } | null;
  } | null;
  error?: string; // Add this for error handling
}
