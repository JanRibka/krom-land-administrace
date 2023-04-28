import SignOut from './signOut/SignOut';
import NavBarStyled from './styledComponets/NavBarStyled';
import ToolBarStyled from './styledComponets/ToolBarStyled';

const NavBar = () => {
  return (
    <NavBarStyled>
      <ToolBarStyled>
        <SignOut />
      </ToolBarStyled>
    </NavBarStyled>
  );
};

export default NavBar;
