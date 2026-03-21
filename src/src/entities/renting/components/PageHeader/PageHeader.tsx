import { RentingState } from "entities/renting/store";
import SectionStyled from "features/styledComponents/SectionStyled";
import ImageUpload from "shared/components/imageUpload/ImageUpload";
import AppPageHeader from "shared/components/pageHeader/AppPageHeader";
import SectionSubTitle from "shared/components/sectionSubTitle/SectionSubTitle";
import SectionTitle from "shared/components/sectionTitle/SectionTitle";
import { ImageLocationEnum } from "shared/enums/ImageLocationEnum";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";
import ImageModel from "shared/models/ImageModel";
import { nameof } from "shared/nameof";

import Box from "@mui/material/Box";

import { usePageHeaderLogic } from "./hooks/usePageHeaderLogic";
import { PageHeaderProps } from "./types/PageHeaderProps";

export const PageHeader = ({ disable }: PageHeaderProps) => {
  const {
    renting,
    handleTextFieldOnBlur,
    handleOnAfterFileUpload,
    handleOnAfterFileDelete,
    handleOnFileSave,
  } = usePageHeaderLogic();

  return (
    <ErrorBoundary>
      <SectionStyled component="section">
        <SectionTitle title="Hlavička stránky" />
        <SectionSubTitle title="Hlavní text" />
        <AppPageHeader
          nameText={nameof<RentingState>("pageHeaderTextMain")}
          valueText={renting.pageHeaderTextMain}
          nameColor={nameof<RentingState>("pageHeaderTextMainColor")}
          valueColor={renting.pageHeaderTextMainColor}
          disable={disable}
          handleTextFieldOnBlur={handleTextFieldOnBlur}
        />
        <Box className="sub-section-separator">
          <SectionSubTitle title="Obrázek" />
          <ImageUpload
            image={renting.mainImage ?? new ImageModel()}
            name={nameof<RentingState>("mainImage")}
            label="Ideální rozlišení obrázku 1903 x 760px. Max. velikost 1MB"
            supportedExtensions={["png", "jpg", "jpeg"]}
            newImageAlt="Úvodní obrázek stránky úvod | KROM Land"
            maxFileSize={1}
            location={ImageLocationEnum.RENTING}
            id={renting.idRentingPage}
            disable={disable}
            onAfterFileUpload={handleOnAfterFileUpload}
            onAfterFileDelete={handleOnAfterFileDelete}
            onFileSave={handleOnFileSave}
          />
        </Box>
      </SectionStyled>
    </ErrorBoundary>
  );
};
