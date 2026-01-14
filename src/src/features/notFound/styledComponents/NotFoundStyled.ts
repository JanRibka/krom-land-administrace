import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const NotFoundStyled = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "calc(100vh - 204px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  ".content-wrapper": {
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",

    ".error-text": {
      fontSize: "250px",
      fontWeight: 700,
      lineHeight: 0,
      color: "#eaebed",

      [theme.breakpoints.down("lg")]: {
        fontSize: "180px",
      },

      [theme.breakpoints.down("md")]: {
        fontSize: "100px",
      },
    },

    ".not-found-text": {
      color: "#313131",
      fontSize: "48px",
      fontWeight: 700,
      lineHeight: "24px",
      textAlign: "center",

      [theme.breakpoints.down("lg")]: {
        fontSize: "45px",
      },

      [theme.breakpoints.down("md")]: {
        fontSize: "40px",
        lineHeight: "45px",
      },
    },

    ".not-found-helper-text": {
      color: "#313131",
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: "24px",
      width: "90%",
      textAlign: "center",
      margin: "30px 0 auto",
    },

    button: {
      marginTop: "35px",
      minWidth: "100px",
    },
  },
}));

export default NotFoundStyled;
