import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";

const CardStyled = styled(Card)(({ theme }) => ({
  borderRadius: "20px",
  boxShadow:
    "0px 0px 4px 0px rgb(0 0 0 / 20%), 0px 0px 5px 4px rgb(0 0 0 / 14%), 1px 0px 10px 1px rgb(0 0 0 / 12%)",
}));

export default CardStyled;
