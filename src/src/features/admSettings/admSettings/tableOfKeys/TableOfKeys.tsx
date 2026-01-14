import SectionStyled from "features/styledComponents/SectionStyled";
import SectionTitle from "shared/components/sectionTitle/SectionTitle";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";

import TableOfKeysTable from "./table/TableOfKeysTable";

const TableOfKeys = () => {
  return (
    <ErrorBoundary>
      <SectionStyled component="section">
        <SectionTitle title="Číselníky" />
        <TableOfKeysTable />
      </SectionStyled>
    </ErrorBoundary>
  );
};

export default TableOfKeys;
