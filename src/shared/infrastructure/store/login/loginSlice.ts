import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import AppState from "../AppState";

export interface LoginState {}

export const initialState: LoginState = {};

export const loginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {
    loginUpdate: (state, action: PayloadAction<Partial<LoginState>>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const actions = loginSlice.actions;

export default loginSlice.reducer;

// Selectors
export const selectLogin = (state: AppState) => state.login;
