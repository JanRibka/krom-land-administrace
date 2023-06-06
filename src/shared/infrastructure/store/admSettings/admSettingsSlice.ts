import UserModel from "features/admSettings/models/UserModel";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import AppState from "../AppState";

export interface AdmSettingsState {
  Users: UserModel[];
  _usersLoaded: boolean;
}

export const initialState: AdmSettingsState = {
  Users: [],
  _usersLoaded: false,
};

export const admSettingsSlice = createSlice({
  name: "admSettingsSlice",
  initialState,
  reducers: {
    admSettingsUpdate: (
      state,
      action: PayloadAction<Partial<AdmSettingsState>>
    ) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const actions = admSettingsSlice.actions;

export default admSettingsSlice.reducer;

// Selectors
export const selectAdmSettings = (state: AppState) => state.admSettings;
