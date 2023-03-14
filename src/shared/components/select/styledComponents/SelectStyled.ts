import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';

const SelectStyled = styled(Select)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,

  "&.Mui-focused": {
    fieldset: {
      borderColor: theme.palette.secondary.main + "!important",
    },
  },
}));

export default SelectStyled;
