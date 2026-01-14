import { grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const AppDatePickerStyled = styled(DatePicker)(({ theme }) => ({
  ".MuiFormLabel-root": {
    "&.Mui-focused, &.MuiFormLabel-filled": {
      color: theme.palette.secondary.main,
    },

    "&:not(.Mui-focused):not(.Mui-error)": {
      color: grey[500],
    },
  },

  ".MuiInputBase-root": {
    backgroundColor: theme.palette.primary.light,

    "&.Mui-disabled": {
      backgroundColor: "rgba(0, 0, 0, 0.05)",

      ".MuiInputBase-input": {
        WebkitTextFillColor: theme.palette.text.primary,
      },
    },

    "&.Mui-focused": {
      fieldset: {
        borderColor: theme.palette.secondary.main,
      },
    },
  },

  ".MuiFormHelperText-root": {
    fontSize: "1rem",
  },
}));

export default AppDatePickerStyled;
