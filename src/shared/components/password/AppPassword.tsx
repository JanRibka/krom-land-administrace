import { ChangeEvent, useEffect, useState } from "react";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";

import { passwordStrenghtEvaluation } from "./passwordStrenght/passwordStrenghtEvaluation";
import PasswordStrenghtIndicator from "./passwordStrenght/PasswordStrenghtIndicator";

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
  handleErrorOnChange: (isError: boolean) => void;
}

const AppPassword = (props: IProps) => {
  // State
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordErrorText, setPasswordErrorText] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [passwordStrenghtLevel, setPasswordStrenghtLevel] = useState<number>(0);
  const [passwordConfirmError, setPasswordConfirmError] =
    useState<boolean>(false);
  const [passwordConfirmErrorText, setPasswordConfirmErrorText] =
    useState<string>("");
  const [showPasswordConfirm, setShowPasswordConfirm] =
    useState<boolean>(false);

  // Other
  useEffect(() => {
    handleSetPasswordError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.password]);

  const handleSetPasswordError = () => {
    const passStrenghtLvl = passwordStrenghtEvaluation(props.password);

    setPasswordStrenghtLevel(passStrenghtLvl);

    if (!!!props.password) {
      setPasswordError(false);
      setPasswordErrorText("");
    } else if (props.password.length < props.minLength) {
      setPasswordError(true);
      setPasswordErrorText("Heslo je příliš krátké");
    } else if (passStrenghtLvl === 1) {
      setPasswordError(true);
      setPasswordErrorText("Heslo je příliš slabé");
    } else {
      setPasswordError(false);
      setPasswordErrorText("");
    }
  };

  useEffect(() => {
    handleSetPasswordConfirmError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.password, props.passwordConfirm]);

  const handleSetPasswordConfirmError = () => {
    if (props.passwordConfirm.length === 0) {
      setPasswordConfirmError(false);
      setPasswordConfirmErrorText("");
    } else if (props.password !== props.passwordConfirm) {
      setPasswordConfirmError(true);
      setPasswordConfirmErrorText("Hesla se neshodují");
    } else {
      setPasswordConfirmError(false);
      setPasswordConfirmErrorText("");
    }
  };

  useEffect(() => {
    props.handleErrorOnChange(passwordError || passwordConfirmError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passwordError, passwordConfirmError]);

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
      <Stack spacing={2} direction='column'>
        {/* Password */}
        <FormControl variant='outlined' error={passwordError}>
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
            autoComplete='new-password'
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
          {passwordError && (
            <FormHelperText>{passwordErrorText}</FormHelperText>
          )}
          <PasswordStrenghtIndicator level={passwordStrenghtLevel} />
        </FormControl>

        {/* Confirm password */}
        <FormControl variant='outlined' error={passwordConfirmError}>
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
            autoComplete='new-password'
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
          {passwordConfirmError && (
            <FormHelperText>{passwordConfirmErrorText}</FormHelperText>
          )}
        </FormControl>
      </Stack>
    </ErrorBoundary>
  );
};

export default AppPassword;
