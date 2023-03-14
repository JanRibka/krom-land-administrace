export default class ContactDTO {
  Id: number | null = null;
  Title: string | null = null;
  Description: string | null = null;
  PageHeaderTextMain: string | null = null;
  PageHeaderTextMainColor: string | null = null;
  MainImagePath: string | null = null;
  MainImageAlt: string | null = null;
  GoogleMapsUrl: string | null = null;

  public constructor(init?: Partial<ContactDTO>) {
    Object.assign(this, init);
  }
}
