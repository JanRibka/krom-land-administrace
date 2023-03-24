import { useSelector } from "react-redux";
import DocumentUpload from "shared/components/fileUpload/DocumentUpload";
import { useWebPartsSlice } from "shared/infrastructure/store/webParts/useWebPartsSlice";
import { selectActions } from "shared/infrastructure/store/webParts/webPartsSlice";
import DocumentModel from "shared/models/DocumentModel";

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
  const { handleActionsDocumentUpdate } = useWebPartsSlice();

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

  return (
    <Box>
      <DocumentUpload
        document={props.document}
        name={""}
        label=''
        supportedExtensions={["pdf"]}
        maxFileSize={1}
        onAfterFileUpload={handleOnAfterFileUpload}
        onAfterFileDelete={() => {}}
        onFileSave={() => {}}
        handleTextFieldOnBlur={() => {}}
      />
    </Box>
  );
};

export default Document;
