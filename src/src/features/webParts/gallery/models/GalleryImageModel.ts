import ImageModel from 'shared/models/ImageModel';

export default class GalleryImageModel {
  Id: number | null = null;
  Image: ImageModel = new ImageModel();
  Delete: boolean = false;

  public constructor(init?: Partial<GalleryImageModel>) {
    Object.assign(this, init);
  }
}
