import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import NavBar from './navBar/NavBar';
import SideBar from './sideBar/SideBar';
import LayoutStyled from './styledComponents/LayoutStyled';

const Layout = () => {
  // Constants
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"));

  // Other
  useEffect(() => {
    const sideBar = document.getElementById("side-bar");
    const menuButton = document.getElementById("menu-button");

    if (lgUp) {
      sideBar?.classList.add("opened");
      menuButton?.classList.add("opened");
    } else {
      sideBar?.classList.remove("opened");
      menuButton?.classList.remove("opened");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lgUp]);

  const handleButtonOnClickOpen = () => {
    const sideBar = document.getElementById("side-bar");
    const menuButton = document.getElementById("menu-button");
    sideBar?.classList.add("opened");
    menuButton?.classList.add("opened");
  };

  const handleButtonOnClickClose = () => {
    const sideBar = document.getElementById("side-bar");
    const menuButton = document.getElementById("menu-button");
    sideBar?.classList.remove("opened");
    menuButton?.classList.remove("opened");
  };

  return (
    <LayoutStyled>
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
