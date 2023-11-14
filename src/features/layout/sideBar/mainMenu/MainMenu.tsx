import MenuSepataror from "../menuSeparator/MenuSeparator";
import NavLinksAdmSettings from "../navLinks/NavLinksAdmSettings";
import NavLinksDashboard from "../navLinks/NavLinksDashboard";
import NavLinksWebParts from "../navLinks/NavLinksWebParts";
import NavLinksWebSettings from "../navLinks/NavLinksWebSettings";
import MainMenuStyled from "./styledComponents/MainMenuStyled";

const MainMenu = () => {
  return (
    <MainMenuStyled
      component="nav"
      className="nav-links-wrapper"
      id="nav-links-wrapper"
    >
      <NavLinksDashboard />

      <MenuSepataror text="Části webu" />
      <NavLinksWebParts />

      <MenuSepataror text="Nastavení webu" />
      <NavLinksWebSettings />

      <MenuSepataror text="Nastavení administrace" />
      <NavLinksAdmSettings />
    </MainMenuStyled>
  );
};

export default MainMenu;
