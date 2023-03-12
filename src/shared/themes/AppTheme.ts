import { csCZ } from "@mui/material/locale";
import { createTheme } from "@mui/material/styles";

// Colors definition
const palettePrimaryMain = "rgb(238, 238, 238)";
const palettePrimaryDark = "rgb(214, 214, 214)";

// Components theme
const AppThemeComponets = createTheme({ components: {} }, csCZ);

// Palette theme
const AppThemePallete = createTheme(AppThemeComponets, {
  palette: {
    primary: {
      main: palettePrimaryMain,
      dark: palettePrimaryDark,
    },
  },
});

const AppTheme = createTheme(AppThemePallete, {});

export default AppTheme;
