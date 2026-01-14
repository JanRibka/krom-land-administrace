import TableOfKeysModel from "shared/models/TableOfKeysModel";

export default class AdmSettingsDTO {
  DropDownsData: TableOfKeysModel[] | null = null;

  public constructor(init?: Partial<AdmSettingsDTO>) {
    Object.assign(this, init);
  }
}
