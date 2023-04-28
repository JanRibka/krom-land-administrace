import { Action, createSlice, PayloadAction } from '@reduxjs/toolkit';

import AppState from '../AppState';

export interface AuthenticationState {
  UserName: string;
  Password: string;
  UserRole: number;
  AccessToken: string;
  Persist: boolean;
}

export const initialState: AuthenticationState = {
  UserName: "",
  Password: "",
  UserRole: 0,
  AccessToken: "",
  Persist: JSON.parse(localStorage.getItem("persist") ?? "false"),
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
    authenticationReset: (state, action: Action) => {
      return {
        ...state,
        UserName: "",
        Password: "",
        UserRole: 0,
        AccessToken: "",
      };
    },
  },
});

export const actions = authenticationSlice.actions;

export default authenticationSlice.reducer;

// Selectors
export const selectAuthentication = (state: AppState) => state.authentication;
