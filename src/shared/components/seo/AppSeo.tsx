import SectionStyled from "features/styledComponents/SectionStyled";
import SectionTitle from "shared/components/sectionTitle/SectionTitle";
import AppTextField from "shared/components/textField/AppTextField";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";

import HelpCenterOutlinedIcon from "@mui/icons-material/HelpCenterOutlined";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

interface IProps {
  nameTitile: string;
  nameDescription: string;
  valueTitle: string;
  valueDescription: string;
  handleTextFieldOnBlur: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => void;
}

const AppSeo = (props: IProps) => {
  return (
    <ErrorBoundary>
      <SectionStyled component='section'>
        <SectionTitle title='Seo' />
        <Stack spacing={2} direction='column'>
          {/* Title */}
          <Box className='item-wrapper'>
            <AppTextField
              name={props.nameTitile}
              label='Nadpis stránky'
              value={props.valueTitle}
              variant='outlined'
              fullWidth
              required
              autoComplete='off'
              onBlur={props.handleTextFieldOnBlur}
            />
            <HelpCenterOutlinedIcon titleAccess='Nadpis slouží k určení názvu stránky, který se zobrazí v záložce prohlížeče a také výsledcích vyhledávání na internetu. Nadpis stránky by měl být stručný a výstižný a měl by odrážet obsah stránky. Dobrý název stránky může pomoci uživatelům rychle identifikovat, co mohou na stránce najít a také může pomoci s SEO (Search Engine Optimization - optimalizace pro vyhledávače), protože vyhledávače používají název stránky jako jeden z faktorů pro určení relevance stránky v rámci vyhledávání. Délka nadpisu by měla být 50-60 znaků, ne delší.' />
          </Box>
          {/* Description */}
          <Box className='item-wrapper'>
            <AppTextField
              name={props.nameDescription}
              label='Popis stránky'
              value={props.valueDescription}
              variant='outlined'
              fullWidth
              required
              autoComplete='off'
              onBlur={props.handleTextFieldOnBlur}
            />
            <HelpCenterOutlinedIcon titleAccess='Popis slouží k poskytnutí popisu obsahu stránky, který se zobrazuje ve výsledcích vyhledávání na internetu pod názvem stránky. Popis stránky by měl být stručný, informativní a lákat uživatele ke kliknutí na odkaz k této stránce. Dobrý popis stránky může pomoci s SEO (Search Engine Optimization - optimalizace pro vyhledávače), protože vyhledávače také používají popis stránky jako jeden z faktorů pro určení relevance stránky v rámci vyhledávání. Délka popisu by měla být 150-160 znaků, ne delší.' />
          </Box>
        </Stack>
      </SectionStyled>
    </ErrorBoundary>
  );
};

export default AppSeo;
