export default class ImageModel {
  path: string = "";
  alt: string = "";
  name: string = "";

  public constructor(init?: Partial<ImageModel>) {
    Object.assign(this, init);
  }
}
