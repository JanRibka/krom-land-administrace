import FeatureStyled from "features/styledComponents/FeatureStyled";
import { useState } from "react";
import { useSelector } from "react-redux";
import Footer from "shared/components/footer/Footer";
import AppLoader from "shared/components/loader/AppLoader";
import AppNotification from "shared/components/notification/AppNotification";
import PageTitle from "shared/components/pageTitle/PageTitle";
import { useRequest } from "shared/dataAccess/useRequest";
import GalleryDTO from "shared/DTOs/GalleryDTO";
import JsonResulObjectDataDTO from "shared/DTOs/JsonResulObjectDataDTO";
import { UserRoleEnum } from "shared/enums/UserRoleEnum";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";
import { selectAuthentication } from "shared/infrastructure/store/authentication/authenticationSlice";
import { useWebPartsSlice } from "shared/infrastructure/store/webParts/useWebPartsSlice";
import { selectGallery } from "shared/infrastructure/store/webParts/webPartsSlice";

import { Stack } from "@mui/system";

import WebPartsService from "../WebPartsService";
import ExternalGalleryLink from "./externalGalleryLink/ExternalGalleryLink";
import GalleryImages from "./galleryImages/GalleryImages";
import PageHeader from "./pageHeader/PageHeader";
import { mapFromGalleryDTO } from "./save/mapFromGalleryDTO";
import Seo from "./seo/Seo";

const Gallery = () => {
  // State
  const [saving, setSaving] = useState<boolean>(false);

  // Store
  const gallery = useSelector(selectGallery);
  const authentication = useSelector(selectAuthentication);

  // Constants
  const _webPartsService = new WebPartsService();
  const { handleGalleryUpdate } = useWebPartsSlice();
  const disable = authentication.UserRole === UserRoleEnum.USER;

  /**
   * Get data
   */
  const { isLoading } = useRequest<JsonResulObjectDataDTO<GalleryDTO>>(
    {
      url: (process.env.REACT_APP_API_URL ?? "") + "WebPartsController.php",
      params: new URLSearchParams({
        function: "getGallery",
      }),
    },
    {
      Success: false,
      ErrMsg: "",
      Data: new GalleryDTO(),
    },
    [],
    {
      apply: true,
      condition: () => gallery._dataLoaded === false,
    },
    (data) => {
      const dataType = typeof data;

      if (dataType === "string") {
        AppNotification("Chyba", String(data), "danger");
      } else {
        if (data.Success) {
          handleGalleryUpdate(mapFromGalleryDTO(data?.Data));
        } else {
          AppNotification("Chyba", data.ErrMsg ?? "", "danger");
        }
      }
    }
  );

  const handleSaveOnClick = async () => {
    if (saving) return;

    setSaving(true);

    await _webPartsService.galleryUpdate();

    setSaving(false);
  };

  return (
    <ErrorBoundary>
      <FeatureStyled>
        <Stack spacing={4}>
          <PageTitle title="Galerie" />
          <Seo disable={disable} />
          <PageHeader disable={disable} />
          <GalleryImages disable={disable} />
          <ExternalGalleryLink disable={disable} />
        </Stack>

        {isLoading && <AppLoader />}
      </FeatureStyled>

      <Footer
        disable={!gallery._dataLoaded || disable}
        loading={saving}
        handleSaveOnClick={handleSaveOnClick}
      />
    </ErrorBoundary>
  );
};

export default Gallery;
