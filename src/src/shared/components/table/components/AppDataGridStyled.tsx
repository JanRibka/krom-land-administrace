import Box from "@mui/material/Box";
import { alpha, styled } from "@mui/material/styles";
import { gridClasses } from "@mui/x-data-grid";

const ODD_OPACITY = 0.5;

const AppDataGridStyled = styled(Box)(({ theme }) => ({
  ".grid-wrapper": {
    height: "fit-content",
    minHeight: "400px",

    ".MuiDataGrid-toolbarContainer": {
      button: {
        color: theme.palette.secondary.main,
      },

      ".MuiBadge-badge": {
        color: theme.palette.secondary.main,
        backgroundColor: theme.palette.secondary.light,
      },
    },

    ".MuiCheckbox-root": {
      svg: {
        fill: theme.palette.primary.dark,
      },
    },

    [`& .${gridClasses.row}.even`]: {
      backgroundColor: theme.palette.primary.light,
      "&:hover, &.Mui-hovered": {
        backgroundColor: alpha(theme.palette.primary.light, ODD_OPACITY),
        "@media (hover: none)": {
          backgroundColor: "transparent",
        },
      },
      "&.Mui-selected": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY + theme.palette.action.selectedOpacity,
        ),
        "&:hover, &.Mui-hovered": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY +
              theme.palette.action.selectedOpacity +
              theme.palette.action.hoverOpacity,
          ),
          "@media (hover: none)": {
            backgroundColor: alpha(
              theme.palette.primary.main,
              ODD_OPACITY + theme.palette.action.selectedOpacity,
            ),
          },
        },
      },
    },
  },
}));

export default AppDataGridStyled;
