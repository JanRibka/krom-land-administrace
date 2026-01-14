import Drawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";

const SideBarStyled = styled(Drawer)(({ theme }) => ({
  flexShrink: 0,
  width: "90px",
  transition: "all 200ms linear",

  [theme.breakpoints.down("md")]: {
    width: "0px",
  },

  "&.opened": {
    width: "240px",
  },

  "&:not(.opened)": {
    ".menu-separator": {
      fontSize: "12px",
      textAlign: "center",
      textAlignLast: "center",
    },

    a: {
      svg: {
        fontSize: "2rem",
      },
    },
  },

  ".MuiDrawer-paper": {
    height: "100%",
    width: "inherit",
    boxSizing: "border-box",
    borderRadius: "0 20px 20px 0",
    border: "none",
    backgroundColor: theme.palette.primary.main,
    boxShadow:
      "0px 0px 4px 0px rgba(0,0,0,0.2), 0px 0px 5px 4px rgba(0,0,0,0.14), 1px 0px 10px 1px rgba(0,0,0,0.12)",

    ".MuiToolbar-root": {
      paddingLeft: "20px",
      display: "flex",
      flexDirection: "column",

      ".menu-wrapper": {
        width: "100%",
        overflowY: "auto",
        overflowX: "hidden",
      },
    },
  },
}));

export default SideBarStyled;
