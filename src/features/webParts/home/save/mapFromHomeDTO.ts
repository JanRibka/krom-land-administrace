import HomeDTO from "shared/DTOs/HomeDTO";
import ImageModel from "shared/models/ImageModel";

import HomeModel from "../models/HomeModel";
import TeamMemberModel from "../models/TeamMemberModel";

export const mapFromHomeDTO = (homeDTO?: HomeDTO | null) => {
  const result: HomeModel = {
    Id: homeDTO?.Id ?? 0,
    Title: homeDTO?.Title ?? "",
    Description: homeDTO?.Description ?? "",
    PageHeaderTextMain: homeDTO?.PageHeaderTextMain ?? "",
    PageHeaderTextMainColor: homeDTO?.PageHeaderTextMainColor ?? "",
    PageHeaderTextSecondary: homeDTO?.PageHeaderTextSecondary ?? "",
    PageHeaderTextSecondaryColor: homeDTO?.PageHeaderTextSecondaryColor ?? "",
    MainImage: !!homeDTO?.MainImage
      ? JSON.parse(homeDTO?.MainImage)
      : new ImageModel(),
    AboutUs: homeDTO?.AboutUs ?? "",
    AboutUsImage: !!homeDTO?.AboutUsImage
      ? JSON.parse(homeDTO?.AboutUsImage)
      : new ImageModel(),
    PeopleSay1Text: homeDTO?.PeopleSay1Text ?? "",
    PeopleSay1Name: homeDTO?.PeopleSay1Name ?? "",
    PeopleSay2Text: homeDTO?.PeopleSay2Text ?? "",
    PeopleSay2Name: homeDTO?.PeopleSay2Name ?? "",
    PeopleSay3Text: homeDTO?.PeopleSay3Text ?? "",
    PeopleSay3Name: homeDTO?.PeopleSay3Name ?? "",
    TeamMembers:
      homeDTO?.TeamMembers?.map(
        (member) =>
          new TeamMemberModel({
            Id: member.Id ?? 0,
            Image: !!member.Image ? JSON.parse(member.Image) : new ImageModel(),
            Name: member.Name ?? "",
            Description: member.Description ?? "",
            Delete: false,
          })
      ) ?? [],
    _dataLoaded: true,
  };

  return result;
};
