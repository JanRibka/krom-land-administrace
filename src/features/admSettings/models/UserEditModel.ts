import UserModel from "./UserModel";

class UserEditModel {
  User: UserModel = new UserModel();

  public constructor(init?: Partial<UserEditModel>) {
    Object.assign(this, init);
  }
}

export default UserEditModel;
