export default class DocumentModel {
  Path: string = "";
  Name: string = "";

  public constructor(init?: Partial<DocumentModel>) {
    Object.assign(this, init);
  }
}
