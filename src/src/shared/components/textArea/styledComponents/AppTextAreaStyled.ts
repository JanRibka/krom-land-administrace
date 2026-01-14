import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

const AppTextAreaStyled = styled(TextField)(({ theme }) => ({
  ".MuiFormLabel-root": {
    "&.Mui-focused": {
      color: theme.palette.secondary.main,
    },
  },

  ".MuiInputBase-root": {
    backgroundColor: theme.palette.primary.light,

    "&.Mui-focused": {
      fieldset: {
        borderColor: theme.palette.secondary.main,
      },
    },
  },
}));

export default AppTextAreaStyled;
