import SectionStyled from 'features/styledComponents/SectionStyled';
import { useTranslation } from 'react-i18next';
import SectionTitle from 'shared/components/sectionTitle/SectionTitle';
import ErrorBoundary from 'shared/infrastructure/ErrorBoundary';

const AboutUs = () => {
  // Consts
  const { t } = useTranslation(["home\\aboutUs"]);

  return (
    <ErrorBoundary>
      <SectionStyled>
        <SectionTitle mainText={t("sectionTitle")} />
      </SectionStyled>
    </ErrorBoundary>
  );
};

export default AboutUs;
