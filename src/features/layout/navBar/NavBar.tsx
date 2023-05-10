import MenuButton from "./menuButton/MenuButton";
import SignOut from "./signOut/SignOut";
import NavBarStyled from "./styledComponets/NavBarStyled";
import ToolBarStyled from "./styledComponets/ToolBarStyled";
import User from "./user/User";

interface IProps {
  handleButtonOnClickOpen: () => void;
  handleButtonOnClickClose: () => void;
}

const NavBar = (props: IProps) => {
  return (
    <NavBarStyled id='nav-bar'>
      <ToolBarStyled>
        <MenuButton
          handleButtonOnClickOpen={props.handleButtonOnClickOpen}
          handleButtonOnClickClose={props.handleButtonOnClickClose}
        />
        <User />
        <SignOut />
      </ToolBarStyled>
    </NavBarStyled>
  );
};

export default NavBar;
