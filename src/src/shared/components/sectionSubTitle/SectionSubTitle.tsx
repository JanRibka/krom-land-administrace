import Typography from '@mui/material/Typography';

import SectionSubTitleStyled from './styledComponents/SectionSubTitleStyled';

interface IProps {
  title: string;
}

const SectionSubTitle: React.FC<IProps> = (props) => {
  return (
    <SectionSubTitleStyled>
      <Typography className='title' variant='h4'>
        {props.title}
      </Typography>
    </SectionSubTitleStyled>
  );
};

export default SectionSubTitle;
