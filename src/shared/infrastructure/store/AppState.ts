import { AuthenticationState } from "./authentication/authenticationSlice";
import { DashboardState } from "./dashboard/dashboardSlice";
import { WebPartsState } from "./webParts/webPartsSlice";

export default interface AppState {
  webParts: WebPartsState;
  authentication: AuthenticationState;
  dashboard: DashboardState;
}
