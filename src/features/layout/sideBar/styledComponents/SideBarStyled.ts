import Drawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';

const SideBarStyled = styled(Drawer)(({ theme }) => ({
  flexShrink: 0,

  ".MuiDrawer-paper": {
    height: "100%",
    boxSizing: "border-box",
    borderRadius: "0 20px 20px 0",
    border: "none",
    backgroundColor: theme.palette.primary.main,
    boxShadow:
      "0px 0px 4px 0px rgba(0,0,0,0.2), 0px 0px 5px 4px rgba(0,0,0,0.14), 1px 0px 10px 1px rgba(0,0,0,0.12)",

    ".menu-wrapper": {
      overflow: "auto",
    },
  },
}));

export default SideBarStyled;
