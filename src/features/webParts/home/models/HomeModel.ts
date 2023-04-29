import ImageModel from "shared/models/ImageModel";

import TeamMemberModel from "./TeamMemberModel";

export default class HomeModel {
  Title: string = "";
  Description: string = "";
  PageHeaderTextMain: string = "";
  PageHeaderTextMainColor: string = "";
  PageHeaderTextSecondary: string = "";
  PageHeaderTextSecondaryColor: string = "";
  MainImage: ImageModel = new ImageModel();
  AboutUs: string = "";
  AboutUsImage: ImageModel = new ImageModel();
  PeopleSay1Text: string = "";
  PeopleSay1Name: string = "";
  PeopleSay2Text: string = "";
  PeopleSay2Name: string = "";
  PeopleSay3Text: string = "";
  PeopleSay3Name: string = "";
  TeamMembers: TeamMemberModel[] = [];
  _dataLoaded: boolean = false;

  public constructor(init?: Partial<HomeModel>) {
    Object.assign(this, init);
  }
}
