import {
  AxiosHeaders,
  AxiosInstance,
  CancelToken,
  RawAxiosRequestHeaders,
} from "axios";

export default interface IRequest {
  url: string;
  baseUrl?: string;
  params?: URLSearchParams;
  cancelToken?: CancelToken;
  controller?: AbortController;
  routeParams?: URLSearchParams;
  returnError?: boolean;
  headers?: RawAxiosRequestHeaders | AxiosHeaders;
  withCredentials?: boolean;
  axiosPrivate?: AxiosInstance;
}
