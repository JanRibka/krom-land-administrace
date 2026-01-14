import JsonResulObjectDataDTO from "shared/DTOs/JsonResulObjectDataDTO";
import Repository from "shared/infrastructure/repositiory/Repository";

import LoginResultModel from "./models/LoginResultModel";

export default class LoginService {
  private _repo = new Repository();

  /**
   * Login
   */
  public async login(userName: string, password: string) {
    let result: JsonResulObjectDataDTO<LoginResultModel> = {
      Success: false,
      ErrMsg: "Chyba při přihlašování",
    };
    const data = new FormData();

    data.append("userName", userName);
    data.append("password", password);

    try {
      const response = await this._repo.post<
        any,
        JsonResulObjectDataDTO<LoginResultModel>
      >({
        baseUrl: process.env.REACT_APP_API_BASE_URL ?? "",
        url:
          (process.env.REACT_APP_API_URL ?? "") +
          "AuthenticationController.php",
        params: new URLSearchParams({
          function: "login",
        }),
        data: data,
      });

      if (!!response.data?.Data) result = response.data;
      else if (!response.data?.Success) {
        result = {
          ...result,
          ErrMsg: response?.data?.ErrMsg ?? "Chyba při přihlašování",
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
