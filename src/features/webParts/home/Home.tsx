import FeatureStyled from 'features/styledComponents/FeatureStyled';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Footer from 'shared/components/footer/Footer';
import AppLoader from 'shared/components/loader/AppLoader';
import AppNotification from 'shared/components/notification/AppNotification';
import PageTitle from 'shared/components/pageTitle/PageTitle';
import { useRequest } from 'shared/dataAccess/useRequest';
import HomeDTO from 'shared/DTOs/HomeDTO';
import JsonResulObjectDataDTO from 'shared/DTOs/JsonResulObjectDataDTO';
import ErrorBoundary from 'shared/infrastructure/ErrorBoundary';
import { useWebPartsSlice } from 'shared/infrastructure/store/webParts/useWebPartsSlice';
import { selectHome } from 'shared/infrastructure/store/webParts/webPartsSlice';

import Stack from '@mui/material/Stack';

import WebPartsService from '../WebPartsService';
import AboutUs from './aboutUs/AboutUs';
import OurTeam from './ourTeam/OurTeam';
import PageHeader from './pageHeader/PageHeader';
import { mapFromHomeDTO } from './save/mapFromHomeDTO';
import Seo from './seo/Seo';
import WhatPeopleSay from './whatPeopleSay/WhatPeopleSay';

const Home = () => {
  // State
  const [saving, setSaving] = useState<boolean>(false);

  // Store
  const home = useSelector(selectHome);

  // Constants
  const _webPartsService = new WebPartsService();
  const { handleHomeUpdate } = useWebPartsSlice();

  /**
   * Get data
   */
  const { isLoading } = useRequest<JsonResulObjectDataDTO<HomeDTO>>(
    {
      url: (process.env.REACT_APP_API_URL ?? "") + "WebPartsController.php",
      params: new URLSearchParams({
        function: "getHome",
      }),
    },
    {
      Success: false,
      ErrMsg: "",
      Data: new HomeDTO(),
    },
    [],
    {
      apply: true,
      condition: () => home._dataLoaded === false,
    },
    (data) => {
      const dataType = typeof data;

      if (dataType === "string") {
        AppNotification("Chyba", String(data), "danger");
      } else {
        if (data.Success) {
          handleHomeUpdate(mapFromHomeDTO(data?.Data));
        } else {
          AppNotification("Chyba", data.ErrMsg ?? "", "danger");
        }
      }
    }
  );

  const handleSaveOnClick = async () => {
    if (saving) return;

    setSaving(true);

    await _webPartsService.homeUpdate();
    const teamMembers = await _webPartsService.getTeamMembers();

    if (!!teamMembers) {
      handleHomeUpdate({ TeamMembers: teamMembers });
    }

    setSaving(false);
  };

  return (
    <ErrorBoundary>
      <FeatureStyled>
        <Stack spacing={4}>
          <PageTitle title='Úvod' />
          <Seo />
          <PageHeader />
          <AboutUs />
          <OurTeam />
          <WhatPeopleSay />
        </Stack>

        {isLoading && <AppLoader />}
      </FeatureStyled>

      <Footer
        disabled={!home._dataLoaded}
        loading={saving}
        handleSaveOnClick={handleSaveOnClick}
      />
    </ErrorBoundary>
  );
};

export default Home;
