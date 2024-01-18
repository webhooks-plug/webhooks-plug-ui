import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AppState {}

const initialState: AppState = {};

export const appSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
});

export const {} = appSlice.actions;

export default appSlice.reducer;
