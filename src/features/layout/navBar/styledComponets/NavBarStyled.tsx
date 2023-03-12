import AppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";

const NavBarStyled = styled(AppBar)(({ theme }) => ({
  borderRadius: "0 0 20px 20px",
  zIndex: theme.zIndex.drawer + 1,
  position: "fixed",

  ".MuiToolbar-root": {
    height: "80px",
  },
}));

export default NavBarStyled;
