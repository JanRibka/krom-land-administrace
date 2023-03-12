import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

const AppTextFieldStyled = styled(TextField)(({ theme }) => ({
  ".MuiFormLabel-root": {
    "&.Mui-focused, &.MuiFormLabel-filled": {
      color: theme.palette.secondary.main,
    },
  },

  ".MuiInputBase-root": {
    "&.Mui-focused": {
      fieldset: {
        borderColor: theme.palette.secondary.main,
      },
    },
  },
}));

export default AppTextFieldStyled;
