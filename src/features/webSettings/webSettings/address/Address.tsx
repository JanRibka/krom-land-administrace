import SectionStyled from "features/styledComponents/SectionStyled";
import { useSelector } from "react-redux";
import SectionTitle from "shared/components/sectionTitle/SectionTitle";
import AppTextField from "shared/components/textField/AppTextField";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";
import { useWebSettingsSlice } from "shared/infrastructure/store/webSettings/useWebSettingsSlice";
import { selectWebSettings } from "shared/infrastructure/store/webSettings/webSettingsSlice";
import { nameof } from "shared/nameof";

import HelpCenterOutlinedIcon from "@mui/icons-material/HelpCenterOutlined";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import WebSettingsModel from "../models/WebSettingsModel";

const Address = () => {
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
        <SectionTitle title='Adresa' />
        <Stack spacing={2} direction='column'>
          {/* Name */}
          <AppTextField
            name={nameof<WebSettingsModel>("AddressName")}
            label='Název'
            value={webSettings.AddressName ?? ""}
            variant='outlined'
            fullWidth
            required
            autoComplete='off'
            onBlur={handleTextFieldOnBlur}
          />

          {/* Address */}
          <AppTextField
            name={nameof<WebSettingsModel>("AddressAddress")}
            label='Adresa'
            value={webSettings.AddressAddress ?? ""}
            variant='outlined'
            fullWidth
            required
            autoComplete='off'
            onBlur={handleTextFieldOnBlur}
          />

          {/* Odkaz */}
          <Box className='item-wrapper'>
            <AppTextField
              name={nameof<WebSettingsModel>("AddressLink")}
              label='Odkaz'
              value={webSettings.AddressLink ?? ""}
              variant='outlined'
              fullWidth
              required
              autoComplete='off'
              onBlur={handleTextFieldOnBlur}
            />
            <HelpCenterOutlinedIcon titleAccess='Odkaz pro adresu lze získat tak, že na google mapách klikneš na daný špendlík a poté vybereš sdílet. Otevře se okno pro sdílení, kde klikneš na kopírovat odkaz, který zde vložíš. ' />
          </Box>
        </Stack>
      </SectionStyled>
    </ErrorBoundary>
  );
};

export default Address;
