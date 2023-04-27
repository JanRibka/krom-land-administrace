import Repository from 'shared/infrastructure/repositiory/Repository';
import {
    useAuthenticationSlice
} from 'shared/infrastructure/store/authentication/useAuthenticationSlice';

const useLogout = () => {
  // Constants
  const { handleAuthenticationReset } = useAuthenticationSlice();
  const _repository = new Repository();

  const logout = async () => {
    try {
      await _repository.post({
        url:
          (process.env.REACT_APP_API_URL ?? "") +
          "AuthenticationController.php",
        params: new URLSearchParams({
          function: "logout",
        }),
        withCredentials: true,
      });

      handleAuthenticationReset();
    } catch (err) {
      handleAuthenticationReset();
      console.log(err);
    }
  };

  return logout;
};

export default useLogout;
