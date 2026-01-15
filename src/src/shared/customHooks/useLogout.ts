import Repository from "shared/infrastructure/repositiory/Repository";
import { useAdmSettingsSlice } from "shared/infrastructure/store/admSettings/useAdmSettingsSlice";
import { useAuthenticationSlice } from "shared/infrastructure/store/authentication/useAuthenticationSlice";
import { useDashboardSlice } from "shared/infrastructure/store/dashboard/useDashboardSlice";
import { useWebPartsSlice } from "shared/infrastructure/store/webParts/useWebPartsSlice";
import { useWebSettingsSlice } from "shared/infrastructure/store/webSettings/useWebSettingsSlice";

const useLogout = () => {
  // Constants
  const { handleAuthenticationReset } = useAuthenticationSlice();
  const { handleDashboardUpdate } = useDashboardSlice();
  const { handleAdmSettingsUpdate } = useAdmSettingsSlice();
  const {
    handleHomeUpdate,
    handleActionsUpdate,
    handleGalleryUpdate,
    handleContactUpdate,
    handleConditionsUpdate,
  } = useWebPartsSlice();
  const { handleWebSettingsUpdate, handleLogosUpdate } = useWebSettingsSlice();
  const _repository = new Repository();

  // Other
  const resetState = () => {
    handleAuthenticationReset();
    handleHomeUpdate({ _dataLoaded: false });
    handleActionsUpdate({ _dataLoaded: false });
    handleGalleryUpdate({ _dataLoaded: false });
    handleContactUpdate({ _dataLoaded: false });
    handleConditionsUpdate({ _gdprLoaded: false, _conditionsLoaded: false });
    handleWebSettingsUpdate({ _dataLoaded: false });
    handleLogosUpdate({ _dataLoaded: false });
    handleAdmSettingsUpdate({ _usersLoaded: false, _admSettingsLoaded: false });
    handleDashboardUpdate({
      _registrationsLoaded: false,
      _dashboardLoaded: false,
    });
  };

  const logout = async () => {
    try {
      await _repository.post({
        baseUrl: process.env.REACT_APP_API_BASE_URL,
        url:
          (process.env.REACT_APP_API_URL ?? "") +
          "AuthenticationController.php",
        params: new URLSearchParams({
          function: "logout",
        }),
        withCredentials: true,
      });

      resetState();
    } catch (err) {
      resetState();
      console.log(err);
    }
  };

  return logout;
};

export default useLogout;
