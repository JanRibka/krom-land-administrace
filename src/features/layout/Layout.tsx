import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import NavBar from "./navBar/NavBar";
import SideBar from "./sideBar/SideBar";
import LayoutStyled from "./styledComponents/LayoutStyled";

const Layout = () => {
  // Constants
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"));

  // Other
  useEffect(() => {
    const sideBar = document.getElementById("side-bar");
    const menuButton = document.getElementById("menu-button");
    const navBar = document.getElementById("nav-bar");
    const layout = document.getElementById("layout");

    if (lgUp) {
      sideBar?.classList.add("opened");
      menuButton?.classList.add("opened");
      navBar?.classList.add("opened");
      layout?.classList.add("opened");
    } else {
      sideBar?.classList.remove("opened");
      menuButton?.classList.remove("opened");
      navBar?.classList.remove("opened");
      layout?.classList.remove("opened");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lgUp]);

  const handleButtonOnClickOpen = () => {
    const sideBar = document.getElementById("side-bar");
    const menuButton = document.getElementById("menu-button");
    const navBar = document.getElementById("nav-bar");
    const layout = document.getElementById("layout");

    sideBar?.classList.add("opened");
    menuButton?.classList.add("opened");
    navBar?.classList.add("opened");
    layout?.classList.add("opened");
  };

  const handleButtonOnClickClose = () => {
    const sideBar = document.getElementById("side-bar");
    const menuButton = document.getElementById("menu-button");
    const navBar = document.getElementById("nav-bar");
    const layout = document.getElementById("layout");

    sideBar?.classList.remove("opened");
    menuButton?.classList.remove("opened");
    navBar?.classList.remove("opened");
    layout?.classList.remove("opened");
  };

  return (
    <LayoutStyled id='layout'>
      <NavBar
        handleButtonOnClickOpen={handleButtonOnClickOpen}
        handleButtonOnClickClose={handleButtonOnClickClose}
      />
      <SideBar />
      <Outlet />
    </LayoutStyled>
  );
};

export default Layout;
