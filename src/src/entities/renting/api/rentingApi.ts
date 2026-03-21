import { mainBaseApi } from "shared/api/mainBaseApi";

import { RentingData } from "../types/RentingData";

const basePath = "renting";

export const rentingApi = mainBaseApi.injectEndpoints({
  endpoints: (build) => ({
    getPageData: build.query<RentingData, void>({
      query: () => ({
        url: `${basePath}/getRentingPageData`,
        method: "GET",
      }),
    }),
    updatePageData: build.mutation<void, RentingData>({
      query: (data) => ({
        url: `${basePath}/updateRentingPageData`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const { useGetPageDataQuery, useUpdatePageDataMutation } = rentingApi;
