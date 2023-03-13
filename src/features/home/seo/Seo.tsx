import SectionStyled from "features/styledComponents/SectionStyled";
import SectionTitle from "shared/components/sectionTitle/SectionTitle";
import AppTextField from "shared/components/textField/AppTextField";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";

import Stack from "@mui/material/Stack";

const Seo = () => {
  return (
    <ErrorBoundary>
      <SectionStyled component='section'>
        <SectionTitle mainText='Seo' />
        <Stack spacing={2} direction='row'>
          <AppTextField
            name=''
            label='Nadpis stránky'
            value=''
            variant='outlined'
            fullWidth
            required
            autoComplete='off'
            onBlur={() => {}}
          />
          <AppTextField
            name=''
            label='Popis stránky'
            value=''
            variant='outlined'
            fullWidth
            required
            autoComplete='off'
            onBlur={() => {}}
          />
        </Stack>
      </SectionStyled>
    </ErrorBoundary>
  );
};

export default Seo;
