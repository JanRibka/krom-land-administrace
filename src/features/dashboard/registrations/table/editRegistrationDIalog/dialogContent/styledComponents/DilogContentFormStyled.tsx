import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const DialogContentFormStyled = styled(Box)(({ theme }) => ({
  ".label": {
    paddingTop: "15px",
    color: theme.palette.secondary.main,
  },
}));
export default DialogContentFormStyled;
