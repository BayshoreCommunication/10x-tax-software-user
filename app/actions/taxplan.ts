"use server";
import { auth } from "@/auth";

interface TaxPlanData {
  id: string;
  name: string;
  amount: number;
  // Other properties returned by the API
}

interface TaxPlanResponse {
  taxPlan: TaxPlanData[];
}

interface UserDataResponse<T = any> {
  error?: string;
  ok: boolean;
  data?: any;
}

// Modify the function return type
export async function getClientTaxList(
  id: string
): Promise<UserDataResponse<TaxPlanResponse>> {
  const session = await auth();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/tax-plan/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${session?.user?.accessToken || ""}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to fetch user data:", errorData);
      return {
        error: errorData?.message || "Failed to fetch user data.",
        ok: false,
        data: null,
      };
    }

    // Transform API response to match expected type
    const data = await response.json();
    const taxPlanResponse: TaxPlanResponse = {
      taxPlan: data?.payload || [],
    };

    return {
      ok: true,
      data: taxPlanResponse,
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return {
      error: "An unexpected error occurred. Please try again later.",
      ok: false,
      data: null,
    };
  }
}

// Modify the function return type
export async function getTaxRangeSheet(): Promise<
  UserDataResponse<TaxPlanResponse>
> {
  const session = await auth();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/tax-range-sheet`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${session?.user?.accessToken || ""}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to fetch tax range sheet:", errorData);
      return {
        error: errorData?.message || "Failed to fetch tax range sheet.",
        ok: false,
        data: null,
      };
    }

    // Transform API response to match expected type
    const data = await response.json();
    const taxPlanResponse: TaxPlanResponse = {
      taxPlan: data?.payload || [],
    };

    return {
      ok: true,
      data: taxPlanResponse,
    };
  } catch (error) {
    console.error("Error fetching tax range sheet:", error);
    return {
      error: "An unexpected error occurred. Please try again later.",
      ok: false,
      data: null,
    };
  }
}
