export default class ConditionsModel {
  IdGdpr: number = 0;
  IdConditions: number = 0;
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
