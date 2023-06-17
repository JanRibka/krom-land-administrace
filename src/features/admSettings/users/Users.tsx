import FeatureStyled from 'features/styledComponents/FeatureStyled';
import PageTitle from 'shared/components/pageTitle/PageTitle';
import ErrorBoundary from 'shared/infrastructure/ErrorBoundary';

import Stack from '@mui/material/Stack';

import ChangePassword from './changePassword/ChangePassword';
import UsersList from './usersList/UsersList';

const Users = () => {
  return (
    <ErrorBoundary>
      <FeatureStyled>
        <Stack spacing={4}>
          <PageTitle title='Uživatelé' />
          <UsersList />
          <ChangePassword />
        </Stack>
      </FeatureStyled>
    </ErrorBoundary>
  );
};

export default Users;
