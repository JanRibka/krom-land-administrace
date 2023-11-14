import SectionStyled from "features/styledComponents/SectionStyled";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";

const TableOfKeys = () => {
  return (
    <ErrorBoundary>
      <SectionStyled title="Číselníky" />
    </ErrorBoundary>
  );
};

export default TableOfKeys;
