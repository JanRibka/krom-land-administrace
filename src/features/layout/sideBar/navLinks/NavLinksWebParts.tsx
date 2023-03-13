import { Link } from "react-router-dom";

import AttractionsOutlinedIcon from "@mui/icons-material/AttractionsOutlined";
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";
import ContactMailOutlinedIcon from "@mui/icons-material/ContactMailOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Box from "@mui/material/Box";

import { AppRoute } from "../../../../shared/infrastructure/router/appRoutes";
import NavLinksStyled from "./styledComponents/NavLinksStyled";

const NavLinksWebParts = () => {
  return (
    <NavLinksStyled component='ul'>
      {/* Home */}
      <Box component='li' data-route={AppRoute.Home}>
        <Link to={AppRoute.Home}>
          {
            <Box className='link-inner-wrapper'>
              <HomeOutlinedIcon /> Úvod
            </Box>
          }
        </Link>
      </Box>

      {/* Actions */}
      <Box component='li' data-route={AppRoute.Actions}>
        <Link to={AppRoute.Actions}>
          {
            <Box className='link-inner-wrapper'>
              <AttractionsOutlinedIcon /> Akce
            </Box>
          }
        </Link>
      </Box>

      {/* Gallery */}
      <Box component='li' data-route={AppRoute.Gallery}>
        <Link to={AppRoute.Gallery}>
          {
            <Box className='link-inner-wrapper'>
              <CollectionsOutlinedIcon /> Galerie
            </Box>
          }
        </Link>
      </Box>

      {/* Contact */}
      <Box component='li' data-route={AppRoute.Contact}>
        <Link to={AppRoute.Contact}>
          {
            <Box className='link-inner-wrapper'>
              <ContactMailOutlinedIcon /> Kontakt
            </Box>
          }
        </Link>
      </Box>
    </NavLinksStyled>
  );
};

export default NavLinksWebParts;
