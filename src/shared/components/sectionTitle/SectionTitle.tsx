import Typography from '@mui/material/Typography';

import SectionTitleStyled from './styledComponents/SectionTitleStyled';

interface IProps {
  mainText: string;
  secondaryText?: string;
  secondaryTextColor?: string;
}

const SectionTitle: React.FC<IProps> = (props) => {
  return (
    <SectionTitleStyled>
      <Typography className='main-text' variant='h3'>
        {props.mainText}
      </Typography>
    </SectionTitleStyled>
  );
};

export default SectionTitle;
