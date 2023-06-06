import SectionStyled from "features/styledComponents/SectionStyled";
import SectionTitle from "shared/components/sectionTitle/SectionTitle";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";

import UsersTable from "./usersList/table/UsersTable";

const UsersList = () => {
  return (
    <ErrorBoundary>
      <SectionStyled component='section'>
        <SectionTitle title='Seznam uživatelů' />
        <UsersTable />
      </SectionStyled>
    </ErrorBoundary>
  );
};

export default UsersList;
