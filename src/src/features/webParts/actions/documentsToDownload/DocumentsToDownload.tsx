import SectionStyled from "features/styledComponents/SectionStyled";
import { useSelector } from "react-redux";
import SectionTitle from "shared/components/sectionTitle/SectionTitle";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";
import { useWebPartsSlice } from "shared/infrastructure/store/webParts/useWebPartsSlice";
import { selectActions } from "shared/infrastructure/store/webParts/webPartsSlice";
import { v4 as uuidv4 } from "uuid";

import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";

import Document from "./document/Document";
import ButtonWrapperStyled from "./styledComponents/ButtonWrapperStyled";

interface IProps {
  disable: boolean;
}

const DocumentsToDownload = (props: IProps) => {
  // Store
  const actions = useSelector(selectActions);

  // Constants
  const { handleActionsDocumentAdd } = useWebPartsSlice();

  // Other
  const handleAddDocumentOnClick = () => {
    handleActionsDocumentAdd();
  };

  const renderDocuments = () => {
    let documentCount = 0;
    let result: JSX.Element[] = [];

    actions.DocumentsToDownload.forEach((document, index) => {
      documentCount += 1;

      if (!document.Delete) {
        result.push(
          <Document
            key={"documentToDownload_" + uuidv4()}
            index={index}
            documentCount={documentCount}
            document={document.Document}
            disable={props.disable}
          />
        );
      }
    });

    return result;
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
            disabled={props.disable}
            startIcon={<AddIcon />}
          >
            Přidat dokument
          </Button>
        </ButtonWrapperStyled>
      </SectionStyled>
    </ErrorBoundary>
  );
};

export default DocumentsToDownload;
