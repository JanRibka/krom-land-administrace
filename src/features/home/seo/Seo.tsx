import SectionStyled from "features/styledComponents/SectionStyled";
import { useSelector } from "react-redux";
import SectionTitle from "shared/components/sectionTitle/SectionTitle";
import AppTextField from "shared/components/textField/AppTextField";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";
import { useWebPartsSlice } from "shared/infrastructure/store/webParts/useWebPartsSlice";
import { selectHome } from "shared/infrastructure/store/webParts/webPartsSlice";
import { nameof } from "shared/nameof";

import Stack from "@mui/material/Stack";

import HomeModel from "../models/HomeModel";

const Seo = () => {
  // Store
  const home = useSelector(selectHome);

  // Constants
  const { handleHomeUpdate } = useWebPartsSlice();

  // Other
  const handleTextFieldOnBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    const name: string = e.target.name;
    const value: string = e.target.value;

    handleHomeUpdate({ [name]: value });
  };

  return (
    <ErrorBoundary>
      <SectionStyled component='section'>
        <SectionTitle title='Seo' />
        <Stack spacing={2} direction='row'>
          <AppTextField
            name={nameof<HomeModel>("Title")}
            label='Nadpis stránky'
            value={home.Title}
            variant='outlined'
            fullWidth
            required
            autoComplete='off'
            onBlur={handleTextFieldOnBlur}
          />
          <AppTextField
            name={nameof<HomeModel>("Description")}
            label='Popis stránky'
            value={home.Description}
            variant='outlined'
            fullWidth
            required
            autoComplete='off'
            onBlur={handleTextFieldOnBlur}
          />
        </Stack>
      </SectionStyled>
    </ErrorBoundary>
  );
};

export default Seo;
