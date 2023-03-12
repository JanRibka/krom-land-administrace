import SectionStyled from "features/styledComponents/SectionStyled";
import { useTranslation } from "react-i18next";
import SectionTitle from "shared/components/sectionTitle/SectionTitle";
import AppTextArea from "shared/components/textArea/AppTextArea";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";

import Stack from "@mui/material/Stack";

import FileUpload from "../../../shared/components/fileUpload/FileUpload";

const AboutUs = () => {
  // Consts
  const { t } = useTranslation(["home\\aboutUs"]);

  return (
    <ErrorBoundary>
      <SectionStyled>
        <SectionTitle mainText={t("sectionTitle")} />
        <Stack spacing={2} direction='column'>
          <AppTextArea
            name=''
            label={t("description")}
            value=''
            fullWidth
            required
            rows={4}
            maxLength={1000}
            onBlur={() => {}}
          />

          <FileUpload
            FileName=''
            Name=''
            Label=''
            SupportedExtensions={["pdf"]}
            MaxFileSize={5}
          />
        </Stack>
      </SectionStyled>
    </ErrorBoundary>
  );
};

export default AboutUs;
