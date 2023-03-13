import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const PageTitleStyled = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  justifyContent: "start",
  alignItems: "center",

  h1: {
    color: theme.palette.secondary.main,
    fontSize: "2.5rem",
    textAlign: "start",
    fontWeight: 400,
  },
}));

export default PageTitleStyled;
