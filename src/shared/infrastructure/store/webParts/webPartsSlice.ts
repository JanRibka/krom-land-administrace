import HomeModel from "features/home/models/HomeModel";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import AppState from "../AppState";

export interface WebPartsState {
  Home: HomeModel;
}

export const initialState: WebPartsState = {
  Home: new HomeModel(),
};

export const webPartsSlice = createSlice({
  name: "webPartsSlice",
  initialState,
  reducers: {
    webPartsUpdate: (state, action: PayloadAction<Partial<WebPartsState>>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    homeUpdate: (state, action: PayloadAction<Partial<HomeModel>>) => {
      const newHome = {
        ...state.Home,
        ...action.payload,
      };

      return {
        ...state,
        Home: newHome,
      };
    },
  },
});

export const actions = webPartsSlice.actions;

export default webPartsSlice.reducer;

// Selectors
export const selectWebParts = (state: AppState) => state.webParts;
export const selectHome = (state: AppState) => state.webParts.Home;
