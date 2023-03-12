import SectionStyled from 'features/styledComponents/SectionStyled';
import { useTranslation } from 'react-i18next';
import SectionTitle from 'shared/components/sectionTitle/SectionTitle';
import AppTextField from 'shared/components/textField/AppTextField';

import Stack from '@mui/material/Stack';

const Seo = () => {
  // Consts
  const { t } = useTranslation(["home\\seo"]);

  return (
    <SectionStyled component='section'>
      <SectionTitle mainText={t("sectionTitle")} />
      <Stack spacing={2} direction='row'>
        <AppTextField
          name=''
          label={t("title")}
          value=''
          variant='outlined'
          fullWidth
          required
          autoComplete='off'
          onBlur={() => {}}
        />
        <AppTextField
          name=''
          label={t("description")}
          value=''
          variant='outlined'
          fullWidth
          required
          autoComplete='off'
          onBlur={() => {}}
        />
      </Stack>
    </SectionStyled>
  );
};

export default Seo;
