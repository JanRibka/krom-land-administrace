import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import MainMenu from './mainMenu/MainMenu';
import SideBarStyled from './styledComponents/SideBarStyled';

interface IProps {
  width: number;
}

const SideBar = (props: IProps) => {
  return (
    <SideBarStyled
      variant='permanent'
      anchor='left'
      sx={{
        width: props.width,
        ".MuiDrawer-paper": {
          width: props.width,
        },
      }}
    >
      <Toolbar>
        <Box className='menu-wrapper'>
          <MainMenu />
        </Box>
      </Toolbar>
    </SideBarStyled>
  );
};

export default SideBar;
