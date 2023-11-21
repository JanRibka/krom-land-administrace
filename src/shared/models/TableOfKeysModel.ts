export default class TableOfKeysModel {
  Id: number | null = null;
  GroupKey: string = "";
  Key: string = "";
  Value: number = 0;
  Name: string = "";
  Enabled: boolean = false;

  public constructor(init?: Partial<TableOfKeysModel>) {
    Object.assign(this, init);
  }
}
