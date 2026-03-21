import { RootState } from "shared/infrastructure/store/store";

import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_NEW_API_BASE_URL,
  prepareHeaders: (headers: Headers, { getState }) => {
    const authorizationHeader = headers.get("Authorization");
    const authState = (getState() as RootState).authentication;

    if (!authorizationHeader && authState.AccessToken) {
      headers.set("Authorization", `Bearer ${authState.AccessToken}`);
    }
    return headers;
  },
});
