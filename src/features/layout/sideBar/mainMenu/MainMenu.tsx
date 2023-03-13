import MenuSepataror from "../menuSeparator/MenuSeparator";
import NavLinksDashboard from "../navLinks/NavLinksDashboard";
import NavLinksWebParts from "../navLinks/NavLinksWebParts";
import MainMenuStyled from "./styledComponents/MainMenuStyled";

const MainMenu = () => {
  return (
    <MainMenuStyled
      component='nav'
      className='nav-links-wrapper'
      id='nav-links-wrapper'
    >
      <NavLinksDashboard />

      <MenuSepataror text='Části webu' />
      <NavLinksWebParts />
    </MainMenuStyled>
  );
};

export default MainMenu;
