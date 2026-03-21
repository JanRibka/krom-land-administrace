import axios from "axios";
import HttpStatusCodes from "http-status-codes";
import JsonResulObjectDataDTO from "shared/DTOs/JsonResulObjectDataDTO";
import RefreshTokenDTO from "shared/DTOs/RefreshTokenDTO";
import {
  actions,
  AuthenticationState,
} from "shared/infrastructure/store/authentication/authenticationSlice";

import { baseQuery } from "./baseQuery";

import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === HttpStatusCodes.FORBIDDEN) {
    // const persistLogin = localStorage.getItem("persist") ?? false;
    // const url = `web/auth/refreshToken?persistLogin=${persistLogin}`;
    const _axios = axios.create({});

    // const refreshResult = await baseQuery(url, api, extraOptions);
    const refreshResult = await _axios.get<
      JsonResulObjectDataDTO<RefreshTokenDTO>
    >((process.env.REACT_APP_API_URL ?? "") + "AuthenticationController.php", {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      params: new URLSearchParams({
        function: "refreshToken",
      }),
      baseURL: process.env.REACT_APP_API_BASE_URL,
    });

    if (refreshResult?.data) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      // const email = (api as any).getState().auth.email;

      api.dispatch(
        actions.authenticationUpdate({
          ...refreshResult.data.Data,
        }),
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(actions.authenticationReset());
    }
  }

  return result;
};
