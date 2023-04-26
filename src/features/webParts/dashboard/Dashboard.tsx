import PageTitle from "shared/components/pageTitle/PageTitle";
import useAxiosPrivate from "shared/customHooks/useAxiosPrivate";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";
import Repository from "shared/infrastructure/repositiory/Repository";

import Button from "@mui/material/Button";
import { Stack } from "@mui/system";

import Reservations from "./reservations/Reservations";

const Dashboard = () => {
  const axiosPrivate = useAxiosPrivate();
  const _repository = new Repository();
  const handleTestData = async () => {
    const response = await _repository.post({
      axiosPrivate: axiosPrivate,
      url: (process.env.REACT_APP_API_URL ?? "") + "DocumentController.php",
      params: new URLSearchParams({
        function: "test",
      }),
    });

    console.log(response);
  };

  return (
    <ErrorBoundary>
      <Stack spacing={4}>
        <PageTitle title='Dashboard' />
        <Reservations />
      </Stack>
      <Button onClick={handleTestData}>Test data</Button>
    </ErrorBoundary>
  );
};

export default Dashboard;
