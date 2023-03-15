import ActionDetailModel from "features/actions/models/ActionDetailModel";
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
      MainImagePath: webPartsDTO?.Home?.MainImagePath ?? "",
      MainImageAlt: webPartsDTO?.Home?.MainImageAlt ?? "",
      AboutUs: webPartsDTO?.Home?.AboutUs ?? "",
      AboutUsImagePath: webPartsDTO?.Home?.AboutUsImagePath ?? "",
      AboutUsImageAlt: webPartsDTO?.Home?.AboutUsImageAlt ?? "",
      PeopleSay1Text: webPartsDTO?.Home?.PeopleSay1Text ?? "",
      PeopleSay1Name: webPartsDTO?.Home?.PeopleSay1Name ?? "",
      PeopleSay2Text: webPartsDTO?.Home?.PeopleSay2Text ?? "",
      PeopleSay2Name: webPartsDTO?.Home?.PeopleSay2Name ?? "",
      PeopleSay3Text: webPartsDTO?.Home?.PeopleSay3Text ?? "",
      PeopleSay3Name: webPartsDTO?.Home?.PeopleSay3Name ?? "",
    },
    Actions: {
      Title: webPartsDTO?.Actions.Title ?? "",
      Description: webPartsDTO?.Actions.Description ?? "",
      PageHeaderTextMain: webPartsDTO?.Actions.PageHeaderTextMain ?? "",
      PageHeaderTextMainColor:
        webPartsDTO?.Actions.PageHeaderTextMainColor ?? "",
      MainImagePath: webPartsDTO?.Actions.MainImagePath ?? "",
      MainImageAlt: webPartsDTO?.Actions.MainImageAlt ?? "",
      ActionDetails:
        webPartsDTO?.Actions.ActionDetails.map(
          (item) =>
            new ActionDetailModel({
              Id: item.Id ?? 0,
              ActionOrder: item.ActionOrder ?? 0,
              MonthName: item.MonthName ?? "",
              ActionImagePath: item.ActionImagePath ?? "",
              ActionImageAlt: item.ActionImageAlt ?? "",
              ActionName: item.ActionName ?? "",
              ActionDescritption: item.ActionDescritption ?? "",
              VideoLink: item.VideoLink ?? "",
              Price: item.Price ?? "",
              Place: item.Place ?? "",
              Date: item.Date ?? "",
            })
        ) ?? [],
      DocumentsToDownload:
        webPartsDTO?.Actions.DocumentsToDownload.map(
          (item) =>
            new DocumentModel({
              Path: item.DocumentPath ?? "",
              Name: item.DocumentName ?? "",
            })
        ) ?? [],
    },
    Gallery: {
      Title: webPartsDTO?.Gallery.Title ?? "",
      Description: webPartsDTO?.Gallery.Description ?? "",
      PageHeaderTextMain: webPartsDTO?.Gallery.PageHeaderTextMain ?? "",
      PageHeaderTextMainColor:
        webPartsDTO?.Gallery.PageHeaderTextMainColor ?? "",
      MainImagePath: webPartsDTO?.Gallery.MainImagePath ?? "",
      MainImageAlt: webPartsDTO?.Gallery.MainImageAlt ?? "",
      Images: [],
      // webPartsDTO?.Gallery.Images.map(
      //   (item) =>
      //     new ImageModel({
      //       Path: item.ImagePath ?? "",
      //       Alt: item.ImageAlt ?? "",
      //     })
      // ) ?? [],
    },
    Contact: {
      Title: webPartsDTO?.Contact.Title ?? "",
      Description: webPartsDTO?.Contact.Description ?? "",
      PageHeaderTextMain: webPartsDTO?.Contact.PageHeaderTextMain ?? "",
      PageHeaderTextMainColor:
        webPartsDTO?.Contact.PageHeaderTextMainColor ?? "",
      MainImagePath: webPartsDTO?.Contact.MainImagePath ?? "",
      MainImageAlt: webPartsDTO?.Contact.MainImageAlt ?? "",
      GoogleMapsUrl: webPartsDTO?.Contact.GoogleMapsUrl ?? "",
    },
  };

  return result;
};
