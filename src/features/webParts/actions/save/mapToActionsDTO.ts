import ActionDetailDTO from "shared/DTOs/ActionDetailDTO";
import ActionsDTO from "shared/DTOs/ActionsDTO";

import ActionsModel from "../models/ActionsModel";

export const mapToActionsDTO = (actions: ActionsModel) => {
  const result: ActionsDTO = {
    Id: actions.Id,
    Title: actions.Title,
    Description: actions.Description,
    PageHeaderTextMain: actions.PageHeaderTextMain,
    PageHeaderTextMainColor: actions.PageHeaderTextMainColor,
    MainImage: null,
    EmailKromLand: actions.EmailKromLand,
    ActionDetails: actions.ActionDetails.map(
      (item) =>
        new ActionDetailDTO({
          Id: item.Id,
          ActionOrder: item.ActionOrder,
          MonthName: item.MonthName,
          Image: JSON.stringify(item.Image),
          ActionName: item.ActionName,
          ActionDescritption: item.ActionDescritption,
          VideoLink: item.VideoLink,
          Price: item.Price,
          IsPriceRemark: item.IsPriceRemark === true ? "1" : "0",
          PriceRemark: item.PriceRemark,
          Place: item.Place,
          Date: item.Date,
          CapacityFull: item.CapacityFull === true ? "1" : "0",
          Delete: item.Delete,
        })
    ),
    DocumentsToDownload: [],
  };

  return result;
};
