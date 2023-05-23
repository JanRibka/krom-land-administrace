export default class WebSettingsModel {
  Id: number = 0;
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
  _dataLoaded: boolean = false;

  public constructor(init?: Partial<WebSettingsModel>) {
    Object.assign(this, init);
  }
}
