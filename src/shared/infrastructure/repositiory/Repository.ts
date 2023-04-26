import { AxiosResponse } from "axios";
import AppNotification from "shared/components/notification/AppNotification";

import axios from "./axios";
import IPostRequest from "./IPostRequest";
import IPostResponse from "./IPostResponse";
import IRequest from "./IRequest";
import RepositoryBase from "./RepositoryBase";

export default class Repository extends RepositoryBase {
  public async get<T>(request: IRequest) {
    return await new Promise<T>((resolve, reject) => {
      // (request.private ? this.axiosPrivate : axios)
      (request.axiosPrivate || axios)
        .get(this.getUrl(request), {
          cancelToken: request.cancelToken,
          params: request.params,
          withCredentials: request.withCredentials || !!request.axiosPrivate,
          headers: { "Access-Control-Allow-Origin": "*" },
        })
        .then((response: AxiosResponse<T>) => {
          resolve(response.data);
        })
        .catch((error) => {
          AppNotification("Chyba", error, "danger");

          if (request.returnError) {
            return resolve(error);
          }

          reject();
        });
    });
  }

  /**
   * POST
   * @param postRequest
   * @returns
   */
  public post<TRequest, TResult>(
    postRequest: IPostRequest<TRequest>
  ): Promise<IPostResponse<TResult>> {
    return this.postRequest<TResult>(postRequest, postRequest.data);
  }
}
