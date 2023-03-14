import SectionStyled from "features/styledComponents/SectionStyled";
import { useSelector } from "react-redux";
import FileUpload from "shared/components/fileUpload/FileUpload";
import AppPageHeader from "shared/components/pageHeader/AppPageHeader";
import SectionSubTitle from "shared/components/sectionSubTitle/SectionSubTitle";
import SectionTitle from "shared/components/sectionTitle/SectionTitle";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";
import { useWebPartsSlice } from "shared/infrastructure/store/webParts/useWebPartsSlice";
import { selectHome } from "shared/infrastructure/store/webParts/webPartsSlice";
import { nameof } from "shared/nameof";

import Box from "@mui/material/Box";

import HomeModel from "../models/HomeModel";

const PageHeader = () => {
  // Store
  const home = useSelector(selectHome);

  // Constants
  const { handleHomeUpdate } = useWebPartsSlice();

  // Other
  const handleTextFieldOnBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    const name: string = e.target.name;
    const value: string = e.target.value;

    handleHomeUpdate({ [name]: value });
  };

  return (
    <ErrorBoundary>
      <SectionStyled component='section'>
        <SectionTitle title='Hlavička stránky' />
        <SectionSubTitle title='Hlavní text' />
        <AppPageHeader
          nameText={nameof<HomeModel>("PageHeaderTextMain")}
          valueText={home.PageHeaderTextMain}
          nameColor={nameof<HomeModel>("PageHeaderTextMainColor")}
          valueColor={home.PageHeaderTextMainColor}
          handleTextFieldOnBlur={handleTextFieldOnBlur}
        />
        <Box className='sub-section-separator'>
          <SectionSubTitle title='Vedlejší text' />
          <AppPageHeader
            nameText={nameof<HomeModel>("PageHeaderTextSecondary")}
            valueText={home.PageHeaderTextSecondary}
            nameColor={nameof<HomeModel>("PageHeaderTextSecondaryColor")}
            valueColor={home.PageHeaderTextSecondaryColor}
            handleTextFieldOnBlur={handleTextFieldOnBlur}
          />
        </Box>
        <Box className='sub-section-separator'>
          <SectionSubTitle title='Obrázek' />
          <FileUpload
            FileName=''
            Name=''
            Label=''
            SupportedExtensions={["png", "jpg", "jpeg"]}
            MaxFileSize={5}
          />
        </Box>
      </SectionStyled>
    </ErrorBoundary>
  );
};

export default PageHeader;
