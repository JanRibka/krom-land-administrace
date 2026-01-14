import Typography from "@mui/material/Typography";

import PageTitleStyled from "./styledComponents/PageTitleStyled";

interface IProps {
  title: string;
}

const PageTitle = (props: IProps) => {
  return (
    <PageTitleStyled>
      <Typography variant='h1'>{props.title}</Typography>
    </PageTitleStyled>
  );
};

export default PageTitle;
