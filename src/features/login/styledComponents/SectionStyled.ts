import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const SectionStyled = styled(Box)(({ theme }) => ({
  height: "100vh",
  width: "100vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: theme.palette.secondary.light,

  h1: {
    fontSize: "4rem",
  },

  ".err-msg": {
    backgroundColor: theme.palette.error.main,
    textAlign: "center",
    padding: "10px 10px",
    borderRadius: "5px",
    fontSize: "1.2rem",
  },

  ".offcreen": {
    display: "none",
  },

  ".section-inner-wrapper": {
    display: "flex",
    flexDirection: "column",
    padding: "40px",
    backgroundColor: theme.palette.secondary.main,
    borderRadius: "10px",
    boxShadow:
      "0px 0px 4px 0px rgb(0 0 0 / 20%), 0px 0px 5px 4px rgb(0 0 0 / 14%), 1px 0px 10px 1px rgb(0 0 0 / 12%)",

    form: {
      display: "flex",
      flexDirection: "column",
      minWidth: "500px",

      ".MuiFormControl-root": {
        marginTop: "15px",

        label: {
          color: "rgba(0, 0, 0, 0.6)",

          "&.Mui-focused, &.MuiFormLabel-filled": {
            color: "rgba(0, 0, 0, 1)",
          },
        },

        ".MuiInputBase-root": {
          backgroundColor: theme.palette.primary.main,
        },
      },

      "& > button": {
        marginTop: "15px",
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.text.primary,
      },
    },
  },
}));

export default SectionStyled;
