import KromLandService from "features/KromLandService";
import SectionStyled from "features/styledComponents/SectionStyled";
import { useSelector } from "react-redux";
import FileUpload from "shared/components/fileUpload/FileUpload";
import AppPageHeader from "shared/components/pageHeader/AppPageHeader";
import SectionSubTitle from "shared/components/sectionSubTitle/SectionSubTitle";
import SectionTitle from "shared/components/sectionTitle/SectionTitle";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";
import { useWebPartsSlice } from "shared/infrastructure/store/webParts/useWebPartsSlice";
import { selectHome } from "shared/infrastructure/store/webParts/webPartsSlice";
import ImageModel from "shared/models/ImageModel";
import { nameof } from "shared/nameof";
import HomeImageType from "shared/types/HomeImageType";

import Box from "@mui/material/Box";

import HomeModel from "../models/HomeModel";

const PageHeader = () => {
  // Store
  const home = useSelector(selectHome);

  // Constants
  const _kromLandService = new KromLandService();
  const { handleHomeUpdate, handleHomeImageUpdate } = useWebPartsSlice();

  // Other
  const handleTextFieldOnBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    const name: string = e.target.name;
    const value: string = e.target.value;

    handleHomeUpdate({ [name]: value });
  };

  const handleOnAfterFileUpload = (
    fileName: string,
    name: string,
    alt: string,
    destination: string
  ) => {
    const image = new ImageModel({
      Path: (process.env.PUBLIC_URL ?? "") + destination + fileName,
      Alt: alt,
      Name: fileName,
    });

    handleHomeUpdate({ [name]: image });
  };

  const handleOnAfterFileDelete = (name: string) => {
    handleHomeImageUpdate(name as HomeImageType, new ImageModel());
  };

  const handleOnFileSave = async (name: string) => {
    let image: ImageModel = home[name as HomeImageType] as ImageModel;

    image = {
      ...image,
      Path: (process.env.REACT_APP_WEB_PUBLIC_IMG_URL ?? "") + image.Name,
    };

    const result = await _kromLandService.saveImage(
      image,
      name,
      "saveimagehome"
    );

    if (result) {
      handleHomeImageUpdate(name as HomeImageType, {
        Path: (process.env.REACT_APP_WEB_PUBLIC_IMG_URL ?? "") + image.Name,
      });
    }
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
            image={home.MainImage ?? new ImageModel()}
            name={nameof<HomeModel>("MainImage")}
            label='Ideální rozlišení obrázku 1920 x 1280px. Max. velikost 1MB'
            supportedExtensions={["png", "jpg", "jpeg"]}
            newImageAlt='Úvodní obrázek stránky úvod | KROM Land'
            maxFileSize={1}
            onAfterFileUpload={handleOnAfterFileUpload}
            onAfterFileDelete={handleOnAfterFileDelete}
            onFileSave={handleOnFileSave}
          />
        </Box>
      </SectionStyled>
    </ErrorBoundary>
  );
};

export default PageHeader;
