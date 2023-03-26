import SectionStyled from 'features/styledComponents/SectionStyled';
import SectionTitle from 'shared/components/sectionTitle/SectionTitle';
import ErrorBoundary from 'shared/infrastructure/ErrorBoundary';

const GalleryImages = () => {
  return (
    <ErrorBoundary>
      <SectionStyled component='section'>
        <SectionTitle title='Obrázky' />
      </SectionStyled>
    </ErrorBoundary>
  );
};

export default GalleryImages;
