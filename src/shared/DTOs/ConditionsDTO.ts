export default class ConditionsDTO {
  Id: number | null = null;
  Label: string | null = null;
  Text: string | null = null;

  public constructor(init?: Partial<ConditionsDTO>) {
    Object.assign(this, init);
  }
}
