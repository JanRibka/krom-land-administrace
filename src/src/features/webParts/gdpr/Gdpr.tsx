import FeatureStyled from "features/styledComponents/FeatureStyled";
import SectionStyled from "features/styledComponents/SectionStyled";
import { useState } from "react";
import { useSelector } from "react-redux";
import Footer from "shared/components/footer/Footer";
import AppLoader from "shared/components/loader/AppLoader";
import AppNotification from "shared/components/notification/AppNotification";
import PageTitle from "shared/components/pageTitle/PageTitle";
import SectionSubTitle from "shared/components/sectionSubTitle/SectionSubTitle";
import SectionTitle from "shared/components/sectionTitle/SectionTitle";
import AppTextEditor from "shared/components/textEditor/AppTextEditor";
import AppTextField from "shared/components/textField/AppTextField";
import { useRequest } from "shared/dataAccess/useRequest";
import ConditionsDTO from "shared/DTOs/ConditionsDTO";
import JsonResulObjectDataDTO from "shared/DTOs/JsonResulObjectDataDTO";
import { UserRoleEnum } from "shared/enums/UserRoleEnum";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";
import { selectAuthentication } from "shared/infrastructure/store/authentication/authenticationSlice";
import { useWebPartsSlice } from "shared/infrastructure/store/webParts/useWebPartsSlice";
import { selectConditions } from "shared/infrastructure/store/webParts/webPartsSlice";
import ConditionsModel from "shared/models/ConditionsModel";
import { nameof } from "shared/nameof";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import WebPartsService from "../WebPartsService";
import { mapFromGdprDTO } from "./save/mapFromGdprDTO";

const Gdpr = () => {
  // State
  const [saving, setSaving] = useState<boolean>(false);

  // Store
  const conditions = useSelector(selectConditions);
  const authentication = useSelector(selectAuthentication);

  // Constants
  const _webPartsService = new WebPartsService();
  const { handleConditionsUpdate } = useWebPartsSlice();
  const disable = authentication.UserRole === UserRoleEnum.USER;

  // Other
  const handleTextFieldOnBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    const name: string = e.target.name;
    const value: string = e.target.value;

    handleConditionsUpdate({ [name]: value });
  };

  const handleTextEditorOnChange = (value: string, name: string) => {
    handleConditionsUpdate({ [name]: value });
  };

  /**
   * Get data
   */
  const { isLoading } = useRequest<JsonResulObjectDataDTO<ConditionsDTO>>(
    {
      baseUrl: process.env.REACT_APP_API_BASE_URL,
      url: (process.env.REACT_APP_API_URL ?? "") + "WebPartsController.php",
      params: new URLSearchParams({
        function: "getGdpr",
      }),
    },
    {
      Success: false,
      ErrMsg: "",
      Data: new ConditionsDTO(),
    },
    [],
    {
      apply: true,
      condition: () => conditions._gdprLoaded === false,
    },
    (data) => {
      const dataType = typeof data;

      if (dataType === "string") {
        AppNotification("Chyba", String(data), "danger");
      } else {
        if (data.Success) {
          handleConditionsUpdate(mapFromGdprDTO(data?.Data));
        } else {
          AppNotification("Chyba", data.ErrMsg ?? "", "danger");
        }
      }
    }
  );

  const handleSaveOnClick = async () => {
    if (saving) return;

    setSaving(true);

    await _webPartsService.gdprUpdate();

    setSaving(false);
  };

  return (
    <ErrorBoundary>
      <FeatureStyled>
        <Stack spacing={4}>
          <PageTitle title="GDPR" />
          <SectionStyled component="section">
            <SectionTitle title="GDPR" />
            <AppTextField
              name={nameof<ConditionsModel>("GdprLabel")}
              label="Nadpis"
              value={conditions.GdprLabel}
              variant="outlined"
              fullWidth
              required
              disabled={disable}
              autoComplete="off"
              onBlur={handleTextFieldOnBlur}
            />

            <Box className="sub-section-separator">
              <SectionSubTitle title="Popis" />
              <AppTextEditor
                name={nameof<ConditionsModel>("GdprText")}
                value={conditions.GdprText}
                placeholder="Popis"
                required
                disable={disable}
                onChange={handleTextEditorOnChange}
              />
            </Box>
          </SectionStyled>
        </Stack>

        {isLoading && <AppLoader />}
      </FeatureStyled>

      <Footer
        disable={!conditions._gdprLoaded || disable}
        loading={saving}
        handleSaveOnClick={handleSaveOnClick}
      />
    </ErrorBoundary>
  );
};

export default Gdpr;
