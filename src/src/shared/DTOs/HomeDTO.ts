import ImageModel from "shared/models/ImageModel";
import { News } from "shared/models/News";
import { Testimonial } from "shared/models/Testimonial";

import { TeamMemberDTO } from "./TeamMemberDTO";

export interface HomeDTO {
  idHome: number;
  title: string | null;
  description: string | null;
  pageHeaderTextMain: string | null;
  pageHeaderTextMainColor: string | null;
  pageHeaderTextSecondary: string | null;
  pageHeaderTextSecondaryColor: string | null;
  mainImage: ImageModel | null;
  aboutUs: string | null;
  aboutUsImage: ImageModel | null;
  news: News[] | null;
  newsImage: ImageModel | null;
  teamMembers: TeamMemberDTO[] | null;
  testimonials: Testimonial[] | null;
}
