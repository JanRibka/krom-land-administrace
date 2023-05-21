import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const DialogContentFormStyled = styled(Box)(({ theme }) => ({
  ".label": {
    paddingTop: "15px",
    color: theme.palette.secondary.main,
  },

  label: {
    "&.Mui-focused": {
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

  ".MuiRadio-root": {
    "&.Mui-checked": {
      "& > span": {
        color: theme.palette.secondary.main,
      },
    },
  },
}));
export default DialogContentFormStyled;
