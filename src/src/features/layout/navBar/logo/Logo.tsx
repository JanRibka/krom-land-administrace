import Box from "@mui/material/Box";

import logo from "../../img/logo.jpg";
import LogoStyled from "./styledComponents/logoStyled";

const Logo = () => {
  return (
    <LogoStyled>
      <Box component='img' title='KROM Land' src={logo} loading='lazy' />
    </LogoStyled>
  );
};

export default Logo;
