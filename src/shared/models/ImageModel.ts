export default class ImageModel {
  Path: string = "";
  Alt: string = "";
  Name: string = "";

  public constructor(init?: Partial<ImageModel>) {
    Object.assign(this, init);
  }
}
