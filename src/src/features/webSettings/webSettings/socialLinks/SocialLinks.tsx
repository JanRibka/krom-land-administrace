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

const SocialLinks = (props: IProps) => {
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
        <SectionTitle title='Odkazy na sociální sítě' />
        <Stack spacing={2} direction='column'>
          {/* Facebook */}
          <AppTextField
            name={nameof<WebSettingsModel>("FacebookLink")}
            label='Facebook'
            value={webSettings.FacebookLink ?? ""}
            variant='outlined'
            fullWidth
            required
            disabled={props.disable}
            autoComplete='off'
            onBlur={handleTextFieldOnBlur}
          />

          {/* Instagram */}
          <AppTextField
            name={nameof<WebSettingsModel>("InstagramLink")}
            label='Instagram'
            value={webSettings.InstagramLink ?? ""}
            variant='outlined'
            fullWidth
            required
            disabled={props.disable}
            autoComplete='off'
            onBlur={handleTextFieldOnBlur}
          />

          {/* Tik Tok */}
          <AppTextField
            name={nameof<WebSettingsModel>("TikTokLink")}
            label='Tik Tok'
            value={webSettings.TikTokLink ?? ""}
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

export default SocialLinks;
