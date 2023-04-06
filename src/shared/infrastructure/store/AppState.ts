import { CommonState } from "./common/commonSlice";
import { LoginState } from "./login/loginSlice";
import { WebPartsState } from "./webParts/webPartsSlice";

export default interface AppState {
  webParts: WebPartsState;
  common: CommonState;
  login: LoginState;
}
