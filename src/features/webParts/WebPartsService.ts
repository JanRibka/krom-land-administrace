import { HttpStatusCode } from 'axios';
import AppNotification from 'shared/components/notification/AppNotification';
import ConditionsDTO from 'shared/DTOs/ConditionsDTO';
import JsonResulObjectDTO from 'shared/DTOs/JsonResulObjectDTO';
import Repository from 'shared/infrastructure/repositiory/Repository';
import { store } from 'shared/infrastructure/store/store';

import { mapToGdprDTO } from './gdpr/save/mapToGdprDTO';
import { mapToTermsOfConditionsDTO } from './termsOfConditions/save/mapToTermsOfConditionsDTO';

export default class WebPartsService {
  private _repo = new Repository();

  /**
   * GDPR update
   */
  public async gdprUpdate() {
    const state = store.getState();
    const conditions: ConditionsDTO = mapToGdprDTO(state.webParts.Conditions);

    const response = await this._repo.post<any, JsonResulObjectDTO>({
      url: (process.env.REACT_APP_API_URL ?? "") + "WebPartsController.php",
      params: new URLSearchParams({
        function: "gdprUpdate",
      }),
      data: conditions,
    });

    if (response.status === HttpStatusCode.Ok) {
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
    } else {
      AppNotification("Chyba", "Chyba při ukládání dat", "danger");
    }
  }

  /**
   * Term of conditions update
   */
  public async termsOfConditionsUpdate() {
    const state = store.getState();
    const conditions: ConditionsDTO = mapToTermsOfConditionsDTO(
      state.webParts.Conditions
    );

    const response = await this._repo.post<any, JsonResulObjectDTO>({
      url: (process.env.REACT_APP_API_URL ?? "") + "WebPartsController.php",
      params: new URLSearchParams({
        function: "termsOfConditionsUpdate",
      }),
      data: conditions,
    });

    if (response.status === HttpStatusCode.Ok) {
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
    } else {
      AppNotification("Chyba", "Chyba při ukládání dat", "danger");
    }
  }
}
