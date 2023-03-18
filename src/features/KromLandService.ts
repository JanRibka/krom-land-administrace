import { HttpStatusCode } from "axios";
import AppNotification from "shared/components/notification/AppNotification";
import JsonResulObjectDataDTO from "shared/DTOs/JsonResulObjectDataDTO";
import JsonResulObjectDTO from "shared/DTOs/JsonResulObjectDTO";
import KromLandDTO from "shared/DTOs/KromLandDTO";
import Repository from "shared/infrastructure/repositiory/Repository";
import { store } from "shared/infrastructure/store/store";
import ImageModel from "shared/models/ImageModel";

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
   * @param formData
   */
  public async uploadFile(formData: FormData) {
    const response = await this._repo.post<any, JsonResulObjectDataDTO<string>>(
      {
        url: process.env.REACT_APP_API_URL ?? "",
        params: new URLSearchParams({
          action: "image",
          type: "uploadimage",
        }),
        data: formData,
      }
    );

    if (response.status === HttpStatusCode.Ok) {
      const dataType = typeof response.data;

      if (dataType === "string") {
        AppNotification("Chyba", String(response.data), "danger");
      } else if (dataType === "object") {
        if (response.data?.Success) {
          AppNotification("Úspěch", "Obrázek nahrán", "success");
        } else {
          AppNotification("Chyba", response.data?.ErrMsg ?? "", "danger");
        }
      } else {
        AppNotification("Úspěch", "Obrázek nahrán", "success");
      }
    } else {
      AppNotification("Chyba", "Chyba při nahrávání obrázku", "danger");
    }
  }

  /**
   * Smazání souboru
   * @param imageName
   * @param directory
   */
  public async deleteImage(imageName: string, directory: string) {
    const response = await this._repo.post<any, JsonResulObjectDTO>({
      url: process.env.REACT_APP_API_URL ?? "",
      params: new URLSearchParams({
        action: "image",
        type: "deleteimage",
      }),
      data: {
        imageName: imageName,
        directory: directory,
      },
    });

    if (response.status === HttpStatusCode.Ok) {
      const dataType = typeof response.data;

      if (dataType === "string") {
        AppNotification("Chyba", String(response.data), "danger");
      } else if (dataType === "object") {
        if (response.data?.Success) {
          AppNotification("Úspěch", "Obrázek smazán", "success");
        } else {
          AppNotification("Chyba", response.data?.ErrMsg ?? "", "danger");
        }
      } else {
        AppNotification("Úspěch", "Obrázek smazán", "success");
      }
    } else {
      AppNotification("Chyba", "Chyba při mazání obrázku", "danger");
    }
  }

  /**
   * Uložení obrázku - Home
   * @param image
   */
  public async saveImageHome(image: ImageModel, name: string) {
    const response = await this._repo.post<any, JsonResulObjectDTO>({
      url: process.env.REACT_APP_API_URL ?? "",
      params: new URLSearchParams({
        action: "image",
        type: "saveimagehome",
      }),
      data: {
        image: image,
        name: name,
      },
    });

    let result = false;

    if (response.status === HttpStatusCode.Ok) {
      const dataType = typeof response.data;

      if (dataType === "string") {
        AppNotification("Chyba", String(response.data), "danger");
      } else if (dataType === "object") {
        if (response.data?.Success) {
          result = true;
          AppNotification("Úspěch", "Obrázek uložen", "success");
        } else {
          AppNotification("Chyba", response.data?.ErrMsg ?? "", "danger");
        }
      } else {
        result = true;
        AppNotification("Úspěch", "Obrázek uložen", "success");
      }
    } else {
      AppNotification("Chyba", "Chyba při mazání obrázku", "danger");
    }

    return result;
  }
}
