import FeatureStyled from "features/styledComponents/FeatureStyled";
import { useSelector } from "react-redux";
import AppLoader from "shared/components/loader/AppLoader";
import AppNotification from "shared/components/notification/AppNotification";
import PageTitle from "shared/components/pageTitle/PageTitle";
import { useRequest } from "shared/dataAccess/useRequest";
import AdmSettingsDTO from "shared/DTOs/AdmSettingsDTO";
import JsonResulObjectDataDTO from "shared/DTOs/JsonResulObjectDataDTO";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";
import { selectAdmSettings } from "shared/infrastructure/store/admSettings/admSettingsSlice";
import { useAdmSettingsSlice } from "shared/infrastructure/store/admSettings/useAdmSettingsSlice";

import Stack from "@mui/material/Stack";

import { mapFromAdmSettingsDTO } from "../save/mapFromAdmSettingsDTO";
import ChangePassword from "./changePassword/ChangePassword";
import Register from "./register/Register";
import UsersList from "./usersList/UsersList";

const Users = () => {
  // Store
  const admSettingd = useSelector(selectAdmSettings);

  // Constants
  const { handleAdmSettingsUpdate } = useAdmSettingsSlice();

  /**
   * Get data
   */
  const { isLoading } = useRequest<JsonResulObjectDataDTO<AdmSettingsDTO>>(
    {
      url: (process.env.REACT_APP_API_URL ?? "") + "AdmSettingsController.php",
      params: new URLSearchParams({
        function: "getAdmSettings",
      }),
    },
    {
      Success: false,
      ErrMsg: "",
      Data: new AdmSettingsDTO(),
    },
    [],
    {
      apply: true,
      condition: () => admSettingd._admSettingsLoaded === false,
    },
    (data) => {
      const dataType = typeof data;

      if (dataType === "string") {
        AppNotification("Chyba", String(data), "danger");
      } else {
        if (data.Success) {
          handleAdmSettingsUpdate(mapFromAdmSettingsDTO(data?.Data));
        } else {
          AppNotification("Chyba", data.ErrMsg ?? "", "danger");
        }
      }
    }
  );
  return (
    <ErrorBoundary>
      <FeatureStyled>
        <Stack spacing={4}>
          <PageTitle title='Uživatelé' />
          <UsersList />
          <ChangePassword />
          <Register />
        </Stack>

        {isLoading && <AppLoader />}
      </FeatureStyled>
    </ErrorBoundary>
  );
};

export default Users;
