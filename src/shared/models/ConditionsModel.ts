export default class ConditionsModel {
  GdprLabel: string = "";
  GdprText: string = "";
  TermsOfConditionsLabel: string = "";
  TermsOfConditionsText: string = "";
  _gdprLoaded: boolean = false;
  _conditionsLoaded: boolean = false;

  public constructor(init?: Partial<ConditionsModel>) {
    Object.assign(this, init);
  }
}
