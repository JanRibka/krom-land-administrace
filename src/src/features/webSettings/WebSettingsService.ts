import AppNotification from "shared/components/notification/AppNotification";
import JsonResulObjectDTO from "shared/DTOs/JsonResulObjectDTO";
import WebSettingsDTO from "shared/DTOs/WebSettingsDTO";
import Repository from "shared/infrastructure/repositiory/Repository";
import { store } from "shared/infrastructure/store/store";

import { mapToWebSettingsDTO } from "./webSettings/save/mapToWebSettingsDTO";

export default class WebSettingsService {
  private _repo = new Repository();

  /**
   * Web settings update
   */
  public async webSettingsUpdate() {
    const state = store.getState();
    const webSettings: WebSettingsDTO = mapToWebSettingsDTO(
      state.webSettings.WebSettings
    );

    const response = await this._repo.post<any, JsonResulObjectDTO>({
      baseUrl: process.env.REACT_APP_API_BASE_URL ?? "",
      url: (process.env.REACT_APP_API_URL ?? "") + "WebSettingsController.php",
      params: new URLSearchParams({
        function: "webSettingsUpdate",
      }),
      data: webSettings,
    });

    const dataType = typeof response.data;

    if (dataType === "string") {
      AppNotification("Chyba", String(response.data), "danger");
    } else if (dataType === "object") {
      if (response.data?.Success) {
        AppNotification("Úspěch", "Úspěšně uloženo", "success");
      } else {
        AppNotification("Chyba", response.data?.ErrMsg ?? "", "danger");
      }
    } else {
      AppNotification("Úspěch", "Úspěšně uloženo", "success");
    }
  }
}
