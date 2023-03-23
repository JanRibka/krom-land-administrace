import ButtonWrapperStyled from 'features/home/ourTeam/styledComponents/ButtonWrapperStyled';
import SectionStyled from 'features/styledComponents/SectionStyled';
import { useSelector } from 'react-redux';
import SectionTitle from 'shared/components/sectionTitle/SectionTitle';
import ErrorBoundary from 'shared/infrastructure/ErrorBoundary';
import { useWebPartsSlice } from 'shared/infrastructure/store/webParts/useWebPartsSlice';
import { selectActions } from 'shared/infrastructure/store/webParts/webPartsSlice';

import Button from '@mui/material/Button';

const DocumentsToDownload = () => {
  // Store
  const actions = useSelector(selectActions);

  // Constants
  const { handleActionsDocumentAdd } = useWebPartsSlice();

  // Other
  const handleAddDocumentOnClick = () => {
    handleActionsDocumentAdd();
  };

  const renderDocuments = () => {
    return actions.DocumentsToDownload.map(() => {
      return <>asdfasd</>;
    });
  };

  return (
    <ErrorBoundary>
      <SectionStyled component='section'>
        <SectionTitle title='Dokumenty ke stažení' />

        {renderDocuments()}

        <ButtonWrapperStyled>
          <Button
            onClick={handleAddDocumentOnClick}
            color='secondary'
            variant='contained'
          >
            Přidat dokument
          </Button>
        </ButtonWrapperStyled>
      </SectionStyled>
    </ErrorBoundary>
  );
};

export default DocumentsToDownload;
