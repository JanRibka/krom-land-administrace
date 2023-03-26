import SectionStyled from 'features/styledComponents/SectionStyled';
import { useSelector } from 'react-redux';
import SectionTitle from 'shared/components/sectionTitle/SectionTitle';
import ErrorBoundary from 'shared/infrastructure/ErrorBoundary';
import { useWebPartsSlice } from 'shared/infrastructure/store/webParts/useWebPartsSlice';
import { selectGallery } from 'shared/infrastructure/store/webParts/webPartsSlice';

import Button from '@mui/material/Button';

import ButtonWrapperStyled from './styledComponents/ButtonWrapperStyled';

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
        result.push(<>asdfa</>);
        // result.push(
        //   <Document
        //     key={"documentToDownload_" + uuidv4()}
        //     index={index}
        //     documentCount={documentCount}
        //     document={document.Document}
        //   />
        // );
      }
    });

    return result;
  };

  return (
    <ErrorBoundary>
      <SectionStyled component='section'>
        <SectionTitle title='Obrázky' />

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
