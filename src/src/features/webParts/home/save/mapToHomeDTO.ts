import HomeDTO from 'shared/DTOs/HomeDTO';
import TeamMemberDTO from 'shared/DTOs/TeamMemberDTO';

import HomeModel from '../models/HomeModel';

export const mapToHomeDTO = (home: HomeModel) => {
  const result: HomeDTO = {
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
    PeopleSay1Text: home.PeopleSay1Text,
    PeopleSay1Name: home.PeopleSay1Name,
    PeopleSay2Text: home.PeopleSay2Text,
    PeopleSay2Name: home.PeopleSay2Name,
    PeopleSay3Text: home.PeopleSay3Text,
    PeopleSay3Name: home.PeopleSay3Name,
    TeamMembers: home.TeamMembers.map(
      (member) =>
        new TeamMemberDTO({
          Id: member.Id,
          Image: JSON.stringify(member.Image),
          Name: member.Name,
          Description: member.Description,
          Delete: member.Delete,
        })
    ),
  };

  return result;
};
