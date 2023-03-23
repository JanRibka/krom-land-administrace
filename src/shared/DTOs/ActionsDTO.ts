import ActionDetailDTO from './ActionDetailDTO';
import DocumentToDownloadDTO from './DocumentToDownloadDTO';

export default class ActionsDTO {
  Id: number | null = null;
  Title: string | null = null;
  Description: string | null = null;
  PageHeaderTextMain: string | null = null;
  PageHeaderTextMainColor: string | null = null;
  MainImage: string | null = null;
  ActionDetails: ActionDetailDTO[] = [];
  DocumentsToDownload: DocumentToDownloadDTO[] = [];

  public constructor(init?: Partial<ActionsDTO>) {
    Object.assign(this, init);
  }
}
