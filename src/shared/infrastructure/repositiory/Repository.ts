import axios, { AxiosResponse } from 'axios';
import AppNotification from 'shared/components/notification/AppNotification';

import IPostRequest from './IPostRequest';
import IPostResponse from './IPostResponse';
import IRequest from './IRequest';
import RepositoryBase from './RepositoryBase';

export default class Repository extends RepositoryBase {
  public async get<T>(request: IRequest) {
    return await new Promise<T>((resolve, reject) => {
      axios
        .get(this.getUrl(request), {
          cancelToken: request.cancelToken,
          params: request.params,
          withCredentials: request.withCredentials,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        })
        .then((response: AxiosResponse<T>) => {
          resolve(response.data);
        })
        .catch((error: any) => {
          if (typeof error?.response?.data === "string") {
            AppNotification("Chyba", String(error?.response?.data), "danger");
          } else {
            const errMsg =
              error?.response?.data?.ErrMsg ??
              "Nastala chyba při vykonávání příkazu";

            AppNotification("Chyba", errMsg, "danger");
          }

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
  public async post<TRequest, TResult>(
    postRequest: IPostRequest<TRequest>
  ): Promise<IPostResponse<TResult>> {
    return await this.postRequest<TResult>(postRequest, postRequest.data);
  }
}
