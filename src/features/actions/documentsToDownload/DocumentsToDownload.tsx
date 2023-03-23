import SectionStyled from "features/styledComponents/SectionStyled";
import SectionTitle from "shared/components/sectionTitle/SectionTitle";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";

const DocumentsToDownload = () => {
  return (
    <ErrorBoundary>
      <SectionStyled component='section'>
        <SectionTitle title='Dokumenty ke stažení' />
      </SectionStyled>
    </ErrorBoundary>
  );
};

export default DocumentsToDownload;
