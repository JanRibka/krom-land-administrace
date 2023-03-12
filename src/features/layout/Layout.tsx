import { ReactNode } from "react";

import NavBar from "./navBar/NavBar";
import SideBar from "./sideBar/SideBar";
import LayoutStyled from "./styledComponents/LayoutStyled";

interface IProps {
  children: ReactNode;
}

const Layout = (props: IProps) => {
  return (
    <LayoutStyled>
      <NavBar />
      <SideBar />
      {props.children}
    </LayoutStyled>
  );
};

export default Layout;
