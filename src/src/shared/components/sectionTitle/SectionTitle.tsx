import Typography from "@mui/material/Typography";

import SectionTitleStyled from "./styledComponents/SectionTitleStyled";

interface IProps {
  title: string;
}

const SectionTitle: React.FC<IProps> = (props) => {
  return (
    <SectionTitleStyled>
      <Typography className='title' variant='h2'>
        {props.title}
      </Typography>
    </SectionTitleStyled>
  );
};

export default SectionTitle;
