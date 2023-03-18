export default class HomeDTO {
  Id: number | null = null;
  Title: string | null = null;
  Description: string | null = null;
  PageHeaderTextMain: string | null = null;
  PageHeaderTextMainColor: string | null = null;
  PageHeaderTextSecondary: string | null = null;
  PageHeaderTextSecondaryColor: string | null = null;
  MainImage: string | null = null;
  AboutUs: string | null = null;
  AboutUsImage: string | null = null;
  PeopleSay1Text: string | null = null;
  PeopleSay1Name: string | null = null;
  PeopleSay2Text: string | null = null;
  PeopleSay2Name: string | null = null;
  PeopleSay3Text: string | null = null;
  PeopleSay3Name: string | null = null;

  public constructor(init?: Partial<HomeDTO>) {
    Object.assign(this, init);
  }
}
