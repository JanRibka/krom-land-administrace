import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const MenuButtonStyled = styled(Box)(({ theme }) => ({
  ".button-close": {
    display: "none",
  },

  ".button-open": {
    display: "inline-flex",
  },

  "&.opened": {
    ".button-close": {
      display: "inline-flex !important",
    },

    ".button-open": {
      display: "none !important",
    },
  },

  svg: {
    color: theme.palette.secondary.dark,
    fontSize: "xx-large",
  },
}));

export default MenuButtonStyled;
