import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const PageStyled = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: "112px 32px 92px 32px",
  width: "calc(100% - 90px)",
  maxWidth: "calc(100% - 90px)",
  transition: "all 200ms linear",

  [theme.breakpoints.down("md")]: {
    width: "100%",
    maxWidth: "100%",
  },
}));

export default PageStyled;
