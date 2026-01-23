import { News } from "shared/models/News";

import { TeamMemberOldApiDTO } from "./TeamMemberOldApiDTO";

export interface HomeOldApiDTO {
  Id: number | null;
  Title: string | null;
  Description: string | null;
  PageHeaderTextMain: string | null;
  PageHeaderTextMainColor: string | null;
  PageHeaderTextSecondary: string | null;
  PageHeaderTextSecondaryColor: string | null;
  MainImage: string | null;
  AboutUs: string | null;
  AboutUsImage: string | null;
  news: News[] | null;
  newsImage: string | null;
  PeopleSay1Id: number | null;
  PeopleSay1Text: string | null;
  PeopleSay1Name: string | null;
  PeopleSay2Id: number | null;
  PeopleSay2Text: string | null;
  PeopleSay2Name: string | null;
  PeopleSay3Id: number | null;
  PeopleSay3Text: string | null;
  PeopleSay3Name: string | null;
  TeamMembers: TeamMemberOldApiDTO[] | null;
}
