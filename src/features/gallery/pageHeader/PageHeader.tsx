import KromLandService from "features/KromLandService";
import SectionStyled from "features/styledComponents/SectionStyled";
import { useSelector } from "react-redux";
import ImageUpload from "shared/components/imageUpload/ImageUpload";
import AppPageHeader from "shared/components/pageHeader/AppPageHeader";
import SectionSubTitle from "shared/components/sectionSubTitle/SectionSubTitle";
import SectionTitle from "shared/components/sectionTitle/SectionTitle";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";
import { useWebPartsSlice } from "shared/infrastructure/store/webParts/useWebPartsSlice";
import { selectGallery } from "shared/infrastructure/store/webParts/webPartsSlice";
import ImageModel from "shared/models/ImageModel";
import { nameof } from "shared/nameof";
import GalleryImageType from "shared/types/GalleryImageType";

import Box from "@mui/material/Box";

import GalleryModel from "../models/GalleryModel";

const PageHeader = () => {
  // Store
  const gallery = useSelector(selectGallery);

  // Constants
  const _kromLandService = new KromLandService();
  const { handleGalleryUpdate, handleGalleryImageUpdate } = useWebPartsSlice();

  // Other
  const handleTextFieldOnBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    const name: string = e.target.name;
    const value: string = e.target.value;

    handleGalleryUpdate({ [name]: value });
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

    handleGalleryUpdate({ [name]: image });
  };

  const handleOnAfterFileDelete = (name: string) => {
    handleGalleryImageUpdate(name as GalleryImageType, new ImageModel());
  };

  const handleOnFileSave = async (name: string) => {
    let image: ImageModel = gallery[name as GalleryImageType] as ImageModel;

    image = {
      ...image,
      Path: (process.env.REACT_APP_WEB_PUBLIC_IMG_URL ?? "") + image.Name,
    };

    const result = await _kromLandService.saveImage(
      image,
      name,
      "saveimagegallery"
    );

    if (result) {
      handleGalleryImageUpdate(name as GalleryImageType, {
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
          nameText={nameof<GalleryModel>("PageHeaderTextMain")}
          valueText={gallery.PageHeaderTextMain}
          nameColor={nameof<GalleryModel>("PageHeaderTextMainColor")}
          valueColor={gallery.PageHeaderTextMainColor}
          handleTextFieldOnBlur={handleTextFieldOnBlur}
        />
        <Box className='sub-section-separator'>
          <SectionSubTitle title='Obrázek' />
          <ImageUpload
            image={gallery.MainImage ?? new ImageModel()}
            name={nameof<GalleryModel>("MainImage")}
            label='Ideální rozlišení obrázku 1870 x 350px. Max. velikost 1MB'
            supportedExtensions={["png", "jpg", "jpeg", "webp"]}
            newImageAlt='Úvodní obrázek stránky galerie | KROM Land'
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
