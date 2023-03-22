import ActionDetailDTO from "./ActionDetailDTO";
import DocumentDTO from "./DocumentDTO";

export default class ActionsDTO {
  Id: number | null = null;
  Title: string | null = null;
  Description: string | null = null;
  PageHeaderTextMain: string | null = null;
  PageHeaderTextMainColor: string | null = null;
  MainImage: string | null = null;
  ActionDetails: ActionDetailDTO[] = [];
  DocumentsToDownload: DocumentDTO[] = [];

  public constructor(init?: Partial<ActionsDTO>) {
    Object.assign(this, init);
  }
}
