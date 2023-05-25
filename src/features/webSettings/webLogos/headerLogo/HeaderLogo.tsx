import ImageService from "features/ImageService";
import SectionStyled from "features/styledComponents/SectionStyled";
import { useSelector } from "react-redux";
import ImageUpload from "shared/components/imageUpload/ImageUpload";
import SectionTitle from "shared/components/sectionTitle/SectionTitle";
import { ImageLocationEnum } from "shared/enums/ImageLocationEnum";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";
import { useWebSettingsSlice } from "shared/infrastructure/store/webSettings/useWebSettingsSlice";
import { selectWebLogos } from "shared/infrastructure/store/webSettings/webSettingsSlice";
import ImageModel from "shared/models/ImageModel";
import { nameof } from "shared/nameof";

import WebLogosModel from "../models/WebLogosModel";

const HeaderLogo = () => {
  // Store
  const webLogos = useSelector(selectWebLogos);

  // Constants
  const _imageService = new ImageService();
  const { handleLogosUpdate } = useWebSettingsSlice();

  // Other
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

    handleLogosUpdate({ [name]: image });
  };

  const handleOnAfterFileDelete = (name: string) => {
    handleLogosUpdate({ [name]: new ImageModel() });
  };

  const handleOnFileSave = async (name: string) => {
    let image: ImageModel = webLogos[name as "HeaderLogo"] as ImageModel;

    image = {
      ...image,
      Path: (process.env.REACT_APP_WEB_PUBLIC_IMG_URL ?? "") + image.Name,
    };

    const result = await _imageService.imageSave(
      image,
      name,
      ImageLocationEnum.WEB_LOGOS,
      webLogos.Id
    );

    if (result) {
      handleLogosUpdate({
        [name]: image,
      });
    }
  };

  return (
    <ErrorBoundary>
      <SectionStyled component='section'>
        <SectionTitle title='Hlavička stránky' />

        <ImageUpload
          image={webLogos.HeaderLogo ?? new ImageModel()}
          name={nameof<WebLogosModel>("HeaderLogo")}
          label='Ideální rozlišení loga 252 x 100px. Max. velikost 1MB'
          supportedExtensions={["png", "svg"]}
          newImageAlt='Logo hlavičky | KROM Land'
          maxFileSize={1}
          location={ImageLocationEnum.WEB_LOGOS}
          id={webLogos.Id}
          onAfterFileUpload={handleOnAfterFileUpload}
          onAfterFileDelete={handleOnAfterFileDelete}
          onFileSave={handleOnFileSave}
        />
      </SectionStyled>
    </ErrorBoundary>
  );
};

export default HeaderLogo;
