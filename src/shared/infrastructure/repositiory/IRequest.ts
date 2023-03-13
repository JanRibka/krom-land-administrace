import { AxiosHeaders, CancelToken, RawAxiosRequestHeaders } from "axios";

export default interface IRequest {
  url: string;
  baseUrl?: string;
  params?: URLSearchParams;
  cancelToken?: CancelToken;
  routeParams?: URLSearchParams;
  returnError?: boolean;
  headers?: RawAxiosRequestHeaders | AxiosHeaders;
}
