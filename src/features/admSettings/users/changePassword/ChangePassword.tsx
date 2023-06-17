import SectionStyled from "features/styledComponents/SectionStyled";
import { ChangeEvent, useState } from "react";
import AppPassword from "shared/components/password/AppPassword";
import SectionTitle from "shared/components/sectionTitle/SectionTitle";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";

const ChangePassword = () => {
  // State
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);

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

  return (
    <ErrorBoundary>
      <SectionStyled component='section'>
        <SectionTitle title='Změna hesla' />
        <AppPassword
          name='change-password'
          minLength={5}
          password={password}
          handlePasswordOnChange={handlePasswordOnChange}
          passwordConfirm={passwordConfirm}
          handlePasswordConfirmOnChange={handlePasswordConfirmOnChange}
          handleErrorOnChange={handleErrorOnChange}
        />
      </SectionStyled>
    </ErrorBoundary>
  );
};

export default ChangePassword;
