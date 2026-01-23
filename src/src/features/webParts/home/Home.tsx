import FeatureStyled from "features/styledComponents/FeatureStyled";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useHomeGetData } from "shared/api/home/hooks/useHomeGetData";
import Footer from "shared/components/footer/Footer";
import AppLoader from "shared/components/loader/AppLoader";
import PageTitle from "shared/components/pageTitle/PageTitle";
import { UserRoleEnum } from "shared/enums/UserRoleEnum";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";
import { selectAuthentication } from "shared/infrastructure/store/authentication/authenticationSlice";
import { selectHome } from "shared/infrastructure/store/webParts/webPartsSlice";

import Stack from "@mui/material/Stack";

import WebPartsService from "../WebPartsService";
import AboutUs from "./aboutUs/AboutUs";
import OurTeam from "./ourTeam/OurTeam";
import PageHeader from "./pageHeader/PageHeader";
import Seo from "./seo/Seo";
import WhatPeopleSay from "./whatPeopleSay/WhatPeopleSay";

const Home = () => {
  // State
  const [saving, setSaving] = useState<boolean>(false);

  // Store
  const home = useSelector(selectHome);
  const authentication = useSelector(selectAuthentication);

  // Constants
  const _webPartsService = new WebPartsService();
  const disable = authentication.UserRole === UserRoleEnum.USER;

  /**
   * Get data
   */
  const { isLoading, refetch } = useHomeGetData();

  const handleSaveOnClick = async () => {
    if (saving) return;

    setSaving(true);

    await _webPartsService.homeUpdate();
    await refetch();

    setSaving(false);
  };

  return (
    <ErrorBoundary>
      <FeatureStyled>
        <Stack spacing={4}>
          <PageTitle title="Úvod" />
          <Seo disable={disable} />
          <PageHeader disable={disable} />
          <AboutUs disable={disable} />
          <OurTeam disable={disable} />
          <WhatPeopleSay disable={disable} />
        </Stack>

        {isLoading && <AppLoader />}
      </FeatureStyled>

      <Footer
        disable={!home._dataLoaded || disable}
        loading={saving}
        handleSaveOnClick={handleSaveOnClick}
      />
    </ErrorBoundary>
  );
};

export default Home;
