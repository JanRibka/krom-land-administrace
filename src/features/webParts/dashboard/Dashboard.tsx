import PageTitle from "shared/components/pageTitle/PageTitle";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";

import { Stack } from "@mui/system";

import Reservations from "./reservations/Reservations";

const Dashboard = () => {
  return (
    <ErrorBoundary>
      <Stack spacing={4}>
        <PageTitle title='Dashboard' />
        <Reservations />
      </Stack>
    </ErrorBoundary>
  );
};

export default Dashboard;
