import FeatureStyled from "features/styledComponents/FeatureStyled";
import { useState } from "react";
import { useSelector } from "react-redux";
import Footer from "shared/components/footer/Footer";
import AppLoader from "shared/components/loader/AppLoader";
import AppNotification from "shared/components/notification/AppNotification";
import PageTitle from "shared/components/pageTitle/PageTitle";
import { useRequest } from "shared/dataAccess/useRequest";
import JsonResulObjectDataDTO from "shared/DTOs/JsonResulObjectDataDTO";
import WebSettingsDTO from "shared/DTOs/WebSettingsDTO";
import { UserRoleEnum } from "shared/enums/UserRoleEnum";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";
import { selectAuthentication } from "shared/infrastructure/store/authentication/authenticationSlice";
import { useWebSettingsSlice } from "shared/infrastructure/store/webSettings/useWebSettingsSlice";
import { selectWebSettings } from "shared/infrastructure/store/webSettings/webSettingsSlice";

import { Stack } from "@mui/system";

import WebSettingsService from "../WebSettingsService";
import Address from "./address/Address";
import Contact from "./contact/Contact";
import { mapFromWebSettingsDTO } from "./save/mapFromWebSettingsDTO";
import SocialLinks from "./socialLinks/SocialLinks";
import Subject from "./subject/Subject";

const WebSettings = () => {
  // State
  const [saving, setSaving] = useState<boolean>(false);

  // Store
  const webSettings = useSelector(selectWebSettings);
  const authentication = useSelector(selectAuthentication);

  // Constants
  const _webSettingsService = new WebSettingsService();
  const { handleWebSettingsUpdate } = useWebSettingsSlice();
  const disable = authentication.UserRole === UserRoleEnum.USER;

  /**
   * Get data
   */
  const { isLoading } = useRequest<JsonResulObjectDataDTO<WebSettingsDTO>>(
    {
      baseUrl: process.env.REACT_APP_API_BASE_URL,
      url: (process.env.REACT_APP_API_URL ?? "") + "WebSettingsController.php",
      params: new URLSearchParams({
        function: "getWebSettings",
      }),
    },
    {
      Success: false,
      ErrMsg: "",
      Data: new WebSettingsDTO(),
    },
    [],
    {
      apply: true,
      condition: () => webSettings._dataLoaded === false,
    },
    (data) => {
      const dataType = typeof data;

      if (dataType === "string") {
        AppNotification("Chyba", String(data), "danger");
      } else {
        if (data.Success) {
          handleWebSettingsUpdate(mapFromWebSettingsDTO(data?.Data));
        } else {
          AppNotification("Chyba", data.ErrMsg ?? "", "danger");
        }
      }
    }
  );

  const handleSaveOnClick = async () => {
    if (saving) return;

    setSaving(true);

    await _webSettingsService.webSettingsUpdate();

    setSaving(false);
  };

  return (
    <ErrorBoundary>
      <FeatureStyled>
        <Stack spacing={4}>
          <PageTitle title="Nastavení webu" />
          <SocialLinks disable={disable} />
          <Subject disable={disable} />
          <Address disable={disable} />
          <Contact disable={disable} />
        </Stack>

        {isLoading && <AppLoader />}
      </FeatureStyled>

      <Footer
        disable={!webSettings._dataLoaded || disable}
        loading={saving}
        handleSaveOnClick={handleSaveOnClick}
      />
    </ErrorBoundary>
  );
};

export default WebSettings;
