export default class ImageModel {
  Path: string = "";
  Alt: string = "";
  Url: string = "";
  Name: string = "";
  DeleteFile: boolean = false;
  FileDestination: string = "";

  public constructor(init?: Partial<ImageModel>) {
    Object.assign(this, init);
  }
}
