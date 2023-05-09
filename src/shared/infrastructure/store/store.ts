import { combineReducers, configureStore } from "@reduxjs/toolkit";

import AppState from "./AppState";
import authenticationReduce from "./authentication/authenticationSlice";
import webPartsReduce from "./webParts/webPartsSlice";

const rootReducer = combineReducers<AppState>({
  webParts: webPartsReduce,
  authentication: authenticationReduce,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.REACT_APP_ENABLE_DEVTOOLS === String(true),
});
