import { useSelector } from 'react-redux';
import AppNotification from 'shared/components/notification/AppNotification';
import PageTitle from 'shared/components/pageTitle/PageTitle';
import { useRequest } from 'shared/dataAccess/useRequest';
import HomeDTO from 'shared/DTOs/HomeDTO';
import JsonResulObjectDataDTO from 'shared/DTOs/JsonResulObjectDataDTO';
import ErrorBoundary from 'shared/infrastructure/ErrorBoundary';
import { useWebPartsSlice } from 'shared/infrastructure/store/webParts/useWebPartsSlice';
import { selectHome } from 'shared/infrastructure/store/webParts/webPartsSlice';

import Stack from '@mui/material/Stack';

import AboutUs from './aboutUs/AboutUs';
import OurTeam from './ourTeam/OurTeam';
import PageHeader from './pageHeader/PageHeader';
import { mapFromHomeDTO } from './save/mapFromHomeDTO';
import Seo from './seo/Seo';
import WhatPeopleSay from './whatPeopleSay/WhatPeopleSay';

const Home = () => {
  // Constants
  const home = useSelector(selectHome);
  const { handleHomeUpdate } = useWebPartsSlice();

  /**
   * Get data
   */
  useRequest<JsonResulObjectDataDTO<HomeDTO>>(
    {
      url: (process.env.REACT_APP_API_URL ?? "") + "WebContentController.php",
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
      console.log(data);
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

  return (
    <ErrorBoundary>
      <Stack spacing={4}>
        <PageTitle title='Úvod' />
        <Seo />
        <PageHeader />
        <AboutUs />
        <OurTeam />
        <WhatPeopleSay />
      </Stack>
    </ErrorBoundary>
  );
};

export default Home;
