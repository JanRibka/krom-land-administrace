import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const LogoStyled = styled(Box)(({ theme }) => ({
  marginTop: "25px",

  img: {
    width: "100%",
    height: "auto",
  },
}));

export default LogoStyled;
