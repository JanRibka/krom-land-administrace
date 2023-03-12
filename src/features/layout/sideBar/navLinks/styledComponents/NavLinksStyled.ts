import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const NavLinksStyled = styled(Box)(({ theme }) => ({
  ul: {
    display: "flex",
    listStyleType: "none",

    li: {
      backfaceVisibility: "hidden",

      a: {
        textDecoration: "none",
        color: "inherit",

        ".link-inner-wrapper": {
          display: "flex",
          alignItems: "center",

          svg: {
            marginRight: "10px",
          },
        },
      },
    },
  },
}));

export default NavLinksStyled;
