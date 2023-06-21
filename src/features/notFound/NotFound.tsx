import { useNavigate } from "react-router-dom";
import { AppRoute } from "shared/infrastructure/router/appRoutes";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Neanderthal from "./neanderthal/Neanderthal";
import NotFoundStyled from "./styledComponents/NotFoundStyled";

const NotFound = () => {
  // Constants
  const navigate = useNavigate();

  // Other
  const handleHomeOnClick = () => {
    navigate(AppRoute.Home);
  };

  return (
    <NotFoundStyled>
      <Box className='content-wrapper'>
        <Typography className='error-text'>chyba</Typography>
        <Neanderthal />
        <Typography className='not-found-text'>
          Stránka nebyla nalezena
        </Typography>
        <Typography className='not-found-helper-text'>
          Stránka, kterou hledáte mohla být odstrněna, změnil se její název,
          nebo je dočasně nedostupná
        </Typography>
        <Button
          variant='contained'
          color='secondary'
          onClick={handleHomeOnClick}
        >
          Úvod
        </Button>
      </Box>
    </NotFoundStyled>
  );
};

export default NotFound;
