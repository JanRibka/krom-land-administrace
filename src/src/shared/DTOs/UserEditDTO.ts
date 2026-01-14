import DropDownsDataModel from "features/admSettings/models/DropDownsDataModel";

import UserDTO from "./UserDTO";

export default class UserEditDTO {
  User: UserDTO = new UserDTO();
  DropDownsData: DropDownsDataModel = new DropDownsDataModel();

  public constructor(init?: Partial<UserEditDTO>) {
    Object.assign(this, init);
  }
}
