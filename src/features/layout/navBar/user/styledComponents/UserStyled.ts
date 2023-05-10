import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const UserStyled = styled(Box)(({ theme }) => ({
  display: "flex",
  flex: 1,
  justifyContent: "end",
  paddingRight: "15px",

  ".user-name": {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "rgba(0,0,0,0.87)",

    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
}));

export default UserStyled;
