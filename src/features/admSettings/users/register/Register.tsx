import SectionStyled from "features/styledComponents/SectionStyled";
import SectionTitle from "shared/components/sectionTitle/SectionTitle";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";

import RegisterForm from "./registerForm/RegisterForm";

const Register = () => {
  return (
    <ErrorBoundary>
      <SectionStyled component='section'>
        <SectionTitle title='Přidání uživatele' />
        <RegisterForm />
      </SectionStyled>
    </ErrorBoundary>
  );
};

export default Register;
