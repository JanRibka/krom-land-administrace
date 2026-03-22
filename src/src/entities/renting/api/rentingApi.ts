import { mainBaseApi } from "shared/api/mainBaseApi";

import { mapRentingStateToData } from "../mappers/mapRentingStateToData";
import { RentingData } from "../types/RentingData";
import type { RentingState } from "../store/RentingState";

const basePath = "renting";

export const rentingApi = mainBaseApi.injectEndpoints({
  endpoints: (build) => ({
    getPageData: build.query<RentingData, void>({
      query: () => ({
        url: `${basePath}/getRentingPageData`,
        method: "GET",
      }),
    }),
    updatePageData: build.mutation<void, RentingState>({
      query: (state) => ({
        url: `${basePath}/updateRentingPageData`,
        method: "POST",
        body: mapRentingStateToData(state),
      }),
    }),
  }),
});

export const { useGetPageDataQuery, useUpdatePageDataMutation } = rentingApi;
