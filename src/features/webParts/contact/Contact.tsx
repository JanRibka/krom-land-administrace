import FeatureStyled from "features/styledComponents/FeatureStyled";
import { useState } from "react";
import { useSelector } from "react-redux";
import Footer from "shared/components/footer/Footer";
import AppLoader from "shared/components/loader/AppLoader";
import AppNotification from "shared/components/notification/AppNotification";
import PageTitle from "shared/components/pageTitle/PageTitle";
import { useRequest } from "shared/dataAccess/useRequest";
import ContactDTO from "shared/DTOs/ContactDTO";
import JsonResulObjectDataDTO from "shared/DTOs/JsonResulObjectDataDTO";
import { UserRoleEnum } from "shared/enums/UserRoleEnum";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";
import { selectAuthentication } from "shared/infrastructure/store/authentication/authenticationSlice";
import { useWebPartsSlice } from "shared/infrastructure/store/webParts/useWebPartsSlice";
import { selectContact } from "shared/infrastructure/store/webParts/webPartsSlice";

import Stack from "@mui/material/Stack";

import WebPartsService from "../WebPartsService";
import Email from "./email/Email";
import GoogleMaps from "./googleMaps/GoogleMaps";
import PageHeader from "./pageHeader/PageHeader";
import { mapFromContactDTO } from "./save/mapFromContactDTO";
import Seo from "./seo/Seo";

const Contact = () => {
  // State
  const [saving, setSaving] = useState<boolean>(false);

  // Store
  const contact = useSelector(selectContact);
  const authentication = useSelector(selectAuthentication);

  // Constants
  const _webPartsService = new WebPartsService();
  const { handleContactUpdate } = useWebPartsSlice();
  const disable = authentication.UserRole === UserRoleEnum.USER;

  /**
   * Get data
   */
  const { isLoading } = useRequest<JsonResulObjectDataDTO<ContactDTO>>(
    {
      url: (process.env.REACT_APP_API_URL ?? "") + "WebPartsController.php",
      params: new URLSearchParams({
        function: "getContact",
      }),
    },
    {
      Success: false,
      ErrMsg: "",
      Data: new ContactDTO(),
    },
    [],
    {
      apply: true,
      condition: () => contact._dataLoaded === false,
    },
    (data) => {
      const dataType = typeof data;
      console.log(data);
      if (dataType === "string") {
        AppNotification("Chyba", String(data), "danger");
      } else {
        if (data.Success) {
          handleContactUpdate(mapFromContactDTO(data?.Data));
        } else {
          AppNotification("Chyba", data.ErrMsg ?? "", "danger");
        }
      }
    }
  );

  const handleSaveOnClick = async () => {
    if (saving) return;

    setSaving(true);

    await _webPartsService.contactUpdate();

    setSaving(false);
  };

  return (
    <ErrorBoundary>
      <FeatureStyled>
        <Stack spacing={4}>
          <PageTitle title='Kontakt' />
          <Seo disable={disable} />
          <PageHeader disable={disable} />
          <GoogleMaps disable={disable} />
          <Email disable={disable} />
        </Stack>

        {isLoading && <AppLoader />}
      </FeatureStyled>

      <Footer
        disable={!contact._dataLoaded || disable}
        loading={saving}
        handleSaveOnClick={handleSaveOnClick}
      />
    </ErrorBoundary>
  );
};

export default Contact;
