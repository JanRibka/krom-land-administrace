import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const FooterStyled = styled(Box)(({ theme }) => ({
  position: "fixed",
  bottom: 0,
  left: 0,
  width: "100%",
  height: "60px",
  zIndex: 2,

  ".footer-inner-wrapper": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "32px",
    height: "100%",
    borderRadius: "20px 20px 0 0 ",
    backgroundColor: theme.palette.primary.main,
    boxShadow:
      "0px 0px 4px 0px rgb(0 0 0 / 20%), 0px 0px 5px 4px rgb(0 0 0 / 14%), 1px 0px 10px 1px rgb(0 0 0 / 12%)",
  },
}));

export default FooterStyled;
