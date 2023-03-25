import PageTitle from "shared/components/pageTitle/PageTitle";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";

import Stack from "@mui/material/Stack";

import Email from "./email/Email";
import GoogleMaps from "./googleMaps/GoogleMaps";
import PageHeader from "./pageHeader/PageHeader";
import Seo from "./seo/Seo";

const Contact = () => {
  return (
    <ErrorBoundary>
      <Stack spacing={4}>
        <PageTitle title='Kontakt' />
        <Seo />
        <PageHeader />
        <GoogleMaps />
        <Email />
      </Stack>
    </ErrorBoundary>
  );
};

export default Contact;
