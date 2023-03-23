import ImageModel from 'shared/models/ImageModel';

import ActionDetailModel from './ActionDetailModel';
import DocumentToDownloadModel from './DocumentToDownloadModel';

export default class ActionsModel {
  Title: string = "";
  Description: string = "";
  PageHeaderTextMain: string = "";
  PageHeaderTextMainColor: string = "";
  MainImage: ImageModel = new ImageModel();
  ActionDetails: ActionDetailModel[] = [];
  DocumentsToDownload: DocumentToDownloadModel[] = [];

  public constructor(init?: Partial<ActionsModel>) {
    Object.assign(this, init);
  }
}
