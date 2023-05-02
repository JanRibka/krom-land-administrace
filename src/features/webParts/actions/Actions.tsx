import FeatureStyled from 'features/styledComponents/FeatureStyled';
import { useSelector } from 'react-redux';
import AppLoader from 'shared/components/loader/AppLoader';
import AppNotification from 'shared/components/notification/AppNotification';
import PageTitle from 'shared/components/pageTitle/PageTitle';
import { useRequest } from 'shared/dataAccess/useRequest';
import ActionsDTO from 'shared/DTOs/ActionsDTO';
import JsonResulObjectDataDTO from 'shared/DTOs/JsonResulObjectDataDTO';
import ErrorBoundary from 'shared/infrastructure/ErrorBoundary';
import { useWebPartsSlice } from 'shared/infrastructure/store/webParts/useWebPartsSlice';
import { selectActions } from 'shared/infrastructure/store/webParts/webPartsSlice';

import { Stack } from '@mui/system';

import ActionDetails from './actionDetails/ActionDetails';
import DocumentsToDownload from './documentsToDownload/DocumentsToDownload';
import Email from './email/Email';
import PageHeader from './pageHeader/PageHeader';
import { mapFromActionsDTO } from './save/mapFromActionsDTO';
import Seo from './seo/Seo';

const Actions = () => {
  // Store
  const actions = useSelector(selectActions);

  // Constants
  const { handleActionsUpdate } = useWebPartsSlice();

  /**
   * Get data
   */
  const { isLoading } = useRequest<JsonResulObjectDataDTO<ActionsDTO>>(
    {
      url: (process.env.REACT_APP_API_URL ?? "") + "WebContentController.php",
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
      console.log(data);
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

  return (
    <ErrorBoundary>
      <FeatureStyled>
        <Stack spacing={4}>
          <PageTitle title='Akce' />
          <Seo />
          <PageHeader />
          <ActionDetails />
          <DocumentsToDownload />
          <Email />
        </Stack>

        {isLoading && <AppLoader />}
      </FeatureStyled>
    </ErrorBoundary>
  );
};

export default Actions;
