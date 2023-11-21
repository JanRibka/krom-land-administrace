import FeatureStyled from "features/styledComponents/FeatureStyled";
import PageTitle from "shared/components/pageTitle/PageTitle";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";

import Stack from "@mui/material/Stack";

import TableOfKeys from "./tableOfKeys/TableOfKeys";

const AdmSettings = () => {
  // Get data
  // const { isLoading } = useRequest<JsonResultObjectDataDTO<AdmSettingsDTO>>(
  //   {
  //     url: (process.env.REACT_APP_API_URL ?? "") + "AdmSettingsController.php",
  //     params: new URLSearchParams({
  //       function: "getAdmSettings",
  //     }),
  //   },
  //   {
  //     Success: false,
  //     ErrMsg: "",
  //     Data: new AdmSettingsDTO(),
  //   },
  //   [],
  //   {
  //     apply: true,
  //     condition: () => admSettings._admSettingsLoaded === false,
  //   },
  //   (data) => {
  //     const dataType = typeof data;
  //     console.log(data);
  //     if (dataType === "string") {
  //       AppNotification("Chyba", String(data), "danger");
  //     } else {
  //       if (data.Success) {
  //         handleAdmSettingsUpdate(mapFromAdmSettingsDTO(data?.Data ?? null));
  //       } else {
  //         AppNotification("Chyba", data.ErrMsg ?? "", "danger");
  //       }
  //     }
  //   }
  // );
  return (
    <ErrorBoundary>
      <FeatureStyled>
        <Stack spacing={4}>
          <PageTitle title="Nastavení administrace" />
          <TableOfKeys />
        </Stack>

        {/* {isLoading && <AppLoader />} */}
      </FeatureStyled>
    </ErrorBoundary>
  );
};

export default AdmSettings;
