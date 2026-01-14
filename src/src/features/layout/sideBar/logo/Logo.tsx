import logo from "./img/logo.png";
import LogoStyled from "./styledComponents/LogoStyled";

const Logo = () => {
  return (
    <LogoStyled>
      <img id='logo' src={logo} alt='Logo | KROM Land' loading='lazy' />
    </LogoStyled>
  );
};

export default Logo;
