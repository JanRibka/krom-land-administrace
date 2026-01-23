import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { mainBaseApi } from "../../api/mainBaseApi";
import admSettingsReduce from "./admSettings/admSettingsSlice";

import authenticationReduce from "./authentication/authenticationSlice";
import dashboardReduce from "./dashboard/dashboardSlice";
import webPartsReduce from "./webParts/webPartsSlice";
import webSettingsReduce from "./webSettings/webSettingsSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const rootReducer = combineReducers({
  authentication: authenticationReduce,
  dashboard: dashboardReduce,
  webParts: webPartsReduce,
  webSettings: webSettingsReduce,
  admSettings: admSettingsReduce,
  [mainBaseApi.reducerPath]: mainBaseApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mainBaseApi.middleware),
  devTools: process.env.REACT_APP_ENABLE_DEVTOOLS === String(true),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
