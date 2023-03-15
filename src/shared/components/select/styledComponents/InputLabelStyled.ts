import InputLabel from '@mui/material/InputLabel';
import { styled } from '@mui/material/styles';

const InputLabelStyled = styled(InputLabel)(({ theme }) => ({
  "&.Mui-focused": {
    color: theme.palette.secondary.main,
  },
}));

export default InputLabelStyled;
