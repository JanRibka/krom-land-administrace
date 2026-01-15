import FeatureStyled from "features/styledComponents/FeatureStyled";
import { useSelector } from "react-redux";
import AppLoader from "shared/components/loader/AppLoader";
import AppNotification from "shared/components/notification/AppNotification";
import PageTitle from "shared/components/pageTitle/PageTitle";
import { useRequest } from "shared/dataAccess/useRequest";
import DashboardDTO from "shared/DTOs/DashboardDTO";
import JsonResulObjectDataDTO from "shared/DTOs/JsonResulObjectDataDTO";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";
import { selectDashboard } from "shared/infrastructure/store/dashboard/dashboardSlice";
import { useDashboardSlice } from "shared/infrastructure/store/dashboard/useDashboardSlice";

import { Stack } from "@mui/system";

import Registrations from "./registrations/Registrations";
import { mapFromDashboardDTO } from "./save/mapFromDashboardDTO";

const Dashboard = () => {
  // Store
  const dashboard = useSelector(selectDashboard);

  // Constants
  const { handleDashboardUpdate } = useDashboardSlice();

  /**
   * Get data
   */
  const { isLoading } = useRequest<JsonResulObjectDataDTO<DashboardDTO>>(
    {
      baseUrl: process.env.REACT_APP_API_BASE_URL,
      url: (process.env.REACT_APP_API_URL ?? "") + "DashboardController.php",
      params: new URLSearchParams({
        function: "getDashboard",
      }),
    },
    {
      Success: false,
      ErrMsg: "",
      Data: new DashboardDTO(),
    },
    [],
    {
      apply: true,
      condition: () => dashboard._dashboardLoaded === false,
    },
    (data) => {
      const dataType = typeof data;

      if (dataType === "string") {
        AppNotification("Chyba", String(data), "danger");
      } else {
        if (data.Success) {
          handleDashboardUpdate(mapFromDashboardDTO(data?.Data));
        } else {
          AppNotification("Chyba", data.ErrMsg ?? "", "danger");
        }
      }
    }
  );

  return (
    <ErrorBoundary>
      <FeatureStyled>
        <Stack spacing={4}>
          <PageTitle title="Dashboard" />
          <Registrations />
        </Stack>

        {isLoading && <AppLoader />}
      </FeatureStyled>
    </ErrorBoundary>
  );
};

export default Dashboard;
