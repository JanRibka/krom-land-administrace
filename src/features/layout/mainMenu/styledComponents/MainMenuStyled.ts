import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const MainMenuStyled = styled(Box)(({ theme }) => ({
  marginTop: "20px",

  ul: {
    display: "flex",
    flexDirection: "column",
    paddingInlineStart: 0,

    li: {
      marginTop: "35px",
      borderLeft: "5px solid transparent",
      transition: "all 300ms ease",

      "&.active, &:hover": {
        borderColor: theme.palette.secondary.main,
        color: theme.palette.secondary.main,
      },

      ".link-inner-wrapper": {
        marginLeft: "5px",
      },
    },
  },
}));

export default MainMenuStyled;
