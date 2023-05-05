import ImageService from "features/ImageService";
import SectionStyled from "features/styledComponents/SectionStyled";
import { useSelector } from "react-redux";
import ImageUpload from "shared/components/imageUpload/ImageUpload";
import AppPageHeader from "shared/components/pageHeader/AppPageHeader";
import SectionSubTitle from "shared/components/sectionSubTitle/SectionSubTitle";
import SectionTitle from "shared/components/sectionTitle/SectionTitle";
import { ImageLocationEnum } from "shared/enums/ImageLocationEnum";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";
import { useWebPartsSlice } from "shared/infrastructure/store/webParts/useWebPartsSlice";
import { selectActions } from "shared/infrastructure/store/webParts/webPartsSlice";
import ImageModel from "shared/models/ImageModel";
import { nameof } from "shared/nameof";
import ActionsImageType from "shared/types/ActionsImageType";

import Box from "@mui/material/Box";

import ActionsModel from "../models/ActionsModel";

const PageHeader = () => {
  // Store
  const actions = useSelector(selectActions);

  // Constants
  const _imageService = new ImageService();
  const { handleActionsUpdate, handleActionsImageUpdate } = useWebPartsSlice();

  // Other
  const handleTextFieldOnBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    const name: string = e.target.name;
    const value: string = e.target.value;

    handleActionsUpdate({ [name]: value });
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

    handleActionsUpdate({ [name]: image });
  };

  const handleOnAfterFileDelete = (name: string) => {
    handleActionsImageUpdate(name as ActionsImageType, new ImageModel());
  };

  const handleOnFileSave = async (name: string) => {
    let image: ImageModel = actions[name as ActionsImageType] as ImageModel;

    image = {
      ...image,
      Path: (process.env.REACT_APP_WEB_PUBLIC_IMG_URL ?? "") + image.Name,
    };

    const result = await _imageService.imageSave(
      image,
      name,
      ImageLocationEnum.ACTIONS,
      actions.Id
    );

    if (result) {
      handleActionsImageUpdate(name as ActionsImageType, {
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
          nameText={nameof<ActionsModel>("PageHeaderTextMain")}
          valueText={actions.PageHeaderTextMain}
          nameColor={nameof<ActionsModel>("PageHeaderTextMainColor")}
          valueColor={actions.PageHeaderTextMainColor}
          handleTextFieldOnBlur={handleTextFieldOnBlur}
        />
        <Box className='sub-section-separator'>
          <SectionSubTitle title='Obrázek' />
          <ImageUpload
            image={actions.MainImage}
            name={nameof<ActionsModel>("MainImage")}
            label='Ideální rozlišení obrázku 1903 x 350px. Max. velikost 1MB'
            supportedExtensions={["png", "jpg", "jpeg", "webp"]}
            newImageAlt='Úvodní obrázek stránky akce | KROM Land'
            maxFileSize={1}
            location={ImageLocationEnum.ACTIONS}
            id={actions.Id}
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
