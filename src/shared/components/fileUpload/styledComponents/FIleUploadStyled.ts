import { alpha } from "@mui/material";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const FileUploadStyled = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",

  "& > img": {
    width: "100%",
    maxHeight: "500px",
    height: "100%",
    minHeight: "250px",
    backgroundColor: theme.palette.primary.light,
    marginBottom: "25px",
    objectFit: "scale-down",
  },

  ".buttons-wrapper": {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    ".buttons-inner-wrapper": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",

      ".document-name-wrapper": {
        display: "flex",
        alignItems: "center",
      },

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
  },
}));

export default FileUploadStyled;
