export default class SelectDataModel {
  Id: number = 0;
  Key: string = "";
  Name: string = "";

  public constructor(init?: Partial<SelectDataModel>) {
    Object.assign(this, init);
  }
}
