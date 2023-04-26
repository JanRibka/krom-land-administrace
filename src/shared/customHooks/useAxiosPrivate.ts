import { HttpStatusCode } from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { axiosPrivate } from "shared/infrastructure/repositiory/axios";
import { selectAuthentication } from "shared/infrastructure/store/authentication/authenticationSlice";

import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {
  // Constants
  const refresh = useRefreshToken();

  // Store
  const authentication = useSelector(selectAuthentication);
  console.log(refresh);
  console.log(authentication);
  // Other
  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers[
            "Authorization"
          ] = `Bearer ${authentication.AccessToken}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;

        if (
          error?.response?.status === HttpStatusCode.Forbidden &&
          !prevRequest?.send
        ) {
          prevRequest.send = true;

          const newAccessToken = await refresh();

          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          return axiosPrivate(prevRequest);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [authentication, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
