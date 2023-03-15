import SectionStyled from "features/styledComponents/SectionStyled";
import { useSelector } from "react-redux";
import FileUpload from "shared/components/fileUpload/FileUpload";
import AppPageHeader from "shared/components/pageHeader/AppPageHeader";
import SectionSubTitle from "shared/components/sectionSubTitle/SectionSubTitle";
import SectionTitle from "shared/components/sectionTitle/SectionTitle";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";
import { useWebPartsSlice } from "shared/infrastructure/store/webParts/useWebPartsSlice";
import { selectGallery } from "shared/infrastructure/store/webParts/webPartsSlice";
import ImageModel from "shared/models/ImageModel";
import { nameof } from "shared/nameof";

import Box from "@mui/material/Box";

import GalleryModel from "../models/GalleryModel";

const PageHeader = () => {
  // Store
  const gallery = useSelector(selectGallery);

  // Constants
  const { handleGalleryUpdate } = useWebPartsSlice();

  // Other
  const handleTextFieldOnBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    const name: string = e.target.name;
    const value: string = e.target.value;

    handleGalleryUpdate({ [name]: value });
  };

  return (
    <ErrorBoundary>
      <SectionStyled component='section'>
        <SectionTitle title='Hlavička stránky' />
        <SectionSubTitle title='Hlavní text' />
        <AppPageHeader
          nameText={nameof<GalleryModel>("PageHeaderTextMain")}
          valueText={gallery.PageHeaderTextMain}
          nameColor={nameof<GalleryModel>("PageHeaderTextMainColor")}
          valueColor={gallery.PageHeaderTextMainColor}
          handleTextFieldOnBlur={handleTextFieldOnBlur}
        />
        <Box className='sub-section-separator'>
          <SectionSubTitle title='Obrázek' />
          <FileUpload
            image={new ImageModel()}
            name=''
            label=''
            supportedExtensions={["png", "jpg", "jpeg"]}
            newImageAlt=''
            maxFileSize={1}
            fileDestination=''
            OnAfterFileUpload={() => {}}
          />
        </Box>
      </SectionStyled>
    </ErrorBoundary>
  );
};

export default PageHeader;
