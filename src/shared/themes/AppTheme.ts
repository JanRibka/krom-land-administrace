import { csCZ } from '@mui/material/locale';
import { createTheme } from '@mui/material/styles';

// Colors definition
const palettePrimaryMain = "rgb(238, 238, 238)";
const palettePrimaryDark = "rgb(214, 214, 214)";
const paletteSecondaryLight = "rgb(254, 205, 210)";
const paletteSecondaryMain = "rgb(253, 126, 143)";
const paletteSecondaryDark = "rgb(227, 113, 128)";

// Components theme
const AppThemeComponets = createTheme({ components: {} }, csCZ);

// Palette theme
const AppThemePallete = createTheme(AppThemeComponets, {
  palette: {
    primary: {
      main: palettePrimaryMain,
      dark: palettePrimaryDark,
    },
    secondary: {
      light: paletteSecondaryLight,
      main: paletteSecondaryMain,
      dark: paletteSecondaryDark,
    },
  },
});

const AppTheme = createTheme(AppThemePallete, {});

export default AppTheme;
