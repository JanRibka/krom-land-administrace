import FeatureStyled from "features/styledComponents/FeatureStyled";
import { useState } from "react";
import { useSelector } from "react-redux";
import Footer from "shared/components/footer/Footer";
import AppLoader from "shared/components/loader/AppLoader";
import AppNotification from "shared/components/notification/AppNotification";
import PageTitle from "shared/components/pageTitle/PageTitle";
import { useRequest } from "shared/dataAccess/useRequest";
import JsonResulObjectDataDTO from "shared/DTOs/JsonResulObjectDataDTO";
import WebLogosDTO from "shared/DTOs/WebLogosDTO";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";
import { useWebSettingsSlice } from "shared/infrastructure/store/webSettings/useWebSettingsSlice";
import { selectWebLogos } from "shared/infrastructure/store/webSettings/webSettingsSlice";

import { Stack } from "@mui/system";

import HeaderLogo from "./headerLogo/HeaderLogo";
import { mapFromWebLogosDTO } from "./save/mapFromWebLogosDTO";

const WebLogos = () => {
  // State
  const [saving, setSaving] = useState<boolean>(false);

  // Store
  const webLogos = useSelector(selectWebLogos);

  // Constants
  // const _webPartsService = new WebPartsService();
  const { handleLogosUpdate } = useWebSettingsSlice();

  /**
   * Get data
   */
  const { isLoading } = useRequest<JsonResulObjectDataDTO<WebLogosDTO>>(
    {
      url: (process.env.REACT_APP_API_URL ?? "") + "WebSettingsController.php",
      params: new URLSearchParams({
        function: "getWebLogos",
      }),
    },
    {
      Success: false,
      ErrMsg: "",
      Data: new WebLogosDTO(),
    },
    [],
    {
      apply: true,
      condition: () => webLogos._dataLoaded === false,
    },
    (data) => {
      const dataType = typeof data;

      if (dataType === "string") {
        AppNotification("Chyba", String(data), "danger");
      } else {
        if (data.Success) {
          handleLogosUpdate(mapFromWebLogosDTO(data?.Data));
        } else {
          AppNotification("Chyba", data.ErrMsg ?? "", "danger");
        }
      }
    }
  );

  const handleSaveOnClick = async () => {
    if (saving) return;

    setSaving(true);

    // await _webPartsService.actionsUpdate();

    setSaving(false);
  };

  return (
    <ErrorBoundary>
      <FeatureStyled>
        <Stack spacing={4}>
          <PageTitle title='Loga webu' />
          <HeaderLogo />
        </Stack>

        {isLoading && <AppLoader />}
      </FeatureStyled>

      <Footer
        disabled={!webLogos._dataLoaded}
        loading={saving}
        handleSaveOnClick={handleSaveOnClick}
      />
    </ErrorBoundary>
  );
};

export default WebLogos;
