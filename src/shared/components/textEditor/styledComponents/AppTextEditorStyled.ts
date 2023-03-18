import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const AppTextEditorStyled = styled(Box)(({ theme }) => ({
  ".ql-toolbar": {
    borderRadius: "4px 4px 0 0",
    backgroundColor: theme.palette.primary.light,
  },

  ".ql-container": {
    display: "grid",
    borderRadius: "0 0 4px 4px",
    minHeight: "200px",
    backgroundColor: theme.palette.primary.light,
  },
}));

export default AppTextEditorStyled;
