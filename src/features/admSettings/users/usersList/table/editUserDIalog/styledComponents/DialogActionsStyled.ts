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

    ".buttons-wrapper": {
      marginBottom: "10px",
    },
  },

  ".buttons-wrapper": {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",

    ".right-buttons": {
      button: {
        "&:last-of-type": {
          marginLeft: "5px",
        },
      },
    },
  },
}));

export default DialogActionsStyled;
