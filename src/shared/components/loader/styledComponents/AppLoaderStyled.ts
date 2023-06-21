import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const AppLoaderStyled = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "calc(50vh - 50px)",
  left: "calc(50% - 50px)",

  svg: {
    color: theme.palette.secondary.main,
  },
}));

export default AppLoaderStyled;
