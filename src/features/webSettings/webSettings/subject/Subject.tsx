import SectionStyled from "features/styledComponents/SectionStyled";
import { useSelector } from "react-redux";
import SectionTitle from "shared/components/sectionTitle/SectionTitle";
import AppTextField from "shared/components/textField/AppTextField";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";
import { useWebSettingsSlice } from "shared/infrastructure/store/webSettings/useWebSettingsSlice";
import { selectWebSettings } from "shared/infrastructure/store/webSettings/webSettingsSlice";
import { nameof } from "shared/nameof";

import Stack from "@mui/material/Stack";

import WebSettingsModel from "../models/WebSettingsModel";

const Subject = () => {
  // Store
  const webSettings = useSelector(selectWebSettings);

  // Contact
  const { handleWebSettingsUpdate } = useWebSettingsSlice();

  // Other
  const handleTextFieldOnBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    const name: string = e.target.name;
    const value: string = e.target.value;

    handleWebSettingsUpdate({ [name]: value });
  };

  return (
    <ErrorBoundary>
      <SectionStyled component='section'>
        <SectionTitle title='Subjekt' />
        <Stack spacing={2} direction='column'>
          {/* Name */}
          <AppTextField
            name={nameof<WebSettingsModel>("SubjectName")}
            label='Název'
            value={webSettings.SubjectName ?? ""}
            variant='outlined'
            fullWidth
            required
            autoComplete='off'
            onBlur={handleTextFieldOnBlur}
          />

          {/* IČO */}
          <AppTextField
            name={nameof<WebSettingsModel>("SubjectICO")}
            label='IČO'
            value={webSettings.SubjectICO ?? ""}
            variant='outlined'
            fullWidth
            required
            autoComplete='off'
            onBlur={handleTextFieldOnBlur}
          />

          {/* Tik Tok */}
          <AppTextField
            name={nameof<WebSettingsModel>("SubjectDIC")}
            label='DIČ'
            value={webSettings.SubjectDIC ?? ""}
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

export default Subject;
