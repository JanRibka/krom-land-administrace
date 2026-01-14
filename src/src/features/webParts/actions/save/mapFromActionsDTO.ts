import ActionsDTO from "shared/DTOs/ActionsDTO";
import DocumentModel from "shared/models/DocumentModel";
import ImageModel from "shared/models/ImageModel";

import ActionDetailModel from "../models/ActionDetailModel";
import ActionsModel from "../models/ActionsModel";
import DocumentToDownloadModel from "../models/DocumentToDownloadModel";

export const mapFromActionsDTO = (actionsDTO?: ActionsDTO | null) => {
  const result: ActionsModel = {
    Id: actionsDTO?.Id ?? 0,
    Title: actionsDTO?.Title ?? "",
    Description: actionsDTO?.Description ?? "",
    PageHeaderTextMain: actionsDTO?.PageHeaderTextMain ?? "",
    PageHeaderTextMainColor: actionsDTO?.PageHeaderTextMainColor ?? "",
    MainImage: !!actionsDTO?.MainImage
      ? JSON.parse(actionsDTO?.MainImage)
      : new ImageModel(),
    EmailKromLand: actionsDTO?.EmailKromLand ?? "",
    ActionDetails:
      actionsDTO?.ActionDetails.map(
        (item) =>
          new ActionDetailModel({
            Id: item.Id ?? item.Id ?? 0,
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
            CapacityFull: item.CapacityFull === "1",
            DisplayTShirtSize: item.DisplayTShirtSize === "1",
          })
      ) ?? [],
    DocumentsToDownload:
      actionsDTO?.DocumentsToDownload.map(
        (item) =>
          new DocumentToDownloadModel({
            Id: item.Id ?? 0,
            Document: !!item.Document
              ? JSON.parse(item.Document)
              : new DocumentModel(),
            Delete: item.Delete ?? false,
          })
      ) ?? [],
    _dataLoaded: true,
  };

  return result;
};
