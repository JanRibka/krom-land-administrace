import SelectDataModel from "shared/models/RegistrationDataModel";

import RegistrationModel from "./RegistrationModel";

class RegistrationEditModel {
  Registration: RegistrationModel = new RegistrationModel();
  SelectsData: SelectDataModel = new SelectDataModel();

  public constructor(init?: Partial<RegistrationEditModel>) {
    Object.assign(this, init);
  }
}

export default RegistrationEditModel;
