import { createApi } from "@reduxjs/toolkit/query/react";

import { apiTagList } from "./apiTags";
import { baseQueryWithReauth } from "./baseQuery/baseQueryWIthReauth";

export const reducerPath = "mainBaseApi";

export const mainBaseApi = createApi({
  reducerPath,
  tagTypes: apiTagList,
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
