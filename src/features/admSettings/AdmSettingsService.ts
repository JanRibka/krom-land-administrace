import AppNotification from "shared/components/notification/AppNotification";
import JsonResulObjectDataDTO from "shared/DTOs/JsonResulObjectDataDTO";
import JsonResulObjectDTO from "shared/DTOs/JsonResulObjectDTO";
import Repository from "shared/infrastructure/repositiory/Repository";
import { store } from "shared/infrastructure/store/store";

import UserModel from "./models/UserModel";

export default class AdmSettingsService {
  private _repo = new Repository();

  /**
   * Delete user
   * @param userId
   * @returns
   */
  public async userDelete(userId: number) {
    let result = false;
    const _store = store.getState();
    const response = await this._repo.post<any, JsonResulObjectDTO>({
      url: (process.env.REACT_APP_API_URL ?? "") + "AdmSettingsController.php",
      params: new URLSearchParams({
        function: "userDelete",
        id: userId.toString(),
        idLoggedUser: _store.authentication.UserId.toString(),
      }),
    });

    const dataType = typeof response.data;

    if (dataType === "string") {
      AppNotification("Chyba", String(response.data), "danger");
    } else if (dataType === "object") {
      if (response.data?.Success) {
        AppNotification("Úspěch", "Uživatel smazán", "success");
        result = true;
      } else {
        AppNotification("Chyba", response.data?.ErrMsg ?? "", "danger");
      }
    } else {
      AppNotification("Úspěch", "Uživatel smazán", "success");
      result = true;
    }

    return result;
  }

  /**
   * Edit user
   * @param user
   * @returns
   */
  public async userUpdate(user: UserModel) {
    let result = false;
    const _store = store.getState();
    const formData: FormData = new FormData();
    const userEncoded = JSON.stringify(user);

    formData.append("user", userEncoded);

    const response = await this._repo.post<any, JsonResulObjectDTO>({
      url: (process.env.REACT_APP_API_URL ?? "") + "AdmSettingsController.php",
      params: new URLSearchParams({
        function: "userUpdate",
        idLoggedUser: _store.authentication.UserId.toString(),
      }),
      data: formData,
    });

    const dataType = typeof response.data;

    if (dataType === "string") {
      AppNotification("Chyba", String(response.data), "danger");
    } else if (dataType === "object") {
      if (response.data?.Success) {
        AppNotification("Úspěch", "Uživatel uložen", "success");
        result = true;
      } else {
        AppNotification("Chyba", response.data?.ErrMsg ?? "", "danger");
      }
    } else {
      AppNotification("Úspěch", "Uživatel uložena", "success");
      result = true;
    }

    return result;
  }

  /**
   * Change password
   * @param password
   * @returns
   */
  public async passwordChange(password: string) {
    let result = false;
    const _store = store.getState();
    const data = new FormData();

    data.append("password", password);

    const response = await this._repo.post<any, JsonResulObjectDTO>({
      url:
        (process.env.REACT_APP_API_URL ?? "") + "AuthenticationController.php",
      params: new URLSearchParams({
        function: "passwordChange",
        idLoggedUser: _store.authentication.UserId.toString(),
      }),
      data: data,
    });

    const dataType = typeof response.data;

    if (dataType === "string") {
      AppNotification("Chyba", String(response.data), "danger");
    } else if (dataType === "object") {
      if (response.data?.Success) {
        AppNotification("Úspěch", "Heslo změněno", "success");
        result = true;
      } else {
        AppNotification("Chyba", response.data?.ErrMsg ?? "", "danger");
      }
    } else {
      AppNotification("Úspěch", "Heslo změněno", "success");
      result = true;
    }

    return result;
  }

  /**
   * Register user
   */
  public async registerUser(
    userName: string,
    password: string,
    userRole: number
  ) {
    const _store = store.getState();
    let result: JsonResulObjectDataDTO<string> = {
      Success: false,
      ErrMsg: "Chyba při vytváření uživatele",
    };
    const data = new FormData();

    data.append("userName", userName);
    data.append("password", password);
    data.append("userRole", userRole.toString());
    data.append("idLoggedUser", _store.authentication.UserId.toString());

    try {
      const response = await this._repo.post<
        any,
        JsonResulObjectDataDTO<string>
      >({
        url:
          (process.env.REACT_APP_API_URL ?? "") +
          "AuthenticationController.php",
        params: new URLSearchParams({
          function: "register",
        }),
        data: data,
      });
      console.log(response);
      if (!!response.data?.Data) result = response.data;
      else if (!response.data?.Success) {
        result = {
          ...result,
          ErrMsg: response?.data?.ErrMsg ?? "Chyba při vytváření uživatele",
        };
      }
    } catch (err: any) {
      if (err.response?.data?.Success === false) {
        result = {
          ...result,
          ErrMsg: err.response?.data?.ErrMsg,
        };
      }
    }

    return result;
  }
}
