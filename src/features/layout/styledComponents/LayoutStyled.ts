import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const LayoutStyled = styled(Box)(({ theme }) => ({
  display: "flex",

  "&.opened": {
    "footer, main": {
      left: "272px",
      width: "calc(100% - 272px)",
    },
  },

  ".MuiPickersPopper-root": {
    ".MuiPickersDay-root": {
      "&.Mui-selected": {
        backgroundColor: theme.palette.secondary.main,
      },

      "&.MuiPickersDay-today": {
        backgroundColor: theme.palette.primary.dark,
      },
    },
  },
}));

export default LayoutStyled;
