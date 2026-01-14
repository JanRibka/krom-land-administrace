import AppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";

const NavBarStyled = styled(AppBar)(({ theme }) => ({
  borderRadius: "0 0 20px 20px",
  zIndex: theme.zIndex.drawer + 1,
  position: "fixed",
  left: "122px",
  width: "calc(100% - 122px)",
  transition: "all 200ms linear",

  [theme.breakpoints.down("md")]: {
    left: "0px",
    width: "100%",
  },

  "&.opened": {
    left: "272px",
    width: "calc(100% - 272px)",
  },

  ".MuiToolbar-root": {
    height: "80px",
  },
}));

export default NavBarStyled;
