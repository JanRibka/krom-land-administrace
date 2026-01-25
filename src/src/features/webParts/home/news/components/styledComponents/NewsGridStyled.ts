import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const NewsGridStyled = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  gap: "24px",
  marginTop: "24px",

  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
  },
}));

export default NewsGridStyled;
