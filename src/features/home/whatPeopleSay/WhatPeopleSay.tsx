import SectionStyled from "features/styledComponents/SectionStyled";
import SectionTitle from "shared/components/sectionTitle/SectionTitle";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";

const WhatPeopleSay = () => {
  return (
    <ErrorBoundary>
      <SectionStyled>
        <SectionTitle mainText='Říkají o nás' />
      </SectionStyled>
    </ErrorBoundary>
  );
};

export default WhatPeopleSay;
