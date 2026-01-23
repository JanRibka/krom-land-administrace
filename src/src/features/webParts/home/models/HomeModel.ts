import ImageModel from "shared/models/ImageModel";
import { News } from "shared/models/News";
import { Testimonial } from "shared/models/Testimonial";

import TeamMemberModel from "./TeamMemberModel";

export default class HomeModel {
  Id: number = 0;
  Title: string = "";
  Description: string = "";
  PageHeaderTextMain: string = "";
  PageHeaderTextMainColor: string = "";
  PageHeaderTextSecondary: string = "";
  PageHeaderTextSecondaryColor: string = "";
  MainImage: ImageModel = new ImageModel();
  AboutUs: string = "";
  AboutUsImage: ImageModel = new ImageModel();
  news: News[] | null = null;
  newsImage: ImageModel = new ImageModel();
  PeopleSay1: Testimonial | null = null;
  PeopleSay2: Testimonial | null = null;
  PeopleSay3: Testimonial | null = null;
  TeamMembers: TeamMemberModel[] = [];
  _dataLoaded: boolean = false;

  public constructor(init?: Partial<HomeModel>) {
    Object.assign(this, init);
  }
}
