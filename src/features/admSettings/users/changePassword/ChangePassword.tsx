import AdmSettingsService from "features/admSettings/AdmSettingsService";
import SectionStyled from "features/styledComponents/SectionStyled";
import { ChangeEvent, FormEvent, useState } from "react";
import AppNotification from "shared/components/notification/AppNotification";
import AppPassword from "shared/components/password/AppPassword";
import SectionTitle from "shared/components/sectionTitle/SectionTitle";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";

import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import ChangePasswordStyled from "./styledComponents/ChangePasswordStyled";

const ChangePassword = () => {
  // Constants
  const _admSettingsService = new AdmSettingsService();

  // State
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);

  // Other
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
      AppNotification("Chyba", "Heslo nelze změnit", "danger");
      return;
    }

    setSaving(true);
    const response = await _admSettingsService.passwordChange(password);

    if (response) {
      setPassword("");
      setPasswordConfirm("");
    }

    setSaving(false);
  };

  return (
    <ErrorBoundary>
      <SectionStyled component='section'>
        <SectionTitle title='Změna hesla' />
        <ChangePasswordStyled>
          <form onSubmit={handleFormOnSubmit}>
            <Stack spacing={2} direction='column'>
              {/* Password */}
              <AppPassword
                name='change-password'
                minLength={5}
                password={password}
                handlePasswordOnChange={handlePasswordOnChange}
                passwordConfirm={passwordConfirm}
                handlePasswordConfirmOnChange={handlePasswordConfirmOnChange}
                handleErrorOnChange={handleErrorOnChange}
              />

              {/* Submit button */}
              <Box className='buttons-wrapper'>
                <LoadingButton
                  type='submit'
                  variant='contained'
                  color='secondary'
                  loading={saving}
                >
                  Změnit
                </LoadingButton>
              </Box>
            </Stack>
          </form>
        </ChangePasswordStyled>
      </SectionStyled>
    </ErrorBoundary>
  );
};

export default ChangePassword;
