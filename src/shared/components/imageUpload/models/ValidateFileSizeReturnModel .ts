export default class ValidateFileSizeReturnModel {
  Message: string = "";
  SizeLimRchd: boolean = false;

  public constructor(init?: Partial<ValidateFileSizeReturnModel>) {
    Object.assign(this, init);
  }
}
