import Dialog from '@mui/material/Dialog';
import { styled } from '@mui/material/styles';

const ActionRegistrationDialogStyled = styled(Dialog)(({ theme }) => ({
  ".MuiPaper-root": {
    maxWidth: "850px",
    position: "relative",

    [theme.breakpoints.down("sm")]: {
      margin: 0,
      height: "100%",
      maxHeight: "100%",
    },

    ".loader-wrapper": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },

  ".title-wrapper": {
    backgroundColor: theme.palette.secondary.main,
  },

  ".MuiFormLabel-root:not(.Mui-focused)": {
    color: theme.palette.text.primary,
  },

  ".MuiCheckbox-root:not(.Mui-checked)": {
    ".MuiSvgIcon-root": {
      color: theme.palette.text.primary,
    },
  },
}));

export default ActionRegistrationDialogStyled;
