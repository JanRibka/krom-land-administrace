export default class ActionDetailDTO {
  Id: number | null = null;
  ActionsId: number | null = null;
  ActionOrder: number | null = null;
  MonthName: string | null = null;
  ActionImagePath: string | null = null;
  ActionImageAlt: string | null = null;
  ActionName: string | null = null;
  ActionDescritption: string | null = null;
  VideoLink: string | null = null;
  Price: string | null = null;
  IsPriceRemark: boolean | null = null;
  PriceRemark: string | null = null;
  Place: string | null = null;
  Date: string | null = null;

  public constructor(init?: Partial<ActionDetailDTO>) {
    Object.assign(this, init);
  }
}
