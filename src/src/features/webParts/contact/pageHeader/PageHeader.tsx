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
import { selectContact } from "shared/infrastructure/store/webParts/webPartsSlice";
import ImageModel from "shared/models/ImageModel";
import { nameof } from "shared/nameof";
import ContactImageType from "shared/types/ContactImageType";

import Box from "@mui/material/Box";

import { ContactModel } from "../models/ContactModel";

interface IProps {
  disable: boolean;
}

const PageHeader = (props: IProps) => {
  // Store
  const contact = useSelector(selectContact);

  // Constants
  const _imageService = new ImageService();
  const { handleContactUpdate, handleContactImageUpdate } = useWebPartsSlice();

  // Other
  const handleTextFieldOnBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
  ) => {
    const name: string = e.target.name;
    const value: string = e.target.value;

    handleContactUpdate({ [name]: value });
  };

  const handleOnAfterFileUpload = (
    fileName: string,
    name: string,
    alt: string,
    destination: string,
  ) => {
    const image = new ImageModel({
      path: (process.env.PUBLIC_URL ?? "") + destination + fileName,
      alt: alt,
      name: fileName,
    });

    handleContactUpdate({ [name]: image });
  };

  const handleOnAfterFileDelete = (name: string) => {
    handleContactImageUpdate(name as ContactImageType, new ImageModel());
  };

  const handleOnFileSave = async (name: string) => {
    let image: ImageModel = contact[name as ContactImageType] as ImageModel;

    image = {
      ...image,
      path: (process.env.REACT_APP_WEB_PUBLIC_IMG_URL ?? "") + image.name,
    };

    const result = await _imageService.imageSave(
      image,
      name,
      ImageLocationEnum.CONTACT,
      contact.Id,
    );

    if (result) {
      handleContactImageUpdate(name as ContactImageType, {
        path: (process.env.REACT_APP_WEB_PUBLIC_IMG_URL ?? "") + image.name,
      });
    }
  };

  return (
    <ErrorBoundary>
      <SectionStyled component="section">
        <SectionTitle title="Hlavička stránky" />
        <SectionSubTitle title="Hlavní text" />
        <AppPageHeader
          nameText={nameof<ContactModel>("PageHeaderTextMain")}
          valueText={contact.PageHeaderTextMain}
          nameColor={nameof<ContactModel>("PageHeaderTextMainColor")}
          valueColor={contact.PageHeaderTextMainColor}
          disable={props.disable}
          handleTextFieldOnBlur={handleTextFieldOnBlur}
        />
        <Box className="sub-section-separator">
          <SectionSubTitle title="Obrázek" />
          <ImageUpload
            image={contact.MainImage}
            name={nameof<ContactModel>("MainImage")}
            label="Ideální rozlišení obrázku 1903 x 350px. Max. velikost 1MB"
            supportedExtensions={["png", "jpg", "jpeg", "webp"]}
            newImageAlt="Úvodní obrázek stránky kontakt | KROM Land"
            maxFileSize={1}
            location={ImageLocationEnum.CONTACT}
            id={contact.Id}
            disable={props.disable}
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
