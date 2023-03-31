import DocumentModel from "shared/models/DocumentModel";

export default class DocumentToDownloadModel {
  Id: number | null = null;
  Document: DocumentModel = new DocumentModel();
  Delete: boolean = false;

  public constructor(init?: Partial<DocumentToDownloadModel>) {
    Object.assign(this, init);
  }
}
