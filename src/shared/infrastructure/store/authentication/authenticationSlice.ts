import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import AppState from "../AppState";

export interface AuthenticationState {
  UserName: string;
  Password: string;
  UserRole: number;
  AccessToken: string;
}

export const initialState: AuthenticationState = {
  UserName: "",
  Password: "",
  UserRole: 0,
  AccessToken: "",
};

export const authenticationSlice = createSlice({
  name: "authenticationSlice",
  initialState,
  reducers: {
    authenticationUpdate: (
      state,
      action: PayloadAction<Partial<AuthenticationState>>
    ) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const actions = authenticationSlice.actions;

export default authenticationSlice.reducer;

// Selectors
export const selectAuthentication = (state: AppState) => state.authentication;
