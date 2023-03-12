import { ReactNode } from "react";

import Footer from "./footer/Footer";
import NavBar from "./navBar/NavBar";
import SideBar from "./sideBar/SideBar";
import LayoutStyled from "./styledComponents/LayoutStyled";

interface IProps {
  children: ReactNode;
}

const Layout = (props: IProps) => {
  // Constants
  const sideBarWidth: number = 240;

  return (
    <LayoutStyled>
      <NavBar />
      <SideBar width={sideBarWidth} />
      {props.children}
      <Footer paddingLeft={sideBarWidth + 32} />
    </LayoutStyled>
  );
};

export default Layout;
