import { createApi } from "@reduxjs/toolkit/query/react";

import { apiTagList } from "./apiTags";
import { baseQuery } from "./baseQuery/baseQuery";

export const reducerPath = "mainBaseApi";

export const mainBaseApi = createApi({
  reducerPath,
  tagTypes: apiTagList,
  baseQuery,
  endpoints: () => ({}),
});
