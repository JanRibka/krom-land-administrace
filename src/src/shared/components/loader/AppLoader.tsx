import CircularProgress from "@mui/material/CircularProgress";

import AppLoaderStyled from "./styledComponents/AppLoaderStyled";

const AppLoader = () => {
  return (
    <AppLoaderStyled>
      <CircularProgress size='100px' />
    </AppLoaderStyled>
  );
};

export default AppLoader;
