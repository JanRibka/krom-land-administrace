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

interface IProps {
  disable: boolean;
}

const Contact = (props: IProps) => {
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
        <SectionTitle title='Kontakt' />
        <Stack spacing={2} direction='column'>
          {/* Name */}
          <AppTextField
            name={nameof<WebSettingsModel>("ContactName")}
            label='Název'
            value={webSettings.ContactName ?? ""}
            variant='outlined'
            fullWidth
            required
            disabled={props.disable}
            autoComplete='off'
            onBlur={handleTextFieldOnBlur}
          />

          {/* Working hours */}
          <AppTextField
            name={nameof<WebSettingsModel>("ContactHours")}
            label='Provozní hodiny'
            value={webSettings.ContactHours ?? ""}
            variant='outlined'
            fullWidth
            required
            disabled={props.disable}
            autoComplete='off'
            onBlur={handleTextFieldOnBlur}
          />

          {/* Telephone */}
          <AppTextField
            name={nameof<WebSettingsModel>("ContactTel")}
            label='Telefon (S mezerami)'
            value={webSettings.ContactTel ?? ""}
            variant='outlined'
            fullWidth
            required
            disabled={props.disable}
            autoComplete='off'
            onBlur={handleTextFieldOnBlur}
          />

          {/* Email */}
          <AppTextField
            name={nameof<WebSettingsModel>("ContactEmail")}
            label='Email'
            value={webSettings.ContactEmail ?? ""}
            variant='outlined'
            fullWidth
            required
            disabled={props.disable}
            autoComplete='off'
            onBlur={handleTextFieldOnBlur}
          />
        </Stack>
      </SectionStyled>
    </ErrorBoundary>
  );
};

export default Contact;
