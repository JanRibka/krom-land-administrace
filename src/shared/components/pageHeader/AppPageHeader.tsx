import Stack from "@mui/material/Stack";

import AppTextField from "../textField/AppTextField";

interface IProps {
  nameText: string;
  valueText: string;
  nameColor: string;
  valueColor: string;
  handleTextFieldOnBlur: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => void;
}

const AppPageHeader = (props: IProps) => {
  return (
    <Stack spacing={2} direction='column'>
      <AppTextField
        name={props.nameText}
        label='Text'
        value={props.valueText}
        variant='outlined'
        fullWidth
        required
        autoComplete='off'
        onBlur={props.handleTextFieldOnBlur}
      />
      <AppTextField
        name={props.nameColor}
        label='Barva textu ve formátu rgb(xxx, yyy, zzz)'
        value={props.valueColor}
        variant='outlined'
        fullWidth
        autoComplete='off'
        onBlur={props.handleTextFieldOnBlur}
      />
    </Stack>
  );
};

export default AppPageHeader;
