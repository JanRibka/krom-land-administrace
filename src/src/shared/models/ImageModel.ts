export default class ImageModel {
  id: number | null = null;
  path: string = "";
  alt: string = "";
  name: string = "";

  public constructor(init?: Partial<ImageModel>) {
    Object.assign(this, init);
  }
}
