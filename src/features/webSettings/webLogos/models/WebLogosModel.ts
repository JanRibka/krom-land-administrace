import ImageModel from "shared/models/ImageModel";

export default class WebLogosModel {
  Id: number = 0;
  HeaderLogo: ImageModel = new ImageModel();
  _dataLoaded: boolean = false;

  public constructor(init?: Partial<WebLogosModel>) {
    Object.assign(this, init);
  }
}
