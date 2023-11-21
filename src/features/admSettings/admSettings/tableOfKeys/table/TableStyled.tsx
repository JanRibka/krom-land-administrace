import Box from "@mui/material/Box";
import { alpha, styled } from "@mui/material/styles";
import { gridClasses } from "@mui/x-data-grid";

const ODD_OPACITY = 0.5;

const TableStyled = styled(Box)(({ theme }) => ({
  "&:not(:first-of-type)": {
    marginTop: "32px",
  },

  ".grid-wrapper": {
    height: "fit-content",

    ".MuiDataGrid-toolbarContainer": {
      button: {
        color: theme.palette.secondary.main,
      },

      ".MuiBadge-badge": {
        color: theme.palette.secondary.main,
        backgroundColor: theme.palette.secondary.light,
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
          ODD_OPACITY + theme.palette.action.selectedOpacity
        ),
        "&:hover, &.Mui-hovered": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY +
              theme.palette.action.selectedOpacity +
              theme.palette.action.hoverOpacity
          ),
          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": {
            backgroundColor: alpha(
              theme.palette.primary.main,
              ODD_OPACITY + theme.palette.action.selectedOpacity
            ),
          },
        },
      },
    },
  },
}));

export default TableStyled;
