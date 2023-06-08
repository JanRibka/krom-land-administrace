import SelectDataModel from "shared/models/SelectDataModel";

import RegistrationDTO from "./RegistrationDTO";

export default class RegistrationEditDTO {
  Registration: RegistrationDTO = new RegistrationDTO();
  SelectsData: SelectDataModel = new SelectDataModel();

  public constructor(init?: Partial<RegistrationEditDTO>) {
    Object.assign(this, init);
  }
}
