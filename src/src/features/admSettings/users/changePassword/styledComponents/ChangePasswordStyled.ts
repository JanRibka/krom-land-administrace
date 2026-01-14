import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const ChangePasswordStyled = styled(Box)(({ theme }) => ({
  ".MuiFormLabel-root": {
    "&.Mui-focused:not(.Mui-error)": {
      color: theme.palette.secondary.main,
    },
  },

  ".MuiInputBase-root": {
    backgroundColor: theme.palette.primary.light,

    "&.Mui-focused:not(.Mui-error)": {
      fieldset: {
        borderColor: theme.palette.secondary.main,
      },
    },
  },

  ".buttons-wrapper": {
    display: "flex",
    justifyContent: "end",
  },
}));

export default ChangePasswordStyled;
