export default class UserModel {
  Id: number = 0;
  IdParent: number | null = null;
  UserName: string = "";
  Password: string | null = null;
  DateCreated: Date = new Date();
  LastLogin: Date | null = null;
  LastLoginAttempt: Date | null = null;
  LoginCount: number = 0;
  LoginAttemptCount: number = 0;
  RefreshToken: string | null = null;
  UserRoleValue: number = 0;
  UserRoleName: string = "";

  public constructor(init?: Partial<UserModel>) {
    Object.assign(this, init);
  }
}
