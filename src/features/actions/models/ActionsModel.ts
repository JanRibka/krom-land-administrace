import DocumentModel from "shared/models/DocumentModel";

import ActionDetailModel from "./ActionDetailModel";

export default class ActionsModel {
  Title: string = "";
  Description: string = "";
  PageHeaderTextMain: string = "";
  PageHeaderTextMainColor: string = "";
  MainImagePath: string = "";
  MainImageAlt: string = "";
  ActionDetails: ActionDetailModel[] = [];
  DocumentsToDownload: DocumentModel[] = [];

  public constructor(init?: Partial<ActionsModel>) {
    Object.assign(this, init);
  }
}
