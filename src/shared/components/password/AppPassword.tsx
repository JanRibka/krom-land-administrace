import { ChangeEvent, useState } from 'react';
import ErrorBoundary from 'shared/infrastructure/ErrorBoundary';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';

interface IProps {
  name: string;
  minLength: number;
  password: string;
  handlePasswordOnChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  passwordConfirm: string;
  handlePasswordConfirmOnChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const AppPassword = (props: IProps) => {
  // State
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordConfirm, setShowPasswordConfirm] =
    useState<boolean>(false);

  // Other
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowPasswordConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <ErrorBoundary>
      {/* Password */}
      <FormControl variant='outlined'>
        <InputLabel htmlFor={props.name + "-password"} required>
          Heslo
        </InputLabel>
        <OutlinedInput
          id={props.name + "-password"}
          label='Heslo'
          type={showPassword ? "text" : "password"}
          onChange={props.handlePasswordOnChange}
          value={props.password}
          required
          autoComplete='off'
          endAdornment={
            <InputAdornment position='end'>
              <IconButton
                aria-label='toggle password visibility'
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge='end'
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      {/* Confirm password */}
      <FormControl variant='outlined'>
        <InputLabel htmlFor={props.name + "-password-confirm"} required>
          Potvrdit heslo
        </InputLabel>
        <OutlinedInput
          id={props.name + "-password-confirm"}
          label='Potvrdit heslo'
          type={showPasswordConfirm ? "text" : "password"}
          onChange={props.handlePasswordConfirmOnChange}
          value={props.passwordConfirm}
          required
          autoComplete='off'
          endAdornment={
            <InputAdornment position='end'>
              <IconButton
                aria-label='toggle password visibility'
                onClick={handleClickShowPasswordConfirm}
                onMouseDown={handleMouseDownPassword}
                edge='end'
              >
                {showPasswordConfirm ? (
                  <VisibilityOffIcon />
                ) : (
                  <VisibilityIcon />
                )}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </ErrorBoundary>
  );
};

export default AppPassword;
