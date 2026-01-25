import { HomeOldApiDTO } from "shared/DTOs/HomeOldApiDTO";
import { TeamMemberOldApiDTO } from "shared/DTOs/TeamMemberOldApiDTO";
import ImageModel from "shared/models/ImageModel";

import HomeModel from "../models/HomeModel";

export const mapToHomeDTO = (home: HomeModel) => {
  const result: HomeOldApiDTO = {
    Id: home.Id,
    Title: home.Title,
    Description: home.Description,
    PageHeaderTextMain: home.PageHeaderTextMain,
    PageHeaderTextMainColor: home.PageHeaderTextMainColor,
    PageHeaderTextSecondary: home.PageHeaderTextSecondary,
    PageHeaderTextSecondaryColor: home.PageHeaderTextSecondaryColor,
    MainImage: null,
    AboutUs: home.AboutUs,
    AboutUsImage: null,
    News: home.News,
    NewsImage: home.NewsImage
      ? JSON.stringify(home.NewsImage)
      : JSON.stringify(new ImageModel()),
    PeopleSay1Id: home.PeopleSay1?.idHomeTestimonial ?? null,
    PeopleSay1Text: home.PeopleSay1?.text ?? null,
    PeopleSay1Name: home.PeopleSay1?.name ?? null,
    PeopleSay2Id: home.PeopleSay2?.idHomeTestimonial ?? null,
    PeopleSay2Text: home.PeopleSay2?.text ?? null,
    PeopleSay2Name: home.PeopleSay2?.name ?? null,
    PeopleSay3Id: home.PeopleSay3?.idHomeTestimonial ?? null,
    PeopleSay3Text: home.PeopleSay3?.text ?? null,
    PeopleSay3Name: home.PeopleSay3?.name ?? null,
    TeamMembers:
      home.TeamMembers.map(
        (member) =>
          ({
            Id: member.Id,
            Image: member.Image
              ? JSON.stringify(member.Image)
              : JSON.stringify(new ImageModel()),
            Name: member.Name ?? "",
            Description: member.Description ?? "",
            Delete: member.Delete ?? false,
          }) as TeamMemberOldApiDTO,
      ) ?? [],
  };

  return result;
};
