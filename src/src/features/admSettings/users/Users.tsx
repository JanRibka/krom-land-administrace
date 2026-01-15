import FeatureStyled from "features/styledComponents/FeatureStyled";
import { useSelector } from "react-redux";
import AppLoader from "shared/components/loader/AppLoader";
import AppNotification from "shared/components/notification/AppNotification";
import PageTitle from "shared/components/pageTitle/PageTitle";
import { useRequest } from "shared/dataAccess/useRequest";
import JsonResulObjectDataDTO from "shared/DTOs/JsonResulObjectDataDTO";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";
import { selectAdmSettings } from "shared/infrastructure/store/admSettings/admSettingsSlice";
import { useAdmSettingsSlice } from "shared/infrastructure/store/admSettings/useAdmSettingsSlice";
import TableOfKeysModel from "shared/models/TableOfKeysModel";

import Stack from "@mui/material/Stack";

import ChangePassword from "./changePassword/ChangePassword";
import Register from "./register/Register";
import UsersList from "./usersList/UsersList";

const Users = () => {
  // Store
  const admSettings = useSelector(selectAdmSettings);

  // Constants
  const { handleAdmSettingsUpdate } = useAdmSettingsSlice();

  /**
   * Get data
   */
  const { isLoading } = useRequest<JsonResulObjectDataDTO<TableOfKeysModel[]>>(
    {
      baseUrl: process.env.REACT_APP_API_BASE_URL,
      url: (process.env.REACT_APP_API_URL ?? "") + "AdmSettingsController.php",
      params: new URLSearchParams({
        function: "getRoleList",
      }),
    },
    {
      Success: false,
      ErrMsg: "",
      Data: [],
    },
    [],
    {
      apply: true,
      condition: () => admSettings._roleListLoaded === false,
    },
    (data) => {
      const dataType = typeof data;

      if (dataType === "string") {
        AppNotification("Chyba", String(data), "danger");
      } else {
        if (data.Success) {
          handleAdmSettingsUpdate({
            RoleList: data?.Data ?? [],
            _roleListLoaded: true,
          });
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
          <PageTitle title="Uživatelé" />
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
