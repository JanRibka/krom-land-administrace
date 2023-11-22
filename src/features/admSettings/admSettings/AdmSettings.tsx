import FeatureStyled from "features/styledComponents/FeatureStyled";
import { useState } from "react";
import { useSelector } from "react-redux";
import Footer from "shared/components/footer/Footer";
import PageTitle from "shared/components/pageTitle/PageTitle";
import { UserRoleEnum } from "shared/enums/UserRoleEnum";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";
import { selectAdmSettings } from "shared/infrastructure/store/admSettings/admSettingsSlice";
import { selectAuthentication } from "shared/infrastructure/store/authentication/authenticationSlice";

import Stack from "@mui/material/Stack";

import TableOfKeys from "./tableOfKeys/TableOfKeys";

const AdmSettings = () => {
  // State
  const [saving, setSaving] = useState<boolean>(false);

  // Store
  const admSettings = useSelector(selectAdmSettings);
  const authentication = useSelector(selectAuthentication);

  // Constants
  const disable = authentication.UserRole === UserRoleEnum.USER;

  // Other
  const handleSaveOnClick = async () => {
    if (saving) return;

    setSaving(true);

    // await _webPartsService.actionsUpdate();

    setSaving(false);
  };

  return (
    <ErrorBoundary>
      <FeatureStyled>
        <Stack spacing={4}>
          <PageTitle title="Nastavení administrace" />
          <TableOfKeys />
        </Stack>
      </FeatureStyled>

      <Footer
        disable={!admSettings._roleListLoaded || disable}
        loading={saving}
        handleSaveOnClick={handleSaveOnClick}
      />
    </ErrorBoundary>
  );
};

export default AdmSettings;
