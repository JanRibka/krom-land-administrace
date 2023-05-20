export default class TableOfKeysModel {
  Id: number = 0;
  GroupKey: string = "";
  Key: string = "";
  Name: string = "";
  Enabled: boolean = false;

  public constructor(init?: Partial<TableOfKeysModel>) {
    Object.assign(this, init);
  }
}
