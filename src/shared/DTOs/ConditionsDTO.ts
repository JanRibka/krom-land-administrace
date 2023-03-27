export default class ConditionsDTO {
  Id: number | null = null;
  GdprLabel: string | null = null;
  GdprText: string | null = null;
  TermsOfConditionsLabel: string | null = null;
  TermsOfConditionsText: string | null = null;

  public constructor(init?: Partial<ConditionsDTO>) {
    Object.assign(this, init);
  }
}
