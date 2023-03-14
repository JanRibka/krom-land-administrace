export class ContactModel {
  Title: string = "";
  Description: string = "";
  PageHeaderTextMain: string = "";
  PageHeaderTextMainColor: string = "";
  MainImagePath: string = "";
  MainImageAlt: string = "";
  GoogleMapsUrl: string = "";

  public constructor(init?: Partial<ContactModel>) {
    Object.assign(this, init);
  }
}
