import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import MainMenu from './mainMenu/MainMenu';
import SideBarStyled from './styledComponents/SideBarStyled';

const SideBar = () => {
  return (
    <SideBarStyled id='side-bar' variant='permanent' anchor='left'>
      <Toolbar>
        <Box className='menu-wrapper'>
          <MainMenu />
        </Box>
      </Toolbar>
    </SideBarStyled>
  );
};

export default SideBar;
