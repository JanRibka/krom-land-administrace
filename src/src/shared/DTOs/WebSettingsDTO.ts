export default class WebSettingsDTO {
  Id: number | null = null;
  FacebookLink: string | null = null;
  InstagramLink: string | null = null;
  TikTokLink: string | null = null;
  SubjectName: string | null = null;
  SubjectICO: string | null = null;
  SubjectDIC: string | null = null;
  AddressName: string | null = null;
  AddressAddress: string | null = null;
  AddressLink: string | null = null;
  ContactName: string | null = null;
  ContactHours: string | null = null;
  ContactTel: string | null = null;
  ContactEmail: string | null = null;

  public constructor(init?: Partial<WebSettingsDTO>) {
    Object.assign(this, init);
  }
}
