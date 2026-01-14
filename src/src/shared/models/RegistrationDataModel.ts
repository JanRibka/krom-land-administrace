import SelectDataModel from "./SelectDataModel";
import TableOfKeysModel from "./TableOfKeysModel";

class RegistrationDataModel {
  ChildArrivesData: TableOfKeysModel[] = [];
  PaymentMethodsData: TableOfKeysModel[] = [];
  RegistrationStateData: TableOfKeysModel[] = [];
  TShirtSizes: SelectDataModel[] = [];

  public constructor(init?: Partial<RegistrationDataModel>) {
    Object.assign(this, init);
  }
}

export default RegistrationDataModel;
