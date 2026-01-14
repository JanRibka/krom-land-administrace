import UserDTO from "shared/DTOs/UserDTO";
import { AdmSettingsState } from "shared/infrastructure/store/admSettings/admSettingsSlice";

import UserModel from "../models/UserModel";

export const mapFromUsersDTO = (usersDTO?: UserDTO[] | null) => {
  const result: Partial<AdmSettingsState> = {
    Users:
      usersDTO?.map((item) => {
        return {
          Id: item.Id ?? 0,
          IdParent: item.IdParent,
          UserName: item.UserName ?? "",
          Password: item.Password,
          DateCreated: new Date(item.DateCreated?.date ?? ""),
          LastLogin: new Date(item.LastLogin?.date ?? ""),
          LastLoginAttempt: new Date(item.LastLoginAttempt?.date ?? ""),
          LoginCount: item.LoginCount,
          LoginAttemptCount: item.LoginAttemptCount,
          RefreshToken: item.RefreshToken,
          UserRoleValue: item.UserRoleValue,
          UserRoleName: item.UserRoleName,
        } as UserModel;
      }) ?? [],
    _usersLoaded: true,
  };

  return result;
};
