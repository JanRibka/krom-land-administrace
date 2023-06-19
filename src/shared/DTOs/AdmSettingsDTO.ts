import DropDownsDataModel from "features/admSettings/models/DropDownsDataModel";

export default class AdmSettingsDTO {
  DropDownsData: DropDownsDataModel | null = null;

  public constructor(init?: Partial<AdmSettingsDTO>) {
    Object.assign(this, init);
  }
}
