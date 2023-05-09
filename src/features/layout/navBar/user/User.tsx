import { useSelector } from "react-redux";
import { selectAuthentication } from "shared/infrastructure/store/authentication/authenticationSlice";

import Typography from "@mui/material/Typography";

import UserStyled from "./styledComponents/UserStyled";

const User = () => {
  // Store
  const auth = useSelector(selectAuthentication);

  return (
    <UserStyled>
      <Typography className='user-name'>{auth.UserName}</Typography>
    </UserStyled>
  );
};

export default User;
