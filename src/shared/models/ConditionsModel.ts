export default class ConditionsModel {
  GdprLabel: string = "";
  GdprText: string = "";
  TermsOfConditionsLabel: string = "";
  TermsOfConditionsText: string = "";

  public constructor(init?: Partial<ConditionsModel>) {
    Object.assign(this, init);
  }
}
