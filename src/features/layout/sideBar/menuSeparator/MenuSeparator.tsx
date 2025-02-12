import MenuSeparatorStyled from './styledComponents/MenuSeparatorStyled';

interface IProps {
  text: string;
}

const MenuSepataror = (props: IProps) => {
  return (
    <MenuSeparatorStyled className='menu-separator' variant='h2'>
      {props.text}
    </MenuSeparatorStyled>
  );
};

export default MenuSepataror;
