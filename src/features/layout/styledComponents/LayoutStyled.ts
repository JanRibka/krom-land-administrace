import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const LayoutStyled = styled(Box)(({ theme }) => ({
  display: "flex",

  "&.opened": {
    footer: {
      left: "272px",
      width: "calc(100% - 272px)",
    },
  },
}));

export default LayoutStyled;
