import AdmSettingsService from "features/admSettings/AdmSettingsService";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import AppNotification from "shared/components/notification/AppNotification";
import AppPassword from "shared/components/password/AppPassword";
import { UserRoleEnum } from "shared/enums/UserRoleEnum";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";
import { selectAdmSettings } from "shared/infrastructure/store/admSettings/admSettingsSlice";
import { useAdmSettingsSlice } from "shared/infrastructure/store/admSettings/useAdmSettingsSlice";

import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import RegisterFormStyled from "./styledComponents/RegisterFormStyled";

const RegisterForm = () => {
  // References
  const refErr = useRef<HTMLSpanElement>(null);

  // Store
  const admSettings = useSelector(selectAdmSettings);

  // Constants
  const _admSettingsService = new AdmSettingsService();
  const { handleAdmSettingsUpdate } = useAdmSettingsSlice();

  // State
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>("");
  const [saving, setSaving] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<number>(UserRoleEnum.ADMIN);

  // Other
  useEffect(() => {
    setErrMsg("");
  }, [userName, password, passwordConfirm]);

  const handlePasswordOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value: string = e.target.value;

    setPassword(value);
  };

  const handlePasswordConfirmOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value: string = e.target.value;

    setPasswordConfirm(value);
  };

  const handleErrorOnChange = (isError: boolean) => {
    setPasswordError(isError);
  };

  const handleFormOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (saving) return;
    if (passwordError) {
      AppNotification("Chyba", "Uživatel nelze vložit", "danger");
      return;
    }

    setSaving(true);
    const response = await _admSettingsService.registerUser(
      userName,
      password,
      userRole
    );

    if (response.Success) {
      setUserName("");
      setPassword("");
      setPasswordConfirm("");
      setUserRole(UserRoleEnum.ADMIN);
      handleAdmSettingsUpdate({ _usersLoaded: false });
      AppNotification("Úspěch", response.ErrMsg, "success");
    } else {
      setErrMsg(response.ErrMsg);
      refErr.current?.focus();
    }

    setSaving(false);
  };

  return (
    <ErrorBoundary>
      <RegisterFormStyled>
        {/* Error field */}
        <Typography
          ref={refErr}
          className={errMsg ? "err-msg" : "offscreen"}
          aria-live='assertive'
        >
          {errMsg}
        </Typography>

        {/* Form */}
        <form onSubmit={handleFormOnSubmit}>
          <Stack spacing={2} direction='column'>
            {/* User name */}
            <TextField
              label='Email'
              type='email'
              id='user-name'
              autoComplete='username'
              required
              fullWidth
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
            />

            {/* Password */}
            <AppPassword
              name='register-user'
              minLength={5}
              password={password}
              handlePasswordOnChange={handlePasswordOnChange}
              passwordConfirm={passwordConfirm}
              handlePasswordConfirmOnChange={handlePasswordConfirmOnChange}
              handleErrorOnChange={handleErrorOnChange}
            />

            {/* User role */}
            <FormControl required fullWidth>
              <InputLabel id='user-role-label'>Role</InputLabel>
              <Select
                labelId='user-role-label'
                id='user-role'
                name=''
                value={userRole}
                label='Role'
                required
                onChange={(e) => setUserRole(e.target.value as number)}
              >
                {admSettings.DropDownsData.RoleListData.map((item, index) => (
                  <MenuItem value={item.Value} key={"user-role-key-" + index}>
                    {item.Name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Submit button */}
            <Box className='buttons-wrapper'>
              <LoadingButton
                type='submit'
                variant='contained'
                color='secondary'
                loading={saving}
              >
                Vložit
              </LoadingButton>
            </Box>
          </Stack>
        </form>
      </RegisterFormStyled>
    </ErrorBoundary>
  );
};

export default RegisterForm;
