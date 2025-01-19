"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DataState<T> {
  data: T | null;
}

const initialState: DataState<any> = {
  data: null,
};

export const taxInfoSlice = createSlice({
  name: "taxInfo",
  initialState,
  reducers: {
    // Action to store data
    setData: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
    // Action to remove data
    removeData: (state) => {
      state.data = null;
    },
    // Optional: Update specific fields in the data
    updateDataField: (
      state,
      action: PayloadAction<{ key: string; value: any }>
    ) => {
      if (state.data && typeof state.data === "object") {
        (state.data as any)[action.payload.key] = action.payload.value;
      }
    },
  },
});

// Export actions
export const { setData, removeData, updateDataField } = taxInfoSlice.actions;

// Export reducer
export default taxInfoSlice.reducer;
