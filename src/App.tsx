import axios, { HttpStatusCode } from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import useRefreshToken from "shared/customHooks/useRefreshToken";
import { selectAuthentication } from "shared/infrastructure/store/authentication/authenticationSlice";

import AppRouter from "./shared/infrastructure/router/AppRouter";

const App = () => {
  const refresh = useRefreshToken();

  // Store
  const authentication = useSelector(selectAuthentication);

  useEffect(() => {
    const requestIntercept = axios.interceptors.request.use(
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

    const responseIntercept = axios.interceptors.response.use(
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

          return axios(prevRequest);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestIntercept);
      axios.interceptors.response.eject(responseIntercept);
    };
  }, [authentication, refresh]);
  return <AppRouter />;
};

export default App;
