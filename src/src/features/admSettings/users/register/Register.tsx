import SectionStyled from "features/styledComponents/SectionStyled";
import { useSelector } from "react-redux";
import SectionTitle from "shared/components/sectionTitle/SectionTitle";
import { UserRoleEnum } from "shared/enums/UserRoleEnum";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";
import { selectAuthentication } from "shared/infrastructure/store/authentication/authenticationSlice";

import RegisterForm from "./registerForm/RegisterForm";

const Register = () => {
  // Store
  const authentication = useSelector(selectAuthentication);

  return (
    <ErrorBoundary>
      {authentication.UserRole === UserRoleEnum.ADMIN && (
        <SectionStyled component='section'>
          <SectionTitle title='Přidání uživatele' />
          <RegisterForm />
        </SectionStyled>
      )}
    </ErrorBoundary>
  );
};

export default Register;
