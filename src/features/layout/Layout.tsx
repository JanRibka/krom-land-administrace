import { Outlet } from 'react-router-dom';

import NavBar from './navBar/NavBar';
import SideBar from './sideBar/SideBar';
import LayoutStyled from './styledComponents/LayoutStyled';

const Layout = () => {
  // Constants
  const sideBarWidth: number = 240;

  return (
    <LayoutStyled>
      <NavBar />
      <SideBar width={sideBarWidth} />
      <Outlet />
    </LayoutStyled>
  );
};

export default Layout;
