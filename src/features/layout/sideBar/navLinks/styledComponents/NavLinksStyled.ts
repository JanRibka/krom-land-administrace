import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const NavLinksStyled = styled(Box)(({ theme }) => ({
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
          marginRight: "15px",
          transition: "all 200ms linear",
        },
      },
    },
  },
}));

export default NavLinksStyled;
