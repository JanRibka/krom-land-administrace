import { Link } from 'react-router-dom';

import AppSettingsAltIcon from '@mui/icons-material/AppSettingsAlt';
import WebStoriesIcon from '@mui/icons-material/WebStories';
import Box from '@mui/material/Box';

import { AppRoute } from '../../../../shared/infrastructure/router/appRoutes';
import NavLinksStyled from './styledComponents/NavLinksStyled';

const NavLinksWebSettings = () => {
  return (
    <NavLinksStyled component='ul'>
      {/* Web settings */}
      <Box
        component='li'
        data-route={AppRoute.WebSettings}
        title='Nastavení webu'
      >
        <Link to={AppRoute.WebSettings}>
          {
            <Box className='link-inner-wrapper'>
              <AppSettingsAltIcon /> Nastavení webu
            </Box>
          }
        </Link>
      </Box>

      {/* Web logos */}
      <Box component='li' data-route={AppRoute.Logos} title='Loga webu'>
        <Link to={AppRoute.Logos}>
          {
            <Box className='link-inner-wrapper'>
              <WebStoriesIcon /> Loga webu
            </Box>
          }
        </Link>
      </Box>
    </NavLinksStyled>
  );
};

export default NavLinksWebSettings;
