import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';

const AppCheckboxStyled = styled(FormControlLabel)(({ theme }) => ({
  svg: {
    fontSize: "x-large",
    color: theme.palette.text.secondary,
  },
}));

export default AppCheckboxStyled;
