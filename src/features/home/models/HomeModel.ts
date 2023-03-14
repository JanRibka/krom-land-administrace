export default class HomeModel {
  Title: string = "";
  Description: string = "";
  PageHeaderTextMain: string = "";
  PageHeaderTextMainColor: string = "";
  PageHeaderTextSecondary: string = "";
  PageHeaderTextSecondaryColor: string = "";
  MainImagePath: string = "";
  MainImageAlt: string = "";
  AboutUs: string = "";
  AboutUsImagePath: string = "";
  AboutUsImageAlt: string = "";
  PeopleSay1Text: string = "";
  PeopleSay1Name: string = "";
  PeopleSay2Text: string = "";
  PeopleSay2Name: string = "";
  PeopleSay3Text: string = "";
  PeopleSay3Name: string = "";

  public constructor(init?: Partial<HomeModel>) {
    Object.assign(this, init);
  }
}
