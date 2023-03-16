import { alpha } from "@mui/material";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const FileUploadStyled = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",

  ".file-upload-inner-wrapper": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    ".file-upload-label": {
      textTransform: "uppercase",
      fontSize: "0.875rem",
      fontWeight: 500,
      color: theme.palette.secondary.main,
      border: "1px solid " + theme.palette.secondary.main,
      padding: "9px 15px",
      borderRadius: "4px",
      cursor: "pointer",

      "&:hover": {
        backgroundColor: alpha(theme.palette.secondary.main, 0.05),
      },
    },

    ".file-upload-input": {
      display: "none",
      pointerEvents: "none",
    },

    button: {
      marginLeft: "10px",
    },
  },
}));

export default FileUploadStyled;
