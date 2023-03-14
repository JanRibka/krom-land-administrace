import PageTitle from "shared/components/pageTitle/PageTitle";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";

import Stack from "@mui/material/Stack";

import AboutUs from "./aboutUs/AboutUs";
import PageHeader from "./pageHeader/PageHeader";
import Seo from "./seo/Seo";
import WhatPeopleSay from "./whatPeopleSay/WhatPeopleSay";

const Home = () => {
  return (
    <ErrorBoundary>
      <Stack spacing={4}>
        <PageTitle title='Úvod' />
        <Seo />
        <PageHeader />
        <AboutUs />
        <WhatPeopleSay />
      </Stack>
    </ErrorBoundary>
  );
};

export default Home;
