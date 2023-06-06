import DateTimeDTO from "./DateTimeDTO";

export default class UserDTO {
  Id: number | null = null;
  IdParent: number | null = null;
  UserName: string | null = null;
  Password: string | null = null;
  DateCreated: DateTimeDTO | null = null;
  LastLogin: DateTimeDTO | null = null;
  LastLoginAttempt: DateTimeDTO | null = null;
  LoginCount: number = 0;
  LoginAttemptCount: number = 0;
  RefreshToken: string | null = null;
  UserRoleValue: number = 0;
  UserRoleName: string = "";

  public constructor(init?: Partial<UserDTO>) {
    Object.assign(this, init);
  }
}
