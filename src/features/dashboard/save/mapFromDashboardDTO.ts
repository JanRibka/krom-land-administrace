import DashboardDTO from "shared/DTOs/DashboardDTO";
import { DashboardState } from "shared/infrastructure/store/dashboard/dashboardSlice";

export const mapFromDashboardDTO = (dashboardDTO?: DashboardDTO | null) => {
  const result: Partial<DashboardState> = {
    FilterDateFrom: dashboardDTO?.FilterDateFrom,
    FilterDateTo: dashboardDTO?.FilterDateTo,
    Registrations: dashboardDTO?.Registrations ?? [],
    _dataLoaded: true,
  };

  return result;
};
