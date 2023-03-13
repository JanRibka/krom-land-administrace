import SectionStyled from "features/styledComponents/SectionStyled";
import { useSelector } from "react-redux";
import SectionSubTitle from "shared/components/sectionSubTitle/SectionSubTitle";
import SectionTitle from "shared/components/sectionTitle/SectionTitle";
import AppTextArea from "shared/components/textArea/AppTextArea";
import AppTextField from "shared/components/textField/AppTextField";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";
import { useWebPartsSlice } from "shared/infrastructure/store/webParts/useWebPartsSlice";
import { selectHome } from "shared/infrastructure/store/webParts/webPartsSlice";
import { nameof } from "shared/nameof";

import Box from "@mui/system/Box";
import Stack from "@mui/system/Stack";

import HomeModel from "../models/HomeModel";

const WhatPeopleSay = () => {
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
      <SectionStyled>
        <SectionTitle title='Říkají o nás' />
        {/* First person */}
        <SectionSubTitle title='První osoba' />
        <Stack spacing={2} direction='column'>
          <AppTextArea
            name={nameof<HomeModel>("PeopleSay1Text")}
            label='Popis'
            value={home.PeopleSay1Text}
            fullWidth
            required
            rows={4}
            maxLength={1000}
            onBlur={handleTextFieldOnBlur}
          />
          <AppTextField
            name={nameof<HomeModel>("PeopleSay1Name")}
            label='Jméno'
            value={home.PeopleSay1Name}
            variant='outlined'
            fullWidth
            required
            autoComplete='off'
            onBlur={handleTextFieldOnBlur}
          />
        </Stack>

        {/* First person */}
        <Box className='sub-section-separator'>
          <SectionSubTitle title='Druhá osoba' />
          <Stack spacing={2} direction='column'>
            <AppTextArea
              name={nameof<HomeModel>("PeopleSay2Text")}
              label='Popis'
              value={home.PeopleSay2Text}
              fullWidth
              required
              rows={4}
              maxLength={1000}
              onBlur={handleTextFieldOnBlur}
            />
            <AppTextField
              name={nameof<HomeModel>("PeopleSay2Name")}
              label='Jméno'
              value={home.PeopleSay2Name}
              variant='outlined'
              fullWidth
              required
              autoComplete='off'
              onBlur={handleTextFieldOnBlur}
            />
          </Stack>
        </Box>

        {/* Secons person */}
        <Box className='sub-section-separator'>
          <SectionSubTitle title='Třetí osoba' />
          <Stack spacing={2} direction='column'>
            <AppTextArea
              name={nameof<HomeModel>("PeopleSay3Text")}
              label='Popis'
              value={home.PeopleSay3Text}
              fullWidth
              required
              rows={4}
              maxLength={1000}
              onBlur={handleTextFieldOnBlur}
            />
            <AppTextField
              name={nameof<HomeModel>("PeopleSay3Name")}
              label='Jméno'
              value={home.PeopleSay3Name}
              variant='outlined'
              fullWidth
              required
              autoComplete='off'
              onBlur={handleTextFieldOnBlur}
            />
          </Stack>
        </Box>
      </SectionStyled>
    </ErrorBoundary>
  );
};

export default WhatPeopleSay;
