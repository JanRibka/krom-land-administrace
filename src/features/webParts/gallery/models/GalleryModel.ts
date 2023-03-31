import ImageModel from "shared/models/ImageModel";

import GalleryImageModel from "./GalleryImageModel";

export default class GalleryModel {
  Title: string = "";
  Description: string = "";
  PageHeaderTextMain: string = "";
  PageHeaderTextMainColor: string = "";
  MainImage: ImageModel = new ImageModel();
  ExternalGalleryLink: string = "";
  Images: GalleryImageModel[] = [];

  public constructor(init?: Partial<GalleryModel>) {
    Object.assign(this, init);
  }
}
