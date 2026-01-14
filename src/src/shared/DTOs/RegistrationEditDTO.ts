import RegistrationDataModel from "shared/models/RegistrationDataModel";

import RegistrationDTO from "./RegistrationDTO";

export default class RegistrationEditDTO {
  Registration: RegistrationDTO = new RegistrationDTO();
  SelectsData: RegistrationDataModel = new RegistrationDataModel();

  public constructor(init?: Partial<RegistrationEditDTO>) {
    Object.assign(this, init);
  }
}
