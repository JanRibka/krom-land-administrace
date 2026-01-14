import TableOfKeysModel from "shared/models/TableOfKeysModel";

class DropDownsDataModel {
  RoleListData: TableOfKeysModel[] = [];

  public constructor(init?: Partial<DropDownsDataModel>) {
    Object.assign(this, init);
  }
}

export default DropDownsDataModel;
