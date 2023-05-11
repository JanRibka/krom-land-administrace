import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const RegistrationsTableStyled = styled(Box)(({ theme }) => ({
  height: "800px",

  ".MuiDataGrid-toolbarContainer": {
    button: {
      color: theme.palette.secondary.main,
    },
  },
}));

export default RegistrationsTableStyled;
