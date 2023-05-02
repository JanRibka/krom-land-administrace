import ImageModel from "shared/models/ImageModel";

export class ContactModel {
  Title: string = "";
  Description: string = "";
  PageHeaderTextMain: string = "";
  PageHeaderTextMainColor: string = "";
  MainImage: ImageModel = new ImageModel();
  GoogleMapsUrl: string = "";
  Email: string = "";
  _dataLoaded: boolean = false;

  public constructor(init?: Partial<ContactModel>) {
    Object.assign(this, init);
  }
}
