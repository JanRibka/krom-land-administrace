export default class GalleryImageDTO {
  Id: number | null = null;
  Image: string | null = null;
  Delete: boolean | null = null;

  public constructor(init?: Partial<GalleryImageDTO>) {
    Object.assign(this, init);
  }
}
