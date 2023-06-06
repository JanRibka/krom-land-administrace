import { combineReducers, configureStore } from "@reduxjs/toolkit";

import admSettingsReduce from "./admSettings/admSettingsSlice";
import AppState from "./AppState";
import authenticationReduce from "./authentication/authenticationSlice";
import dashboardReduce from "./dashboard/dashboardSlice";
import webPartsReduce from "./webParts/webPartsSlice";
import webSettingsReduce from "./webSettings/webSettingsSlice";

const rootReducer = combineReducers<AppState>({
  authentication: authenticationReduce,
  dashboard: dashboardReduce,
  webParts: webPartsReduce,
  webSettings: webSettingsReduce,
  admSettings: admSettingsReduce,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.REACT_APP_ENABLE_DEVTOOLS === String(true),
});
