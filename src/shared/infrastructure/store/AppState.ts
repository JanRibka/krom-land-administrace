import { AuthenticationState } from "./authentication/authenticationSlice";
import { WebPartsState } from "./webParts/webPartsSlice";

export default interface AppState {
  webParts: WebPartsState;
  authentication: AuthenticationState;
}
