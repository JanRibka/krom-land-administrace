export default interface JsonResulObjectDTO<T> {
  Success: boolean;
  ErrMsg: string;
  Data?: T | null;
}
