import IRequest from "./IRequest";

export default interface IPostRequest<T> extends IRequest {
  data?: T;
}
