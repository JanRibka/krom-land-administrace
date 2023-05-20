import TableOfKeysModel from "./TableOfKeysModel";

class SelectDataModel {
  ChildArrivesData: TableOfKeysModel[] = [];
  PaymentMethodsData: TableOfKeysModel[] = [];
  RegistrationStateData: TableOfKeysModel[] = [];

  public constructor(init?: Partial<SelectDataModel>) {
    Object.assign(this, init);
  }
}

export default SelectDataModel;
