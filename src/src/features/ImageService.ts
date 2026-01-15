import AppNotification from "shared/components/notification/AppNotification";
import JsonResulObjectDataDTO from "shared/DTOs/JsonResulObjectDataDTO";
import JsonResulObjectDTO from "shared/DTOs/JsonResulObjectDTO";
import { ImageLocationEnum } from "shared/enums/ImageLocationEnum";
import Repository from "shared/infrastructure/repositiory/Repository";
import ImageModel from "shared/models/ImageModel";

export default class ImageService {
  private _repo = new Repository();

  /**
   * Upload image on server
   * @param formData
   */
  public async imageUpload(formData: FormData) {
    const response = await this._repo.post<any, JsonResulObjectDataDTO<string>>(
      {
        baseUrl: process.env.REACT_APP_API_BASE_URL,
        url: (process.env.REACT_APP_API_URL ?? "") + "ImageController.php",
        params: new URLSearchParams({
          function: "imageUpload",
        }),
        data: formData,
      }
    );

    const dataType = typeof response.data;

    if (dataType === "string") {
      AppNotification("Chyba", String(response.data), "danger");
    } else if (dataType === "object") {
      if (response.data?.Success) {
        AppNotification("Úspěch", "Obrázek nahrán", "success");
      } else {
        AppNotification("Chyba", response.data?.ErrMsg ?? "", "danger");
      }
    } else {
      AppNotification("Úspěch", "Obrázek nahrán", "success");
    }
  }

  /**
   * Delete image
   * @param imageName
   * @param directory
   */
  public async imageDelete(
    imageName: string,
    directory: string,
    name: string,
    location: ImageLocationEnum,
    id: number | null
  ) {
    const response = await this._repo.post<any, JsonResulObjectDTO>({
      baseUrl: process.env.REACT_APP_API_BASE_URL,
      url: (process.env.REACT_APP_API_URL ?? "") + "ImageController.php",
      params: new URLSearchParams({
        function: "imageDelete",
      }),
      data: {
        imageName: imageName,
        directory: directory,
        itemName: name,
        id: id,
        location: location,
      },
    });

    const dataType = typeof response.data;

    if (dataType === "string") {
      AppNotification("Chyba", String(response.data), "danger");
    } else if (dataType === "object") {
      if (response.data?.Success) {
        AppNotification("Úspěch", "Obrázek smazán", "success");
      } else {
        AppNotification("Chyba", response.data?.ErrMsg ?? "", "danger");
      }
    } else {
      AppNotification("Úspěch", "Obrázek smazán", "success");
    }
  }

  /**
   * Save image
   * @param image
   * @param name
   */
  public async imageSave(
    image: ImageModel,
    name: string,
    location: ImageLocationEnum,
    id: number | null
  ) {
    const response = await this._repo.post<
      any,
      JsonResulObjectDataDTO<number | null>
    >({
      baseUrl: process.env.REACT_APP_API_BASE_URL,
      url: (process.env.REACT_APP_API_URL ?? "") + "ImageController.php",
      params: new URLSearchParams({
        function: "imageSave",
      }),
      data: {
        image: image,
        itemName: name,
        id: id,
        location: location,
      },
    });

    let result = null;

    const dataType = typeof response.data;

    if (dataType === "string") {
      AppNotification("Chyba", String(response.data), "danger");
    } else {
      if (response.data?.Success) {
        result = response?.data?.Data;
        AppNotification("Úspěch", "Obrázek uložen", "success");
      } else {
        AppNotification("Chyba", response.data?.ErrMsg ?? "", "danger");
      }
    }

    return result;
  }
}
