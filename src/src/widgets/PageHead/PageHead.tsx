import PageTitle from "shared/components/pageTitle/PageTitle";
import AppSeo from "shared/components/seo/AppSeo";

import Stack from "@mui/system/Stack";

import { PageHeadProps } from "./types/PageHeadProps";
import { PageHeader } from "entities/renting";

export const PageHead = ({
  disable,
  nameTitle,
  nameDescription,
  valueTitle,
  valueDescription,
  handleTextFieldOnBlur,
}: PageHeadProps) => {
  return (
    <Stack spacing={4}>
      <PageTitle title="Půjčovna" />
      <AppSeo
        nameTitile={nameTitle}
        nameDescription={nameDescription}
        valueTitle={valueTitle}
        valueDescription={valueDescription}
        disable={disable}
        handleTextFieldOnBlur={handleTextFieldOnBlur}
      />
      <PageHeader disable={disable} />
    </Stack>
  );
};
