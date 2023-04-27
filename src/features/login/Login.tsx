import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import ErrorBoundary from 'shared/infrastructure/ErrorBoundary';
import { AppRoute } from 'shared/infrastructure/router/appRoutes';
import authenticationSlice, {
    AuthenticationState, selectAuthentication
} from 'shared/infrastructure/store/authentication/authenticationSlice';
import {
    useAuthenticationSlice
} from 'shared/infrastructure/store/authentication/useAuthenticationSlice';
import { nameof } from 'shared/nameof';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import LoginService from './LoginService';
import SectionStyled from './styledComponents/SectionStyled';

const Login = () => {
  // References
  const refUser = useRef<any>(null);
  const refErr = useRef<HTMLSpanElement>(null);

  // Store
  const authentication = useSelector(selectAuthentication);

  // Constants
  const _loginService = new LoginService();
  const { handleAuthenticationUpdate } = useAuthenticationSlice();
  const navigate = useNavigate();
  const location = useLocation();

  // State
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Děláno podle toho https://www.youtube.com/watch?v=X3qyxo_UTR4

  // Other
  useEffect(() => {
    refUser.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [userName, password]);

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await _loginService.login(userName, password);

    if (response?.Success) {
      const authState: Partial<AuthenticationState> = {
        UserName: userName,
        Password: password,
        UserRole: response.Data?.UserRole,
        AccessToken: response.Data?.AccessToken,
      };
      handleAuthenticationUpdate(authState);
      setUserName("");
      setPassword("");
      navigate(AppRoute.Dashboard, {
        state: { from: location },
        replace: true,
      });
    } else {
      setErrMsg(response.ErrMsg);
      refErr.current?.focus();
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleCheckboxOnChange = (
    e: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    const name: string = e.target.name;

    handleAuthenticationUpdate({ [name]: checked });
    localStorage.setItem("persist", JSON.stringify(checked));
  };

  return (
    <ErrorBoundary>
      <SectionStyled component='section'>
        <Box className='section-inner-wrapper'>
          <Typography variant='h1'>Přihlášení</Typography>
          <Typography
            ref={refErr}
            className={errMsg ? "err-msg" : "offcreen"}
            aria-live='assertive'
          >
            {errMsg}
          </Typography>

          <form onSubmit={handleOnSubmit}>
            <TextField
              ref={refUser}
              label='Email'
              type='email'
              id='user-name'
              autoComplete='username'
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
              required
            />

            <FormControl variant='outlined'>
              <InputLabel htmlFor='login-password' required>
                Heslo
              </InputLabel>
              <OutlinedInput
                id='login-password'
                label='Heslo'
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                autoComplete='current-password'
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            <Button type='submit' variant='contained'>
              Přihlásit
            </Button>

            <FormControlLabel
              control={
                <Checkbox
                  name={nameof<AuthenticationState>("Persist")}
                  checked={authentication.Persist}
                  onChange={handleCheckboxOnChange}
                />
              }
              label='Zůstat přihlášený'
            />
          </form>
        </Box>
      </SectionStyled>
    </ErrorBoundary>
  );
};

export default Login;
