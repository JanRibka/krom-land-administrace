import { HttpStatusCode } from "axios";
import AppNotification from "shared/components/notification/AppNotification";
import JsonResulObjectDataDTO from "shared/DTOs/JsonResulObjectDataDTO";
import JsonResulObjectDTO from "shared/DTOs/JsonResulObjectDTO";
import KromLandDTO from "shared/DTOs/KromLandDTO";
import Repository from "shared/infrastructure/repositiory/Repository";
import { store } from "shared/infrastructure/store/store";

import { mapToWebPartsDTO } from "./save/mapToWebPartsDTO";

export default class KromLandService {
  private _repo = new Repository();

  /**
   * Uložení store
   */
  public async saveStore() {
    const state = store.getState();
    const storeToSave: KromLandDTO = {
      WebParts: mapToWebPartsDTO(state.webParts),
    };

    const response = await this._repo.post<any, JsonResulObjectDTO>({
      url: process.env.REACT_APP_API_URL ?? "",
      params: new URLSearchParams({
        action: "webcontent",
        type: "saveall",
      }),
      data: storeToSave,
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
   * Upload souboru na server
   */
  public async uploadFile(formData: FormData) {
    const response = await this._repo.post<any, JsonResulObjectDataDTO<string>>(
      {
        url: process.env.REACT_APP_API_URL ?? "",
        params: new URLSearchParams({
          action: "file",
          type: "uploadfile",
        }),
        data: formData,
      }
    );

    let result = null;

    if (response.status === HttpStatusCode.Ok) {
      const dataType = typeof response.data;

      if (dataType === "string") {
        AppNotification("Chyba", String(response.data), "danger");
      } else if (dataType === "object") {
        if (response.data?.Success) {
          AppNotification("Úspěch", "Soubor nahrán", "success");
          result = response.data?.Data;
        } else {
          AppNotification("Chyba", response.data?.ErrMsg ?? "", "danger");
        }
      } else {
        AppNotification("Úspěch", "Soubor nahrán", "success");
        result = response.data?.Data;
      }
    } else {
      AppNotification("Chyba", "Chyba při nahrávání souboru", "danger");
    }

    return result;
  }
}
