import { grey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

const AppDatePickerStyled = styled(DesktopDatePicker)(({ theme }) => ({
  ".MuiFormLabel-root": {
    top: "-6px",

    "&.Mui-focused, &.MuiFormLabel-filled": {
      top: "3px",
    },

    "&:not(.Mui-focused):not(.Mui-error)": {
      color: grey[500],
    },
  },

  ".MuiInputBase-root": {
    height: "36px",

    "&.Mui-disabled": {
      backgroundColor: "rgba(0, 0, 0, 0.05)",

      ".MuiInputBase-input": {
        WebkitTextFillColor: theme.palette.text.primary,
      },
    },
  },

  ".MuiFormHelperText-root": {
    fontSize: "1rem",
  },
}));

export default AppDatePickerStyled;
