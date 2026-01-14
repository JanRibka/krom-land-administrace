import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const LogoStyled = styled(Box)(({ theme }) => ({
  a: {
    fontSize: "3rem",
    color: theme.palette.text.primary,
    fontWeight: "bold",
    textDecoration: "none",
    fontStyle: "italic",

    [theme.breakpoints.down("lg")]: {
      fontSize: "2.5rem",
    },

    [theme.breakpoints.down("md")]: {
      fontSize: "2rem",
    },
  },
}));

export default LogoStyled;
