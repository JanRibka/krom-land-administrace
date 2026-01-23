import WebLogosModel from "features/webSettings/webLogos/models/WebLogosModel";
import WebSettingsModel from "features/webSettings/webSettings/models/WebSettingsModel";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface WebSettingsState {
  WebSettings: WebSettingsModel;
  WebLogos: WebLogosModel;
}

export const initialState: WebSettingsState = {
  WebSettings: new WebSettingsModel(),
  WebLogos: new WebLogosModel(),
};

export const webSettingsSlice = createSlice({
  name: "webSettingsSlice",
  initialState,
  reducers: {
    webSettingsUpdate: (
      state,
      action: PayloadAction<Partial<WebSettingsModel>>,
    ) => {
      return {
        ...state,
        WebSettings: {
          ...state.WebSettings,
          ...action.payload,
        },
      };
    },

    webLogosUpdate: (state, action: PayloadAction<Partial<WebLogosModel>>) => {
      return {
        ...state,
        WebLogos: {
          ...state.WebLogos,
          ...action.payload,
        },
      };
    },
  },
});

export const actions = webSettingsSlice.actions;

export default webSettingsSlice.reducer;

// Selectors
export const selectWebSettings = (state: RootState) =>
  state.webSettings.WebSettings;
export const selectWebLogos = (state: RootState) => state.webSettings.WebLogos;
