import { useSelector } from "react-redux";
import JsonResulObjectDataDTO from "shared/DTOs/JsonResulObjectDataDTO";
import Repository from "shared/infrastructure/repositiory/Repository";
import { selectAuthentication } from "shared/infrastructure/store/authentication/authenticationSlice";
import { useAuthenticationSlice } from "shared/infrastructure/store/authentication/useAuthenticationSlice";

export const useRefreshToken = () => {
  // Constants
  const _repository = new Repository();
  const { handleAuthenticationUpdate } = useAuthenticationSlice();

  // Store
  const authentication = useSelector(selectAuthentication);

  // Other
  const refresh = async () => {
    const response = await _repository.get<JsonResulObjectDataDTO<string>>({
      url:
        (process.env.REACT_APP_API_URL ?? "") + "AuthenticationController.php",
      params: new URLSearchParams({
        function: "refreshToken",
      }),
      withCredentials: true,
    });

    console.log(authentication);
    console.log(response);
    handleAuthenticationUpdate({ AccessToken: response.Data ?? "" });

    return response.Data;
  };

  return refresh;
};

export default useRefreshToken;
