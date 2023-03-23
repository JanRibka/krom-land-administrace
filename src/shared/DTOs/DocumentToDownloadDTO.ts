export default class DocumentToDownloadDTO {
  Id: number | null = null;
  Document: string | null = null;
  Delete: boolean | null = null;

  public constructor(init?: Partial<DocumentToDownloadDTO>) {
    Object.assign(this, init);
  }
}
