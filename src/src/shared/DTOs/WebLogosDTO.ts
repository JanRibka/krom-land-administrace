export default class WebLogosDTO {
  Id: number | null = null;
  HeaderLogo: string | null = null;

  public constructor(init?: Partial<WebLogosDTO>) {
    Object.assign(this, init);
  }
}
