import DashboardDTO from "shared/DTOs/DashboardDTO";
import { DashboardState } from "shared/infrastructure/store/dashboard/dashboardSlice";

export const mapFromDashboardDTO = (dashboardDTO?: DashboardDTO | null) => {
  const result: Partial<DashboardState> = {};

  return result;
};
