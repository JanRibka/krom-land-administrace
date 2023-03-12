import { forwardRef, Ref } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import AttractionsOutlinedIcon from '@mui/icons-material/AttractionsOutlined';
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Box from '@mui/material/Box';

import { AppRoute } from '../../../../shared/infrastructure/router/appRoutes';
import NavLinksStyled from './styledComponents/NavLinksStyled';

interface IProps {
  innerWrapperName: string;
}

const NavLinks = forwardRef((props: IProps, ref: Ref<HTMLDivElement>) => {
  // Consts
  const { t } = useTranslation(["layout\\sideBar"]);

  return (
    <NavLinksStyled ref={ref} component='nav' className='nav-links-wrapper'>
      <Box component='ul' id={props.innerWrapperName}>
        {/* Dashboard */}
        <Box component='li' data-route={AppRoute.Dashboard}>
          <Link to={AppRoute.Dashboard}>
            {
              <Box className='link-inner-wrapper'>
                <DashboardOutlinedIcon /> {t("dashboard")}
              </Box>
            }
          </Link>
        </Box>

        {/* Home */}
        <Box component='li' data-route={AppRoute.Home}>
          <Link to={AppRoute.Home}>
            {
              <Box className='link-inner-wrapper'>
                <HomeOutlinedIcon /> {t("home")}
              </Box>
            }
          </Link>
        </Box>

        {/* Actions */}
        <Box component='li' data-route={AppRoute.Actions}>
          <Link to={AppRoute.Actions}>
            {
              <Box className='link-inner-wrapper'>
                <AttractionsOutlinedIcon /> {t("actions")}
              </Box>
            }
          </Link>
        </Box>

        {/* Gallery */}
        <Box component='li' data-route={AppRoute.Gallery}>
          <Link to={AppRoute.Gallery}>
            {
              <Box className='link-inner-wrapper'>
                <CollectionsOutlinedIcon /> {t("gallery")}
              </Box>
            }
          </Link>
        </Box>

        {/* Contact */}
        <Box component='li' data-route={AppRoute.Contact}>
          <Link to={AppRoute.Contact}>
            {
              <Box className='link-inner-wrapper'>
                <ContactMailOutlinedIcon /> {t("contact")}
              </Box>
            }
          </Link>
        </Box>
      </Box>
    </NavLinksStyled>
  );
});

export default NavLinks;
