import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import AppState from "../AppState";

export interface DashboardState {
  FilterDateFrom: Date | null;
  FilterDateTo: Date | null;
  Reservations: number[];
}

export const initialState: DashboardState = {
  FilterDateFrom: null,
  FilterDateTo: null,
  Reservations: [],
};

export const dashboardSlice = createSlice({
  name: "dashboardSlice",
  initialState,
  reducers: {
    dashboardUpdate: (
      state,
      action: PayloadAction<Partial<DashboardState>>
    ) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const actions = dashboardSlice.actions;

export default dashboardSlice.reducer;

// Selectors
export const selectDashboard = (state: AppState) => state.dashboard;
