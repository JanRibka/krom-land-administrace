import { AuthenticationState } from "./authentication/authenticationSlice";
import { DashboardState } from "./dashboard/dashboardSlice";
import { WebPartsState } from "./webParts/webPartsSlice";
import { WebSettingsState } from "./webSettings/webSettingsSlice";

export default interface AppState {
  authentication: AuthenticationState;
  dashboard: DashboardState;
  webParts: WebPartsState;
  webSettings: WebSettingsState;
}
