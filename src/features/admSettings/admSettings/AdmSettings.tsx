import FeatureStyled from "features/styledComponents/FeatureStyled";
import { useSelector } from "react-redux";
import AppLoader from "shared/components/loader/AppLoader";
import AppNotification from "shared/components/notification/AppNotification";
import PageTitle from "shared/components/pageTitle/PageTitle";
import { useRequest } from "shared/dataAccess/useRequest";
import AdmSettingsDTO from "shared/DTOs/AdmSettingsDTO";
import JsonResultObjectDataDTO from "shared/DTOs/JsonResulObjectDataDTO";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";
import { selectAdmSettings } from "shared/infrastructure/store/admSettings/admSettingsSlice";

import Stack from "@mui/material/Stack";

import { mapFromAdmSettingsDTO } from "../save/mapFromAdmSettingsDTO";
import TableOfKeys from "./tableOfKeys/TableOfKeys";

const AdmSettings = () => {
  // Store
  const admSettings = useSelector(selectAdmSettings);

  // Get data
  const { isLoading } = useRequest<JsonResultObjectDataDTO<AdmSettingsDTO>>(
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
      condition: () => admSettings._admSettingsLoaded === false,
    },
    (data) => {
      const dataType = typeof data;

      if (dataType === "string") {
        AppNotification("Chyba", String(data), "danger");
      } else {
        if (data.Success) {
          handleAdmSettingsUpdate(mapFromAdmSettingsDTO(data?.Data ?? null));
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
          <PageTitle title="Nastavení administrace" />
          <TableOfKeys />
        </Stack>

        {isLoading && <AppLoader />}
      </FeatureStyled>
    </ErrorBoundary>
  );
};

export default AdmSettings;
function handleAdmSettingsUpdate(arg0: any) {
  throw new Error("Function not implemented.");
}
