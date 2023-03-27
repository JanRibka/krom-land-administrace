export default class ConditionsDTO {
  Id: number | null = null;
  GdprLabel: string | null = null;
  GdprText: string | null = null;
  TermOfConditionsLabel: string | null = null;
  TermOfConditionsText: string | null = null;

  public constructor(init?: Partial<ConditionsDTO>) {
    Object.assign(this, init);
  }
}
