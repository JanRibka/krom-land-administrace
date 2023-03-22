import DocumentModel from "shared/models/DocumentModel";
import ImageModel from "shared/models/ImageModel";

import ActionDetailModel from "./ActionDetailModel";

export default class ActionsModel {
  Title: string = "";
  Description: string = "";
  PageHeaderTextMain: string = "";
  PageHeaderTextMainColor: string = "";
  MainImage: ImageModel = new ImageModel();
  ActionDetails: ActionDetailModel[] = [];
  DocumentsToDownload: DocumentModel[] = [];

  public constructor(init?: Partial<ActionsModel>) {
    Object.assign(this, init);
  }
}
