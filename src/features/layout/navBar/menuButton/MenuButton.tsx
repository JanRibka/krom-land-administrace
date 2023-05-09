import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import IconButton from '@mui/material/IconButton';

import MenuButtonStyled from './styledComponents/MenuButtonStyled';

interface IProps {
  handleButtonOnClickOpen: () => void;
  handleButtonOnClickClose: () => void;
}

const MenuButton = (props: IProps) => {
  return (
    <MenuButtonStyled id='menu-button'>
      <IconButton
        className='button-close'
        onClick={props.handleButtonOnClickClose}
      >
        <KeyboardArrowLeftIcon />
      </IconButton>

      <IconButton
        className='button-open'
        onClick={props.handleButtonOnClickOpen}
      >
        <KeyboardArrowRightIcon />
      </IconButton>
    </MenuButtonStyled>
  );
};

export default MenuButton;
