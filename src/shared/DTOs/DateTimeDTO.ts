export default class DateTimeDTO {
  date: string | null = null;
  timezone_type: number | null = null;
  timezone: string | null = null;

  public constructor(init?: Partial<DateTimeDTO>) {
    Object.assign(this, init);
  }
}
