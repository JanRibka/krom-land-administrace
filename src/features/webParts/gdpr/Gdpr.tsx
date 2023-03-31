import SectionStyled from "features/styledComponents/SectionStyled";
import { useSelector } from "react-redux";
import PageTitle from "shared/components/pageTitle/PageTitle";
import SectionSubTitle from "shared/components/sectionSubTitle/SectionSubTitle";
import SectionTitle from "shared/components/sectionTitle/SectionTitle";
import AppTextEditor from "shared/components/textEditor/AppTextEditor";
import AppTextField from "shared/components/textField/AppTextField";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";
import { useWebPartsSlice } from "shared/infrastructure/store/webParts/useWebPartsSlice";
import { selectConditions } from "shared/infrastructure/store/webParts/webPartsSlice";
import ConditionsModel from "shared/models/ConditionsModel";
import { nameof } from "shared/nameof";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

const Gdpr = () => {
  // Store
  const conditions = useSelector(selectConditions);

  // Constants
  const { handleConditionsUpdate } = useWebPartsSlice();

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

  return (
    <ErrorBoundary>
      <Stack spacing={4}>
        <PageTitle title='GDPR' />
        <SectionStyled component='section'>
          <SectionTitle title='GDPR' />
          <AppTextField
            name={nameof<ConditionsModel>("GdprLabel")}
            label='Nadpis'
            value={conditions.GdprLabel}
            variant='outlined'
            fullWidth
            required
            autoComplete='off'
            onBlur={handleTextFieldOnBlur}
          />

          <Box className='sub-section-separator'>
            <SectionSubTitle title='Popis' />
            <AppTextEditor
              name={nameof<ConditionsModel>("GdprText")}
              value={conditions.GdprText}
              placeholder='Popis'
              required
              onChange={handleTextEditorOnChange}
            />
          </Box>
        </SectionStyled>
      </Stack>
    </ErrorBoundary>
  );
};

export default Gdpr;
