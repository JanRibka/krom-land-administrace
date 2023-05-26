import { Link } from "react-router-dom";

import PeopleIcon from "@mui/icons-material/People";
import Box from "@mui/material/Box";

import { AppRoute } from "../../../../shared/infrastructure/router/appRoutes";
import NavLinksStyled from "./styledComponents/NavLinksStyled";

const NavLinksUsers = () => {
  return (
    <NavLinksStyled component='ul'>
      {/* Users */}
      <Box component='li' data-route={AppRoute.Users}>
        <Link to={AppRoute.Users}>
          {
            <Box className='link-inner-wrapper'>
              <PeopleIcon /> Uživatelé
            </Box>
          }
        </Link>
      </Box>
    </NavLinksStyled>
  );
};

export default NavLinksUsers;
