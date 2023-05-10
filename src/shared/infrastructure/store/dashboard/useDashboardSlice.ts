import { useDispatch } from "react-redux";

import { actions, DashboardState } from "./dashboardSlice";

export const useDashboardSlice = () => {
  const dispatch = useDispatch();

  const handleDashboardUpdate = (dashboard: Partial<DashboardState>) => {
    dispatch(actions.dashboardUpdate(dashboard));
  };

  return {
    handleDashboardUpdate,
  };
};
