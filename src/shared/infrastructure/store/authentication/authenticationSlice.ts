import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import AppState from '../AppState';

export interface AuthenticationState {}

export const initialState: AuthenticationState = {};

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
