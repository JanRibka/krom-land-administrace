import Typography from "@mui/material/Typography";
import styled from "@mui/system/styled";

const MenuSeparatorStyled = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontSize: "20px",
  fontWeight: 400,
  marginTop: "35px",
  transition: "all 300ms ease-in-out",
}));

export default MenuSeparatorStyled;
