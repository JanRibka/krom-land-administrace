import AppLoader from "shared/components/loader/AppLoader";

import LoadingStyled from "./styledComponents/LoadingStyled";

const Loading = () => {
  return (
    <LoadingStyled>
      <AppLoader />
    </LoadingStyled>
  );
};

export default Loading;
