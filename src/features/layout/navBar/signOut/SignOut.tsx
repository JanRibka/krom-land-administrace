import { useNavigate } from 'react-router-dom';
import useLogout from 'shared/customHooks/useLogout';
import { AppRoute } from 'shared/infrastructure/router/appRoutes';

import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';

import SignOutStyled from './styledComponents/SignOutStyled';

const SignOut = () => {
  // Constants
  const navigate = useNavigate();
  const logout = useLogout();

  // Other
  const handleSignOut = async () => {
    await logout();
    navigate(AppRoute.Login);
  };

  return (
    <SignOutStyled>
      <IconButton aria-label='Sign out' onClick={handleSignOut}>
        <LogoutIcon />
      </IconButton>
    </SignOutStyled>
  );
};

export default SignOut;
