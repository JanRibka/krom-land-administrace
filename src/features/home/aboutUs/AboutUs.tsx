import SectionStyled from 'features/styledComponents/SectionStyled';
import { useSelector } from 'react-redux';
import SectionTitle from 'shared/components/sectionTitle/SectionTitle';
import AppTextArea from 'shared/components/textArea/AppTextArea';
import ErrorBoundary from 'shared/infrastructure/ErrorBoundary';
import { useWebPartsSlice } from 'shared/infrastructure/store/webParts/useWebPartsSlice';
import { selectHome } from 'shared/infrastructure/store/webParts/webPartsSlice';
import { nameof } from 'shared/nameof';

import Stack from '@mui/material/Stack';

import FileUpload from '../../../shared/components/fileUpload/FileUpload';
import HomeModel from '../models/HomeModel';

const AboutUs = () => {
  // Store
  const home = useSelector(selectHome);

  // Constants
  const { handleHomeUpdate } = useWebPartsSlice();

  // Other
  const handleTextAreaOnBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    const name: string = e.target.name;
    const value: string = e.target.value;

    handleHomeUpdate({ [name]: value });
  };

  return (
    <ErrorBoundary>
      <SectionStyled component='section'>
        <SectionTitle title='O nás' />
        <Stack spacing={2} direction='column'>
          <AppTextArea
            name={nameof<HomeModel>("AboutUs")}
            label='Popis'
            value={home.AboutUs}
            fullWidth
            required
            rows={4}
            maxLength={1000}
            onBlur={handleTextAreaOnBlur}
          />

          <FileUpload
            FileName=''
            Name=''
            Label=''
            SupportedExtensions={["png", "jpg", "jpeg"]}
            MaxFileSize={5}
          />
        </Stack>
      </SectionStyled>
    </ErrorBoundary>
  );
};

export default AboutUs;
