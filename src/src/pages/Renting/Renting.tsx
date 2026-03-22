import FeatureStyled from "features/styledComponents/FeatureStyled";
import PageStyled from "pages/styledComponents/PageStyled";
import Footer from "shared/components/footer/Footer";
import AppLoader from "shared/components/loader/AppLoader";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";
import { PageHead } from "widgets/PageHead";
import { RentingManagement } from "widgets/RentingManagement";

import Stack from "@mui/system/Stack";

import { useRentingPage } from "./hooks/useRentingPage";

const Renting = () => {
  const {
    renting,
    disable,
    isLoading,
    isSaving,
    handleTextFieldOnBlur,
    handleSaveOnClick,
    nameofRenting,
  } = useRentingPage();

  return (
    <PageStyled component="main">
      <ErrorBoundary>
        <FeatureStyled>
          <Stack spacing={4}>
            <PageHead
              disable={disable}
              nameTitle={nameofRenting("title")}
              nameDescription={nameofRenting("description")}
              valueTitle={renting.title}
              valueDescription={renting.description}
              handleTextFieldOnBlur={handleTextFieldOnBlur}
            />
            <RentingManagement renting={renting} />
          </Stack>

          {isLoading && <AppLoader />}
        </FeatureStyled>
        <Footer
          disable={!renting._dataLoaded || disable}
          loading={isSaving}
          handleSaveOnClick={handleSaveOnClick}
        />
      </ErrorBoundary>
    </PageStyled>
  );
};

export default Renting;
