import FeatureStyled from 'features/styledComponents/FeatureStyled';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Footer from 'shared/components/footer/Footer';
import AppLoader from 'shared/components/loader/AppLoader';
import AppNotification from 'shared/components/notification/AppNotification';
import PageTitle from 'shared/components/pageTitle/PageTitle';
import { useRequest } from 'shared/dataAccess/useRequest';
import ContactDTO from 'shared/DTOs/ContactDTO';
import JsonResulObjectDataDTO from 'shared/DTOs/JsonResulObjectDataDTO';
import ErrorBoundary from 'shared/infrastructure/ErrorBoundary';
import { useWebPartsSlice } from 'shared/infrastructure/store/webParts/useWebPartsSlice';
import { selectContact } from 'shared/infrastructure/store/webParts/webPartsSlice';

import Stack from '@mui/material/Stack';

import Email from './email/Email';
import GoogleMaps from './googleMaps/GoogleMaps';
import PageHeader from './pageHeader/PageHeader';
import { mapFromContactDTO } from './save/mapFromContactDTO';
import Seo from './seo/Seo';

const Contact = () => {
  // State
  const [saving, setSaving] = useState<boolean>(false);

  // Store
  const contact = useSelector(selectContact);

  // Constants
  const { handleContactUpdate } = useWebPartsSlice();

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

  const handleSaveOnClick = () => {
    debugger;
  };

  return (
    <ErrorBoundary>
      <FeatureStyled>
        <Stack spacing={4}>
          <PageTitle title='Kontakt' />
          <Seo />
          <PageHeader />
          <GoogleMaps />
          <Email />
        </Stack>

        {isLoading && <AppLoader />}
      </FeatureStyled>

      <Footer
        disabled={!contact._dataLoaded}
        loading={saving}
        handleSaveOnClick={handleSaveOnClick}
      />
    </ErrorBoundary>
  );
};

export default Contact;
