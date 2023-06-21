import { Link } from 'react-router-dom';

import AttractionsOutlinedIcon from '@mui/icons-material/AttractionsOutlined';
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
import FaceRetouchingOffIcon from '@mui/icons-material/FaceRetouchingOff';
import GavelIcon from '@mui/icons-material/Gavel';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Box from '@mui/material/Box';

import { AppRoute } from '../../../../shared/infrastructure/router/appRoutes';
import NavLinksStyled from './styledComponents/NavLinksStyled';

const NavLinksWebParts = () => {
  return (
    <NavLinksStyled component='ul'>
      {/* Home */}
      <Box component='li' data-route={AppRoute.Home} title='Úvod'>
        <Link to={AppRoute.Home}>
          {
            <Box className='link-inner-wrapper'>
              <HomeOutlinedIcon /> Úvod
            </Box>
          }
        </Link>
      </Box>

      {/* Actions */}
      <Box component='li' data-route={AppRoute.Actions} title='Akce'>
        <Link to={AppRoute.Actions}>
          {
            <Box className='link-inner-wrapper'>
              <AttractionsOutlinedIcon /> Akce
            </Box>
          }
        </Link>
      </Box>

      {/* Gallery */}
      <Box component='li' data-route={AppRoute.Gallery} title='Galerie'>
        <Link to={AppRoute.Gallery}>
          {
            <Box className='link-inner-wrapper'>
              <CollectionsOutlinedIcon /> Galerie
            </Box>
          }
        </Link>
      </Box>

      {/* Contact */}
      <Box component='li' data-route={AppRoute.Contact} title='Kontakt'>
        <Link to={AppRoute.Contact}>
          {
            <Box className='link-inner-wrapper'>
              <ContactMailOutlinedIcon /> Kontakt
            </Box>
          }
        </Link>
      </Box>

      {/* GDPR */}
      <Box component='li' data-route={AppRoute.Gdpr} title='GDPR'>
        <Link to={AppRoute.Gdpr}>
          {
            <Box className='link-inner-wrapper'>
              <FaceRetouchingOffIcon /> GDPR
            </Box>
          }
        </Link>
      </Box>

      {/* Terms of conditions */}
      <Box
        component='li'
        data-route={AppRoute.TermsOfConditions}
        title='Obchodní podmínky'
      >
        <Link to={AppRoute.TermsOfConditions}>
          {
            <Box className='link-inner-wrapper'>
              <GavelIcon /> Obchodní podmínky
            </Box>
          }
        </Link>
      </Box>
    </NavLinksStyled>
  );
};

export default NavLinksWebParts;
