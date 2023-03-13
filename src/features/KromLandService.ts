import { HttpStatusCode } from "axios";
import AppNotification from "shared/components/notification/AppNotification";
import JsonResulObjectDTO from "shared/DTOs/JsonResulObjectDTO";
import Repository from "shared/infrastructure/repositiory/Repository";
import { store } from "shared/infrastructure/store/store";

export default class KromLandService {
  private _repo = new Repository();

  public async saveStore() {
    const state = store.getState();

    // const formData = new FormData();

    // Object.keys(data).forEach((key) => {
    //   formData.append(key, (data as any)[key].toString());
    // });

    const response = await this._repo.post<any, JsonResulObjectDTO>({
      url: process.env.REACT_APP_API_URL ?? "",
      params: new URLSearchParams({
        action: "email",
        type: "send",
      }),
      //   data: formData,
    });

    if (response.status === HttpStatusCode.Ok) {
      const dataType = typeof response.data;

      if (dataType === "string") {
        AppNotification("Chyba", String(response.data), "danger");
      } else if (dataType === "object") {
        if (response.data?.Success) {
          AppNotification("Úspěch", "Data uložena", "success");
        } else {
          AppNotification("Chyba", response.data?.ErrMsg ?? "", "danger");
        }
      } else {
        AppNotification("Úspěch", "Data uložena", "success");
      }
    } else {
      AppNotification("Chyba", "Chyba při ukládání dat", "danger");
    }
  }
}
