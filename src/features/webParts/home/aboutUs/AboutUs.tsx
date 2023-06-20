import ImageService from "features/ImageService";
import SectionStyled from "features/styledComponents/SectionStyled";
import { useSelector } from "react-redux";
import ImageUpload from "shared/components/imageUpload/ImageUpload";
import SectionSubTitle from "shared/components/sectionSubTitle/SectionSubTitle";
import SectionTitle from "shared/components/sectionTitle/SectionTitle";
import AppTextEditor from "shared/components/textEditor/AppTextEditor";
import { ImageLocationEnum } from "shared/enums/ImageLocationEnum";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";
import { useWebPartsSlice } from "shared/infrastructure/store/webParts/useWebPartsSlice";
import { selectHome } from "shared/infrastructure/store/webParts/webPartsSlice";
import ImageModel from "shared/models/ImageModel";
import { nameof } from "shared/nameof";
import HomeImageType from "shared/types/HomeImageType";

import Box from "@mui/material/Box";

import HomeModel from "../models/HomeModel";

interface IProps {
  disable: boolean;
}

const AboutUs = (props: IProps) => {
  // Store
  const home = useSelector(selectHome);

  // Constants
  const _imageService = new ImageService();
  const { handleHomeUpdate, handleHomeImageUpdate } = useWebPartsSlice();

  // Other
  const handleTextEditorOnChange = (value: string, name: string) => {
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

    const result = await _imageService.imageSave(
      image,
      name,
      ImageLocationEnum.HOME,
      home.Id
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
        <SectionTitle title='O nás' />
        <SectionSubTitle title='Popis' />
        <AppTextEditor
          name={nameof<HomeModel>("AboutUs")}
          value={home.AboutUs}
          placeholder='Popis'
          required
          disable={props.disable}
          onChange={handleTextEditorOnChange}
        />

        <Box className='sub-section-separator'>
          <SectionSubTitle title='Obrázek' />
          <ImageUpload
            image={home.AboutUsImage}
            name={nameof<HomeModel>("AboutUsImage")}
            label='Ideální rozlišení obrázku 1000 x 1000px. Max. velikost 1MB'
            supportedExtensions={["png", "jpg", "jpeg", "webp"]}
            newImageAlt='Rodina je základ všeho | KROM Land'
            maxFileSize={1}
            location={ImageLocationEnum.HOME}
            id={home.Id}
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

export default AboutUs;
