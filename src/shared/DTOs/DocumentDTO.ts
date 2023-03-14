export default class DocumentDTO {
  Id: number | null = null;
  DocumentPath: string | null = null;
  DocumentName: string | null = null;

  public constructor(init?: Partial<DocumentDTO>) {
    Object.assign(this, init);
  }
}
