import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const SignOutStyled = styled(Box)(({ theme }) => ({
  svg: {
    color: theme.palette.secondary.dark,
  },
}));

export default SignOutStyled;
