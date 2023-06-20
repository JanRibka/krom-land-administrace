import Unauthorized from "features/unauthorized/Unauthorized";

import PageStyled from "./styledComponents/PageStyled";

const UnauthorizedPage = () => {
  return (
    <PageStyled component='main'>
      <Unauthorized />
    </PageStyled>
  );
};

export default UnauthorizedPage;
