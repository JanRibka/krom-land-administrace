import SectionStyled from 'features/styledComponents/SectionStyled';
import { useTranslation } from 'react-i18next';
import SectionTitle from 'shared/components/sectionTitle/SectionTitle';
import ErrorBoundary from 'shared/infrastructure/ErrorBoundary';

const WhatPeopleSay = () => {
  // Consts
  const { t } = useTranslation(["home\\whatPeopleSay"]);

  return (
    <ErrorBoundary>
      <SectionStyled>
        <SectionTitle mainText={t("sectionTitle")} />
      </SectionStyled>
    </ErrorBoundary>
  );
};

export default WhatPeopleSay;
