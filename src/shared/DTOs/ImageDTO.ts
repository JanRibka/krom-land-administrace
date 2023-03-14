export default class ImageDTO {
  Id: number | null = null;
  ImagePath: string | null = null;
  ImageAlt: string | null = null;

  public constructor(init?: Partial<ImageDTO>) {
    Object.assign(this, init);
  }
}
