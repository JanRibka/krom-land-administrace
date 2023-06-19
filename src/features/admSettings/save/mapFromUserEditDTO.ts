import UserEditDTO from "shared/DTOs/UserEditDTO";

import UserEditModel from "../models/UserEditModel";
import UserModel from "../models/UserModel";

export const mapFromUserEditDTO = (userEditDTO?: UserEditDTO | null) => {
  const result: UserEditModel = {
    User: {
      Id: userEditDTO?.User.Id,
      IdParent: userEditDTO?.User.IdParent,
      UserName: userEditDTO?.User.UserName,
      Password: userEditDTO?.User.Password,
      DateCreated: new Date(userEditDTO?.User.DateCreated?.date ?? ""),
      LastLogin: new Date(userEditDTO?.User.LastLogin?.date ?? ""),
      LastLoginAttempt: new Date(
        userEditDTO?.User.LastLoginAttempt?.date ?? ""
      ),
      LoginCount: userEditDTO?.User.LoginCount,
      LoginAttemptCount: userEditDTO?.User.LoginAttemptCount,
      RefreshToken: userEditDTO?.User.RefreshToken,
      UserRoleValue: userEditDTO?.User.UserRoleValue,
      UserRoleName: userEditDTO?.User.UserRoleName,
    } as UserModel,
  };
  return result;
};
