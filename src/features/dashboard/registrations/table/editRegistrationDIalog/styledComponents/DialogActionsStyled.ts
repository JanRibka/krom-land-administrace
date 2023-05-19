import DialogActions from "@mui/material/DialogActions";
import { styled } from "@mui/material/styles";

const DialogActionsStyled = styled(DialogActions)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  margin: "0 15px",

  [theme.breakpoints.down("md")]: {
    flexDirection: "column-reverse",
    justifyContent: "center",

    p: {
      textAlign: "center",
      textAlignLast: "center",
    },

    ".buttons-wrapper": {
      marginBottom: "10px",
    },
  },

  a: {
    textDecoration: "underline",
    cursor: "pointer",
    color: theme.palette.primary.main,
  },

  ".buttons-wrapper": {
    button: {
      "&:last-of-type": {
        marginLeft: "5px",
      },
    },
  },
}));

export default DialogActionsStyled;
