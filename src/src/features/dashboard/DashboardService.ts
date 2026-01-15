import AppNotification from "shared/components/notification/AppNotification";
import JsonResulObjectDTO from "shared/DTOs/JsonResulObjectDTO";
import Repository from "shared/infrastructure/repositiory/Repository";

import RegistrationModel from "./models/RegistrationModel";

export default class DashBoardService {
  private _repo = new Repository();

  /**
   * Delete registration
   */
  public async registrationDelete(registrationId: number) {
    let result = false;
    const response = await this._repo.post<any, JsonResulObjectDTO>({
      baseUrl: process.env.REACT_APP_API_BASE_URL,
      url: (process.env.REACT_APP_API_URL ?? "") + "DashboardController.php",
      params: new URLSearchParams({
        function: "registrationDelete",
        id: registrationId.toString(),
      }),
    });

    const dataType = typeof response.data;

    if (dataType === "string") {
      AppNotification("Chyba", String(response.data), "danger");
    } else if (dataType === "object") {
      if (response.data?.Success) {
        AppNotification("Úspěch", "Registrace smazána", "success");
        result = true;
      } else {
        AppNotification("Chyba", response.data?.ErrMsg ?? "", "danger");
      }
    } else {
      AppNotification("Úspěch", "Registrace smazána", "success");
      result = true;
    }

    return result;
  }

  public async registrationUpdate(registration: RegistrationModel) {
    let result = false;
    const formData: FormData = new FormData();
    const registrationEncoded = JSON.stringify(registration);

    formData.append("registration", registrationEncoded);

    const response = await this._repo.post<any, JsonResulObjectDTO>({
      baseUrl: process.env.REACT_APP_API_BASE_URL,
      url: (process.env.REACT_APP_API_URL ?? "") + "DashboardController.php",
      params: new URLSearchParams({
        function: "registrationUpdate",
      }),
      data: formData,
    });

    const dataType = typeof response.data;

    if (dataType === "string") {
      AppNotification("Chyba", String(response.data), "danger");
    } else if (dataType === "object") {
      if (response.data?.Success) {
        AppNotification("Úspěch", "Registrace uložena", "success");
        result = true;
      } else {
        AppNotification("Chyba", response.data?.ErrMsg ?? "", "danger");
      }
    } else {
      AppNotification("Úspěch", "Registrace uložena", "success");
      result = true;
    }

    return result;
  }
}
