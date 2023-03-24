import DocumentToDownloadModel from "features/actions/models/DocumentToDownloadModel";
import KromLandService from "features/KromLandService";
import { useSelector } from "react-redux";
import DocumentUpload from "shared/components/fileUpload/DocumentUpload";
import { useWebPartsSlice } from "shared/infrastructure/store/webParts/useWebPartsSlice";
import { selectActions } from "shared/infrastructure/store/webParts/webPartsSlice";
import DocumentModel from "shared/models/DocumentModel";
import { nameof } from "shared/nameof";

import Box from "@mui/material/Box";

interface IProps {
  index: number;
  documentCount: number;
  document: DocumentModel;
}

const Document = (props: IProps) => {
  // Store
  const actions = useSelector(selectActions);

  // Constants
  const _kromLandService = new KromLandService();
  const { handleActionsDocumentUpdate } = useWebPartsSlice();
  const documentToDownload = { ...actions.DocumentsToDownload[props.index] };

  // Other
  const handleOnAfterFileUpload = (
    fileName: string,
    name: string,

    destination: string
  ) => {
    const image = new DocumentModel({
      Path: (process.env.PUBLIC_URL ?? "") + destination + fileName,
      Name: fileName,
    });

    handleActionsDocumentUpdate({ [name]: image }, props.index);
  };

  const handleOnFileSave = async (name: string) => {
    let document = { ...documentToDownload.Document };

    document = {
      ...document,
      Path: (process.env.REACT_APP_WEB_PUBLIC_IMG_URL ?? "") + document.Name,
    };

    const result = await _kromLandService.saveDocument(
      document,
      documentToDownload.Id
    );

    if (result) {
      handleActionsDocumentUpdate({ [name]: document }, props.index);
    }
  };

  const handleDeleteDocumentOnClick = () => {
    handleActionsDocumentUpdate({ Delete: true }, props.index);
  };

  return (
    <Box>
      <DocumentUpload
        document={props.document}
        id={documentToDownload.Id}
        name={nameof<DocumentToDownloadModel>("Document")}
        label='Max. velikost dokumentu 1MB'
        supportedExtensions={["pdf"]}
        maxFileSize={1}
        onAfterFileUpload={handleOnAfterFileUpload}
        onAfterFileDelete={handleDeleteDocumentOnClick}
        onFileSave={handleOnFileSave}
      />
    </Box>
  );
};

export default Document;
