import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const RegisterFormStyled = styled(Box)(({ theme }) => ({
  h1: {
    fontSize: "4rem",

    [theme.breakpoints.down("md")]: {
      fontSize: "3rem",
    },
  },

  ".err-msg": {
    backgroundColor: theme.palette.error.main,
    textAlign: "center",
    padding: "10px 10px",
    borderRadius: "5px",
    fontSize: "1.2rem",
    marginBottom: "16px",
  },

  ".offscreen": {
    display: "none",
  },

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

export default RegisterFormStyled;
