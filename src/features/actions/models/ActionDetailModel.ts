import ImageModel from "shared/models/ImageModel";

export default class ActionDetailModel {
  Id: number = 0;
  ActionOrder: number = 0;
  MonthName: string = "";
  Image: ImageModel = new ImageModel();
  ActionName: string = "";
  ActionDescritption: string = "";
  VideoLink: string = "";
  Price: string = "";
  IsPriceRemark: boolean = false;
  PriceRemark: string = "";
  Place: string = "";
  Date: string = "";

  public constructor(init?: Partial<ActionDetailModel>) {
    Object.assign(this, init);
  }
}
