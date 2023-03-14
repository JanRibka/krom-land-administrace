import ImageDTO from "./ImageDTO";

export default class GalleryDTO {
  Id: number | null = null;
  Title: string | null = null;
  Description: string | null = null;
  PageHeaderTextMain: string | null = null;
  PageHeaderTextMainColor: string | null = null;
  MainImagePath: string | null = null;
  MainImageAlt: string | null = null;
  Images: ImageDTO[] = [];

  public constructor(init?: Partial<GalleryDTO>) {
    Object.assign(this, init);
  }
}
