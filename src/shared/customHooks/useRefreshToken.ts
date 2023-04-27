import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import JsonResulObjectDataDTO from "shared/DTOs/JsonResulObjectDataDTO";
import { AppRoute } from "shared/infrastructure/router/appRoutes";
import { useAuthenticationSlice } from "shared/infrastructure/store/authentication/useAuthenticationSlice";

export const useRefreshToken = () => {
  // Constants
  const { handleAuthenticationUpdate } = useAuthenticationSlice();
  const location = useLocation();
  const navigate = useNavigate();
  const _axios = axios.create({});

  // Other
  const refresh = async () => {
    try {
      const response = await _axios.get<JsonResulObjectDataDTO<string>>(
        (process.env.REACT_APP_API_URL ?? "") + "AuthenticationController.php",
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          params: new URLSearchParams({
            function: "refreshToken",
          }),
        }
      );

      handleAuthenticationUpdate({ AccessToken: response.data.Data ?? "" });

      return response.data.Data;
    } catch (err) {
      navigate(AppRoute.Login, { state: { from: location }, replace: true });
    }
  };

  return refresh;
};

export default useRefreshToken;
