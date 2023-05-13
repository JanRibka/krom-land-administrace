import RegistrationModel from "features/dashboard/models/RegistrationModel";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import AppState from "../AppState";

export interface DashboardState {
  FilterDateFrom: Date | null;
  FilterDateTo: Date | null;
  Registrations: RegistrationModel[];
  _dashboardLoaded: boolean;
  _registrationsLoaded: boolean;
}

export const initialState: DashboardState = {
  FilterDateFrom: null,
  FilterDateTo: null,
  Registrations: [],
  _dashboardLoaded: false,
  _registrationsLoaded: false,
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
