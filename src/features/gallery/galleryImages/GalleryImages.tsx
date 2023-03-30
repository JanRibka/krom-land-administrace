import SectionStyled from "features/styledComponents/SectionStyled";
import { useSelector } from "react-redux";
import SectionTitle from "shared/components/sectionTitle/SectionTitle";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";
import { useWebPartsSlice } from "shared/infrastructure/store/webParts/useWebPartsSlice";
import { selectGallery } from "shared/infrastructure/store/webParts/webPartsSlice";
import { v4 as uuidv4 } from "uuid";

import Button from "@mui/material/Button";

import Image from "./Image/Image";
import ButtonWrapperStyled from "./styledComponents/ButtonWrapperStyled";

const GalleryImages = () => {
  // Store
  const gallery = useSelector(selectGallery);

  // Constants
  const { handleGalleryImageAdd } = useWebPartsSlice();

  // Other
  const handleAddImageOnClick = () => {
    handleGalleryImageAdd();
  };

  const renderImages = () => {
    let imageCount = 0;
    let result: JSX.Element[] = [];

    gallery.Images.forEach((image, index) => {
      imageCount += 1;

      if (!image.Delete) {
        result.push(
          <Image
            key={"galleryImage_" + uuidv4()}
            index={index}
            imageCount={imageCount}
            image={image.Image}
          />
        );
      }
    });

    return result;
  };

  return (
    <ErrorBoundary>
      <SectionStyled component='section'>
        <SectionTitle title='Obrázky - doporučený maximální počet je 12' />

        {renderImages()}

        <ButtonWrapperStyled>
          <Button
            onClick={handleAddImageOnClick}
            color='secondary'
            variant='contained'
          >
            Přidat obrázek
          </Button>
        </ButtonWrapperStyled>
      </SectionStyled>
    </ErrorBoundary>
  );
};

export default GalleryImages;
