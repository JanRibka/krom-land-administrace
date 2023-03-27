import SectionStyled from "features/styledComponents/SectionStyled";
import { useSelector } from "react-redux";
import SectionTitle from "shared/components/sectionTitle/SectionTitle";
import AppTextField from "shared/components/textField/AppTextField";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";
import { useWebPartsSlice } from "shared/infrastructure/store/webParts/useWebPartsSlice";
import { selectGallery } from "shared/infrastructure/store/webParts/webPartsSlice";
import { nameof } from "shared/nameof";

import GalleryModel from "../models/GalleryModel";

const ExternalGalleryLink = () => {
  // Store
  const gallery = useSelector(selectGallery);

  // Constants
  const { handleGalleryUpdate } = useWebPartsSlice();

  // Other
  const handleTextFieldOnBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    const name: string = e.target.name;
    const value: string = e.target.value;

    handleGalleryUpdate({ [name]: value });
  };

  return (
    <ErrorBoundary>
      <SectionStyled component='section'>
        <SectionTitle title='Odkaz na externí galerii' />

        <AppTextField
          name={nameof<GalleryModel>("ExternalGalleryLink")}
          label='Odkaz'
          value={gallery.ExternalGalleryLink}
          variant='outlined'
          fullWidth
          required
          autoComplete='off'
          onBlur={handleTextFieldOnBlur}
        />
      </SectionStyled>
    </ErrorBoundary>
  );
};

export default ExternalGalleryLink;
