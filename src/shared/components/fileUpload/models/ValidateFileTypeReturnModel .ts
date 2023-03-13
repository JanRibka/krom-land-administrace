export default class ValidateFileTypeReturnModel {
  Result: boolean = false;
  Extension: string = "";

  public constructor(init?: Partial<ValidateFileTypeReturnModel>) {
    Object.assign(this, init);
  }
}
