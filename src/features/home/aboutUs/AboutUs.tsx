import KromLandService from "features/KromLandService";
import SectionStyled from "features/styledComponents/SectionStyled";
import { useSelector } from "react-redux";
import SectionSubTitle from "shared/components/sectionSubTitle/SectionSubTitle";
import SectionTitle from "shared/components/sectionTitle/SectionTitle";
import AppTextEditor from "shared/components/textEditor/AppTextEditor";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";
import { useWebPartsSlice } from "shared/infrastructure/store/webParts/useWebPartsSlice";
import { selectHome } from "shared/infrastructure/store/webParts/webPartsSlice";
import ImageModel from "shared/models/ImageModel";
import { nameof } from "shared/nameof";
import HomeImageType from "shared/types/HomeImageType";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import FileUpload from "../../../shared/components/fileUpload/FileUpload";
import HomeModel from "../models/HomeModel";

const AboutUs = () => {
  // Store
  const home = useSelector(selectHome);

  // Constants
  const _kromLandService = new KromLandService();
  const { handleHomeUpdate, handleHomeImageUpdate } = useWebPartsSlice();

  // Other
  const handleTextEditorOnBlur = (value: string, name: string) => {
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

    const result = await _kromLandService.saveImageHome(image, name);

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
        <Stack spacing={2} direction='column'>
          <SectionSubTitle title='Popis' />
          <AppTextEditor
            name={nameof<HomeModel>("AboutUs")}
            value={home.AboutUs}
            placeholder='Popis'
            required
            onChange={handleTextEditorOnBlur}
          />

          <Box className='sub-section-separator'>
            <SectionSubTitle title='Obrázek' />
            <FileUpload
              image={home.AboutUsImage}
              name={nameof<HomeModel>("AboutUsImage")}
              label='Ideální rozlišení obrázku 600 x 600px. Max. velikost 1MB'
              supportedExtensions={["png", "jpg", "jpeg"]}
              newImageAlt='Rodina je základ všeho | KROM Land'
              maxFileSize={1}
              onAfterFileUpload={handleOnAfterFileUpload}
              onAfterFileDelete={handleOnAfterFileDelete}
              onFileSave={handleOnFileSave}
            />
          </Box>
        </Stack>
      </SectionStyled>
    </ErrorBoundary>
  );
};

export default AboutUs;
