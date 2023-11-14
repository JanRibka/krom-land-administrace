import FeatureStyled from "features/styledComponents/FeatureStyled";
import AppLoader from "shared/components/loader/AppLoader";
import PageTitle from "shared/components/pageTitle/PageTitle";
import { useRequest } from "shared/dataAccess/useRequest";
import JsonResulObjectDataDTO from "shared/DTOs/JsonResulObjectDataDTO";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";

import Stack from "@mui/material/Stack";

const AdmSettings = () => {
  // Get data
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
          <PageTitle title="Nastavení administrace" />
        </Stack>

        {isLoading && <AppLoader />}
      </FeatureStyled>
    </ErrorBoundary>
  );
};

export default AdmSettings;
