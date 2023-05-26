import Box from '@mui/system/Box';
import styled from '@mui/system/styled';

const TableFilterDateStyled = styled(Box)(({ theme }) => ({
  marginBottom: "15px",

  "& > .MuiStack-root": {
    justifyContent: "end",

    ".reload-button-wrapper": {
      display: "flex",
      alignItems: "center",

      [theme.breakpoints.down("md")]: {
        justifyContent: "end",
      },

      button: {
        aspectRatio: "1 / 1",
        color: theme.palette.secondary.main,
      },
    },
  },
}));

export default TableFilterDateStyled;
