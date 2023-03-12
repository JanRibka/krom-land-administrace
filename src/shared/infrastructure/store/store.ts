import { combineReducers, configureStore } from "@reduxjs/toolkit";

import AppState from "./AppState";

const rootReducer = combineReducers<AppState>({});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
