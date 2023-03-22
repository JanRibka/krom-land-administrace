export default class GalleryDTO {
  Id: number | null = null;
  Title: string | null = null;
  Description: string | null = null;
  PageHeaderTextMain: string | null = null;
  PageHeaderTextMainColor: string | null = null;
  MainImage: string | null = null;
  Images: string[] = [];

  public constructor(init?: Partial<GalleryDTO>) {
    Object.assign(this, init);
  }
}
