import FeatureStyled from "features/styledComponents/FeatureStyled";
import { useState } from "react";
import { useSelector } from "react-redux";
import Footer from "shared/components/footer/Footer";
import AppLoader from "shared/components/loader/AppLoader";
import AppNotification from "shared/components/notification/AppNotification";
import PageTitle from "shared/components/pageTitle/PageTitle";
import { useRequest } from "shared/dataAccess/useRequest";
import ActionsDTO from "shared/DTOs/ActionsDTO";
import JsonResulObjectDataDTO from "shared/DTOs/JsonResulObjectDataDTO";
import { UserRoleEnum } from "shared/enums/UserRoleEnum";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";
import { selectAuthentication } from "shared/infrastructure/store/authentication/authenticationSlice";
import { useWebPartsSlice } from "shared/infrastructure/store/webParts/useWebPartsSlice";
import { selectActions } from "shared/infrastructure/store/webParts/webPartsSlice";

import { Stack } from "@mui/system";

import WebPartsService from "../WebPartsService";
import ActionDetails from "./actionDetails/ActionDetails";
import DocumentsToDownload from "./documentsToDownload/DocumentsToDownload";
import Email from "./email/Email";
import PageHeader from "./pageHeader/PageHeader";
import { mapFromActionsDTO } from "./save/mapFromActionsDTO";
import Seo from "./seo/Seo";

const Actions = () => {
  // State
  const [saving, setSaving] = useState<boolean>(false);

  // Store
  const actions = useSelector(selectActions);
  const authentication = useSelector(selectAuthentication);

  // Constants
  const _webPartsService = new WebPartsService();
  const { handleActionsUpdate } = useWebPartsSlice();
  const disable = authentication.UserRole === UserRoleEnum.USER;

  /**
   * Get data
   */
  const { isLoading } = useRequest<JsonResulObjectDataDTO<ActionsDTO>>(
    {
      url: (process.env.REACT_APP_API_URL ?? "") + "WebPartsController.php",
      params: new URLSearchParams({
        function: "getActions",
      }),
    },
    {
      Success: false,
      ErrMsg: "",
      Data: new ActionsDTO(),
    },
    [],
    {
      apply: true,
      condition: () => actions._dataLoaded === false,
    },
    (data) => {
      const dataType = typeof data;

      if (dataType === "string") {
        AppNotification("Chyba", String(data), "danger");
      } else {
        if (data.Success) {
          handleActionsUpdate(mapFromActionsDTO(data?.Data));
        } else {
          AppNotification("Chyba", data.ErrMsg ?? "", "danger");
        }
      }
    }
  );

  const handleSaveOnClick = async () => {
    if (saving) return;

    setSaving(true);

    await _webPartsService.actionsUpdate();

    setSaving(false);
  };

  return (
    <ErrorBoundary>
      <FeatureStyled>
        <Stack spacing={4}>
          <PageTitle title='Akce' />
          <Seo disable={disable} />
          <PageHeader disable={disable} />
          <ActionDetails disable={disable} />
          <DocumentsToDownload disable={disable} />
          <Email disable={disable} />
        </Stack>

        {isLoading && <AppLoader />}
      </FeatureStyled>

      <Footer
        disable={!actions._dataLoaded || disable}
        loading={saving}
        handleSaveOnClick={handleSaveOnClick}
      />
    </ErrorBoundary>
  );
};

export default Actions;
