import { HomeDTO } from "shared/DTOs/HomeDTO";
import ImageModel from "shared/models/ImageModel";

import HomeModel from "../models/HomeModel";
import TeamMemberModel from "../models/TeamMemberModel";

export const mapFromHomeDTO = (homeDTO?: HomeDTO | null) => {
  const result: HomeModel = {
    Id: homeDTO?.idHome ?? 0,
    Title: homeDTO?.title ?? "",
    Description: homeDTO?.description ?? "",
    PageHeaderTextMain: homeDTO?.pageHeaderTextMain ?? "",
    PageHeaderTextMainColor: homeDTO?.pageHeaderTextMainColor ?? "",
    PageHeaderTextSecondary: homeDTO?.pageHeaderTextSecondary ?? "",
    PageHeaderTextSecondaryColor: homeDTO?.pageHeaderTextSecondaryColor ?? "",
    MainImage: !!homeDTO?.mainImage
      ? homeDTO?.mainImage
      : ({ path: "", name: "", alt: "" } as ImageModel),
    AboutUs: homeDTO?.aboutUs ?? "",
    AboutUsImage: !!homeDTO?.aboutUsImage
      ? homeDTO?.aboutUsImage
      : ({ path: "", name: "", alt: "" } as ImageModel),
    PeopleSay1: homeDTO?.testimonials?.find((f) => f.order === 1) ?? null,
    PeopleSay2: homeDTO?.testimonials?.find((f) => f.order === 2) ?? null,
    PeopleSay3: homeDTO?.testimonials?.find((f) => f.order === 3) ?? null,
    TeamMembers:
      homeDTO?.teamMembers?.map(
        (member) =>
          ({
            Id: member.idHomeTeamMembers ?? 0,
            Image: !!member.image
              ? member.image
              : ({ path: "", name: "", alt: "" } as ImageModel),
            Name: member.name ?? "",
            Description: member.description ?? "",
            Delete: false,
          }) as TeamMemberModel,
      ) ?? [],

    _dataLoaded: true,
  };

  return result;
};
