import ActionDetailDTO from "shared/DTOs/ActionDetailDTO";
import DocumentDTO from "shared/DTOs/DocumentDTO";
import TeamMemberDTO from "shared/DTOs/TeamMemberDTO";
import WebPartsDTO from "shared/DTOs/WebPartsDTO";
import { WebPartsState } from "shared/infrastructure/store/webParts/webPartsSlice";

export const mapToWebPartsDTO = (webPartsState: WebPartsState) => {
  const result: WebPartsDTO = {
    Home: {
      Id: null,
      Title: webPartsState.Home.Title,
      Description: webPartsState.Home.Description,
      PageHeaderTextMain: webPartsState.Home.PageHeaderTextMain,
      PageHeaderTextMainColor: webPartsState.Home.PageHeaderTextMainColor,
      PageHeaderTextSecondary: webPartsState.Home.PageHeaderTextSecondary,
      PageHeaderTextSecondaryColor:
        webPartsState.Home.PageHeaderTextSecondaryColor,
      MainImage: null,
      AboutUs: webPartsState.Home.AboutUs,
      AboutUsImage: null,
      PeopleSay1Text: webPartsState.Home.PeopleSay1Text,
      PeopleSay1Name: webPartsState.Home.PeopleSay1Name,
      PeopleSay2Text: webPartsState.Home.PeopleSay2Text,
      PeopleSay2Name: webPartsState.Home.PeopleSay2Name,
      PeopleSay3Text: webPartsState.Home.PeopleSay3Text,
      PeopleSay3Name: webPartsState.Home.PeopleSay3Name,
      TeamMembers: webPartsState.Home.TeamMembers.map(
        (member) =>
          new TeamMemberDTO({
            Image: JSON.stringify(member.Image),
            Name: member.Name,
            Text: member.Text,
          })
      ),
    },
    Actions: {
      Id: null,
      Title: webPartsState.Actions.Title,
      Description: webPartsState.Actions.Description,
      PageHeaderTextMain: webPartsState.Actions.PageHeaderTextMain,
      PageHeaderTextMainColor: webPartsState.Actions.PageHeaderTextMainColor,
      MainImagePath: webPartsState.Actions.MainImagePath,
      MainImageAlt: webPartsState.Actions.MainImageAlt,
      ActionDetails: webPartsState.Actions.ActionDetails.map(
        (item) =>
          new ActionDetailDTO({
            Id: item.Id,
            ActionOrder: item.ActionOrder,
            MonthName: item.MonthName,
            ActionImagePath: item.ActionImagePath,
            ActionImageAlt: item.ActionImageAlt,
            ActionName: item.ActionName,
            ActionDescritption: item.ActionDescritption,
            VideoLink: item.VideoLink,
            Price: item.Price,
            Place: item.Place,
            Date: item.Date,
          })
      ),
      DocumentsToDownload: webPartsState.Actions.DocumentsToDownload.map(
        (item) =>
          new DocumentDTO({
            Id: null,
            DocumentPath: item.Path,
            DocumentName: item.Name,
          })
      ),
    },
    Gallery: {
      Id: null,
      Title: webPartsState.Gallery.Title,
      Description: webPartsState.Gallery.Description,
      PageHeaderTextMain: webPartsState.Gallery.PageHeaderTextMain,
      PageHeaderTextMainColor: webPartsState.Gallery.PageHeaderTextMainColor,
      MainImagePath: webPartsState.Gallery.MainImagePath,
      MainImageAlt: webPartsState.Gallery.MainImageAlt,
      Images: [],
      // webPartsState.Gallery.Images.map(
      //   (item) =>
      //     new ImageDTO({ Id: null, ImagePath: item.Path, ImageAlt: item.Alt })
      // ) ?? [],
    },
    Contact: {
      Id: null,
      Title: webPartsState.Contact.Title,
      Description: webPartsState.Contact.Description,
      PageHeaderTextMain: webPartsState.Contact.PageHeaderTextMain,
      PageHeaderTextMainColor: webPartsState.Contact.PageHeaderTextMainColor,
      MainImagePath: webPartsState.Contact.MainImagePath,
      MainImageAlt: webPartsState.Contact.MainImageAlt,
      GoogleMapsUrl: webPartsState.Contact.GoogleMapsUrl,
    },
  };

  return result;
};
