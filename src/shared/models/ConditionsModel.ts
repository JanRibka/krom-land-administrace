export default class ConditionsModel {
  GdprLabel: string = "";
  GdprText: string = "";
  TermOfConditionsLabel: string = "";
  TermOfConditionsText: string = "";

  public constructor(init?: Partial<ConditionsModel>) {
    Object.assign(this, init);
  }
}
