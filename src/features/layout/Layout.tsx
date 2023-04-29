import { Outlet } from "react-router-dom";

import Footer from "./footer/Footer";
import NavBar from "./navBar/NavBar";
import SideBar from "./sideBar/SideBar";
import LayoutStyled from "./styledComponents/LayoutStyled";

const Layout = () => {
  // Constants
  const sideBarWidth: number = 240;

  return (
    <LayoutStyled>
      <NavBar />
      <SideBar width={sideBarWidth} />
      {<Outlet />}
      <Footer paddingLeft={sideBarWidth + 32} />
    </LayoutStyled>
  );
};

export default Layout;
