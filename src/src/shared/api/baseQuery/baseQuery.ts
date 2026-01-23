import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_NEW_API_BASE_URL,
  prepareHeaders: (headers) => {
    // headers.set("Access-Control-Allow-Origin", "*");
    return headers;
  },
});
