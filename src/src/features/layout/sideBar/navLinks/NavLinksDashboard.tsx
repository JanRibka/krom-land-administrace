import { Link } from 'react-router-dom';

import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import Box from '@mui/material/Box';

import { AppRoute } from '../../../../shared/infrastructure/router/appRoutes';
import NavLinksStyled from './styledComponents/NavLinksStyled';

const NavLinksDashboard = () => {
  return (
    <NavLinksStyled component='ul'>
      {/* Dashboard */}
      <Box component='li' data-route={AppRoute.Dashboard} title='Dashboard'>
        <Link to={AppRoute.Dashboard}>
          {
            <Box className='link-inner-wrapper'>
              <DashboardOutlinedIcon /> Dashboard
            </Box>
          }
        </Link>
      </Box>
    </NavLinksStyled>
  );
};

export default NavLinksDashboard;
