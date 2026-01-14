import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const SectionStyled = styled(Box)(({ theme }) => ({
  height: "calc(100vh - 204px)",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  ".section-inner-wrapper": {
    h2: {
      fontSize: "2.5rem",
      textAlign: "center",
      color: "red",
      marginBottom: "25px",

      [theme.breakpoints.down("md")]: {
        fontSize: "2rem",
      },
    },

    h4: {
      fontSize: "2rem",
      textAlign: "center",
      color: "red",
      fontWeight: 300,

      [theme.breakpoints.down("md")]: {
        fontSize: "1.5rem",
      },
    },

    display: "flex",
    flexDirection: "column",
    padding: "40px",
    backgroundColor: theme.palette.secondary.light,
    borderRadius: "10px",
    width: "90%",
    maxWidth: "600px",
    boxShadow:
      "0px 0px 4px 0px rgb(0 0 0 / 20%), 0px 0px 5px 4px rgb(0 0 0 / 14%), 1px 0px 10px 1px rgb(0 0 0 / 12%)",
  },
}));

export default SectionStyled;
