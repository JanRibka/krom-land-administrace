import DropDownsDataModel from "./DropDownsDataModel";
import UserModel from "./UserModel";

class UserEditModel {
  User: UserModel = new UserModel();
  DropDownsData: DropDownsDataModel = new DropDownsDataModel();

  public constructor(init?: Partial<UserEditModel>) {
    Object.assign(this, init);
  }
}

export default UserEditModel;
