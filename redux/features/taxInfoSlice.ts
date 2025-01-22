"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DataState<T> {
  data: T | null;
}

// Initial state is retrieved from localStorage if it exists, or set to null.
const initialState: DataState<any> = {
  data:
    typeof window !== "undefined" && localStorage.getItem("taxInfo")
      ? JSON.parse(localStorage.getItem("taxInfo") || "null")
      : null,
};

export const taxInfoSlice = createSlice({
  name: "taxInfo",
  initialState,
  reducers: {
    // Action to store or replace data
    setData: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("taxInfo", JSON.stringify(action.payload));
      }
    },
    // Action to remove data
    removeData: (state) => {
      state.data = null;
      // Remove from localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("taxInfo");
      }
    },
    // Optional: Update specific fields in the data
    updateDataField: (
      state,
      action: PayloadAction<{ key: string; value: any }>
    ) => {
      if (state.data && typeof state.data === "object") {
        (state.data as any)[action.payload.key] = action.payload.value;
        // Update localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("taxInfo", JSON.stringify(state.data));
        }
      }
    },
  },
});

// Export actions
export const { setData, removeData, updateDataField } = taxInfoSlice.actions;

// Export reducer
export default taxInfoSlice.reducer;
