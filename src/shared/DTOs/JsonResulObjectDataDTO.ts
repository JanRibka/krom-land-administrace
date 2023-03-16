export default interface JsonResulObjectDataDTO<T> {
  Success: boolean;
  ErrMsg: string;
  Data?: T | null;
}
