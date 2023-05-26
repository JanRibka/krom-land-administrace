import SectionStyled from "features/styledComponents/SectionStyled";
import SectionTitle from "shared/components/sectionTitle/SectionTitle";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";

import RegistrationsTable from "./table/RegistrationsTable";

const Users = () => {
  return (
    <ErrorBoundary>
      <SectionStyled component='section'>
        <SectionTitle title='Rezervace' />
        <RegistrationsTable />
      </SectionStyled>
    </ErrorBoundary>
  );
};

export default Users;
