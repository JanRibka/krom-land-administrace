import SectionStyled from 'features/styledComponents/SectionStyled';
import { useTranslation } from 'react-i18next';
import SectionTitle from 'shared/components/sectionTitle/SectionTitle';

const AboutUs = () => {
  // Consts
  const { t } = useTranslation(["home\\aboutUs"]);

  return (
    <SectionStyled>
      <SectionTitle mainText={t("sectionTitle")} />
    </SectionStyled>
  );
};

export default AboutUs;
