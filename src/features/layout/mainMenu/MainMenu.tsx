import NavLinks from "../sideBar/navLinks/NavLinks";
import MainMenuStyled from "./styledComponents/MainMenuStyled";

const MainMenu = () => {
  return (
    <MainMenuStyled>
      <NavLinks innerWrapperName='nav-links-inner-wrapper' />
    </MainMenuStyled>
  );
};

export default MainMenu;
