import SelectDataModel from "shared/models/SelectDataModel";

import RegistrationDTO from "./RegistrationDTO";

export default class GalleryDTO {
  Registration: RegistrationDTO = new RegistrationDTO();
  SelectData: SelectDataModel = new SelectDataModel();

  public constructor(init?: Partial<GalleryDTO>) {
    Object.assign(this, init);
  }
}
