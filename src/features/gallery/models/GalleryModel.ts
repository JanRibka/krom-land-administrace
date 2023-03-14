import ImageModel from "shared/models/ImageModel";

export default class GalleryModel {
  Title: string = "";
  Description: string = "";
  PageHeaderTextMain: string = "";
  PageHeaderTextMainColor: string = "";
  MainImagePath: string = "";
  MainImageAlt: string = "";
  Images: ImageModel[] = [];

  public constructor(init?: Partial<GalleryModel>) {
    Object.assign(this, init);
  }
}
