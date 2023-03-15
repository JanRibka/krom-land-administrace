import PageTitle from 'shared/components/pageTitle/PageTitle';
import ErrorBoundary from 'shared/infrastructure/ErrorBoundary';

import { Stack } from '@mui/system';

import ActionDetails from './actionDetails/Actions';
import PageHeader from './pageHeader/PageHeader';
import Seo from './seo/Seo';

const Actions = () => {
  return (
    <ErrorBoundary>
      <Stack spacing={4}>
        <PageTitle title='Akce' />
        <Seo />
        <PageHeader />
        <ActionDetails />
      </Stack>
    </ErrorBoundary>
  );
};

export default Actions;
