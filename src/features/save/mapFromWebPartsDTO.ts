import ActionDetailModel from "features/actions/models/ActionDetailModel";
import DocumentToDownloadModel from "features/actions/models/DocumentToDownloadModel";
import GalleryImageModel from "features/gallery/models/GalleryImageModel";
import TeamMemberModel from "features/home/models/TeamMemberModel";
import WebPartsDTO from "shared/DTOs/WebPartsDTO";
import {
  initialState,
  WebPartsState,
} from "shared/infrastructure/store/webParts/webPartsSlice";
import DocumentModel from "shared/models/DocumentModel";
import ImageModel from "shared/models/ImageModel";

export const mapFromWebPartsDTO = (webPartsDTO?: WebPartsDTO | null) => {
  const result: WebPartsState = {
    ...initialState,
    Home: {
      Title: webPartsDTO?.Home?.Title ?? "",
      Description: webPartsDTO?.Home?.Description ?? "",
      PageHeaderTextMain: webPartsDTO?.Home.PageHeaderTextMain ?? "",
      PageHeaderTextMainColor: webPartsDTO?.Home.PageHeaderTextMainColor ?? "",
      PageHeaderTextSecondary: webPartsDTO?.Home.PageHeaderTextSecondary ?? "",
      PageHeaderTextSecondaryColor:
        webPartsDTO?.Home.PageHeaderTextSecondaryColor ?? "",
      MainImage: !!webPartsDTO?.Home?.MainImage
        ? JSON.parse(webPartsDTO?.Home?.MainImage)
        : new ImageModel(),
      AboutUs: webPartsDTO?.Home?.AboutUs ?? "",
      AboutUsImage: !!webPartsDTO?.Home?.AboutUsImage
        ? JSON.parse(webPartsDTO?.Home?.AboutUsImage)
        : new ImageModel(),
      PeopleSay1Text: webPartsDTO?.Home?.PeopleSay1Text ?? "",
      PeopleSay1Name: webPartsDTO?.Home?.PeopleSay1Name ?? "",
      PeopleSay2Text: webPartsDTO?.Home?.PeopleSay2Text ?? "",
      PeopleSay2Name: webPartsDTO?.Home?.PeopleSay2Name ?? "",
      PeopleSay3Text: webPartsDTO?.Home?.PeopleSay3Text ?? "",
      PeopleSay3Name: webPartsDTO?.Home?.PeopleSay3Name ?? "",
      TeamMembers:
        webPartsDTO?.Home?.TeamMembers?.map(
          (member) =>
            new TeamMemberModel({
              Id: member.Id ?? 0,
              Image: !!member.Image
                ? JSON.parse(member.Image)
                : new ImageModel(),
              Name: member.Name ?? "",
              Text: member.Text ?? "",
              Delete: false,
            })
        ) ?? [],
    },
    Actions: {
      Title: webPartsDTO?.Actions.Title ?? "",
      Description: webPartsDTO?.Actions.Description ?? "",
      PageHeaderTextMain: webPartsDTO?.Actions.PageHeaderTextMain ?? "",
      PageHeaderTextMainColor:
        webPartsDTO?.Actions.PageHeaderTextMainColor ?? "",
      MainImage: !!webPartsDTO?.Actions?.MainImage
        ? JSON.parse(webPartsDTO?.Actions?.MainImage)
        : new ImageModel(),
      ActionDetails:
        webPartsDTO?.Actions.ActionDetails.map(
          (item) =>
            new ActionDetailModel({
              Id: item.Id ?? 0,
              ActionOrder: item.ActionOrder ?? 0,
              MonthName: item.MonthName ?? "",
              Image: !!item?.Image ? JSON.parse(item.Image) : new ImageModel(),
              ActionName: item.ActionName ?? "",
              ActionDescritption: item.ActionDescritption ?? "",
              VideoLink: item.VideoLink ?? "",
              Price: item.Price ?? "",
              IsPriceRemark: item.IsPriceRemark === "1",
              PriceRemark: item.PriceRemark ?? "",
              Place: item.Place ?? "",
              Date: item.Date ?? "",
            })
        ) ?? [],
      DocumentsToDownload:
        webPartsDTO?.Actions.DocumentsToDownload.map(
          (item) =>
            new DocumentToDownloadModel({
              Id: item.Id ?? 0,
              Document: !!item.Document
                ? JSON.parse(item.Document)
                : new DocumentModel(),
              Delete: item.Delete ?? false,
            })
        ) ?? [],
    },
    Gallery: {
      Title: webPartsDTO?.Gallery.Title ?? "",
      Description: webPartsDTO?.Gallery.Description ?? "",
      PageHeaderTextMain: webPartsDTO?.Gallery.PageHeaderTextMain ?? "",
      PageHeaderTextMainColor:
        webPartsDTO?.Gallery.PageHeaderTextMainColor ?? "",
      MainImage: !!webPartsDTO?.Gallery?.MainImage
        ? JSON.parse(webPartsDTO?.Gallery?.MainImage)
        : new ImageModel(),
      Images:
        webPartsDTO?.Gallery.Images.map(
          (item) =>
            new GalleryImageModel({
              Id: item?.Id ?? 0,
              Image: !!item?.Image
                ? JSON.parse(item.Image)
                : new GalleryImageModel(),
              Delete: item?.Delete ?? false,
            })
        ) ?? [],
    },
    Contact: {
      Title: webPartsDTO?.Contact.Title ?? "",
      Description: webPartsDTO?.Contact.Description ?? "",
      PageHeaderTextMain: webPartsDTO?.Contact.PageHeaderTextMain ?? "",
      PageHeaderTextMainColor:
        webPartsDTO?.Contact.PageHeaderTextMainColor ?? "",
      MainImage: !!webPartsDTO?.Contact?.MainImage
        ? JSON.parse(webPartsDTO?.Contact?.MainImage)
        : new ImageModel(),
      GoogleMapsUrl: webPartsDTO?.Contact.GoogleMapsUrl ?? "",
      Email: webPartsDTO?.Contact.Email ?? "",
    },
  };

  return result;
};
