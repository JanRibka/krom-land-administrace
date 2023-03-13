import { combineReducers, configureStore } from "@reduxjs/toolkit";

import AppState from "./AppState";
import commonReduce from "./common/commonSlice";
import webPartsReduce from "./webParts/webPartsSlice";

const rootReducer = combineReducers<AppState>({
  webParts: webPartsReduce,
  common: commonReduce,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
