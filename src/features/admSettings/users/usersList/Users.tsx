import FeatureStyled from "features/styledComponents/FeatureStyled";
import PageTitle from "shared/components/pageTitle/PageTitle";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";

import Stack from "@mui/material/Stack";

import UsersList from "../UsersList";

const Users = () => {
  return (
    <ErrorBoundary>
      <FeatureStyled>
        <Stack spacing={4}>
          <PageTitle title='Uživatelé' />
          <UsersList />
        </Stack>
      </FeatureStyled>
    </ErrorBoundary>
  );
};

export default Users;
