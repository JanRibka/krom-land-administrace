import { Link } from "react-router-dom";

import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import Box from "@mui/material/Box";

import { AppRoute } from "../../../../shared/infrastructure/router/appRoutes";
import NavLinksStyled from "./styledComponents/NavLinksStyled";

const NavLinksAdmSettings = () => {
  return (
    <NavLinksStyled component="ul">
      {/* Administration settings */}
      <Box
        component="li"
        data-route={AppRoute.AdmSettings}
        title="Nastavení administrace"
      >
        <Link to={AppRoute.AdmSettings}>
          {
            <Box className="link-inner-wrapper">
              <SettingsIcon /> Nastavení administrace
            </Box>
          }
        </Link>
      </Box>
      {/* Users */}
      <Box component="li" data-route={AppRoute.Users} title="Uživatelé">
        <Link to={AppRoute.Users}>
          {
            <Box className="link-inner-wrapper">
              <PeopleIcon /> Uživatelé
            </Box>
          }
        </Link>
      </Box>
    </NavLinksStyled>
  );
};

export default NavLinksAdmSettings;
