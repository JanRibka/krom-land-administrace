import axios from "./axios";
import IPostResponse from "./IPostResponse";
import IRequest from "./IRequest";

export default abstract class RepositoryBase {
  /**
   * Get URL
   */
  protected getUrl(request: IRequest) {
    let url = "";
    let baseUrl = request.baseUrl ?? process.env.PUBLIC_URL;

    if (baseUrl?.endsWith("/")) {
      baseUrl = baseUrl.substring(0, baseUrl.length - 1);
    }

    if (request.routeParams) {
      let templateUrl = request.url;

      for (const [key, value] of request.routeParams.entries()) {
        templateUrl = templateUrl.replace(`{${key}}`, value);
      }

      url = `${baseUrl}/${templateUrl}`;
    } else {
      url = `${baseUrl}/${request.url}`;
    }

    return url;
  }

  protected async postRequest<TResult>(
    request: IRequest,
    data: any
  ): Promise<IPostResponse<TResult>> {
    return (request.axiosPrivate || axios).post(this.getUrl(request), data, {
      cancelToken: request.cancelToken,
      params: request.params,
      headers: { ...request.headers },
    });
  }
}
