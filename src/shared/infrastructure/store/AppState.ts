import { CommonState } from "./common/commonSlice";
import { WebPartsState } from "./webParts/webPartsSlice";

export default interface AppState {
  webParts: WebPartsState;
  common: CommonState;
}
