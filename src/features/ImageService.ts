import { HttpStatusCode } from 'axios';
import AppNotification from 'shared/components/notification/AppNotification';
import JsonResulObjectDataDTO from 'shared/DTOs/JsonResulObjectDataDTO';
import JsonResulObjectDTO from 'shared/DTOs/JsonResulObjectDTO';
import { ImageLocationEnum } from 'shared/enums/ImageLocationEnum';
import Repository from 'shared/infrastructure/repositiory/Repository';
import ImageModel from 'shared/models/ImageModel';

export default class ImageService {
  private _repo = new Repository();

  /**
   * Upload image on server
   * @param formData
   */
  public async imageUpload(formData: FormData) {
    const response = await this._repo.post<any, JsonResulObjectDataDTO<string>>(
      {
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
    const response = await this._repo.post<any, JsonResulObjectDTO>({
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

    let result = false;

    const dataType = typeof response.data;

    if (dataType === "string") {
      AppNotification("Chyba", String(response.data), "danger");
    } else if (dataType === "object") {
      if (response.data?.Success) {
        result = true;
        AppNotification("Úspěch", "Obrázek uložen", "success");
      } else {
        AppNotification("Chyba", response.data?.ErrMsg ?? "", "danger");
      }
    } else {
      result = true;
      AppNotification("Úspěch", "Obrázek uložen", "success");
    }

    return result;
  }

  /**
   * Save image - Team member
   * @param image
   * @param index
   */
  public async saveImageTeamMember(image: ImageModel, id: number) {
    const response = await this._repo.post<any, JsonResulObjectDTO>({
      url: process.env.REACT_APP_API_URL ?? "",
      params: new URLSearchParams({
        action: "image",
        type: "saveimageteammember",
      }),
      data: {
        image: image,
        id: id,
      },
    });

    let result = false;

    if (response.status === HttpStatusCode.Ok) {
      const dataType = typeof response.data;

      if (dataType === "string") {
        AppNotification("Chyba", String(response.data), "danger");
      } else if (dataType === "object") {
        if (response.data?.Success) {
          result = true;
          AppNotification("Úspěch", "Obrázek uložen", "success");
        } else {
          AppNotification("Chyba", response.data?.ErrMsg ?? "", "danger");
        }
      } else {
        result = true;
        AppNotification("Úspěch", "Obrázek uložen", "success");
      }
    } else {
      AppNotification("Chyba", "Chyba při ukládání obrázku", "danger");
    }

    return result;
  }

  /**
   * Save image - Action details
   * @param image
   * @param id
   */
  public async saveImageActionDetails(image: ImageModel, id: number) {
    const response = await this._repo.post<any, JsonResulObjectDTO>({
      url: process.env.REACT_APP_API_URL ?? "",
      params: new URLSearchParams({
        action: "image",
        type: "saveimageactiondetails",
      }),
      data: {
        image: image,
        id: id,
      },
    });

    let result = false;

    if (response.status === HttpStatusCode.Ok) {
      const dataType = typeof response.data;

      if (dataType === "string") {
        AppNotification("Chyba", String(response.data), "danger");
      } else if (dataType === "object") {
        if (response.data?.Success) {
          result = true;
          AppNotification("Úspěch", "Obrázek uložen", "success");
        } else {
          AppNotification("Chyba", response.data?.ErrMsg ?? "", "danger");
        }
      } else {
        result = true;
        AppNotification("Úspěch", "Obrázek uložen", "success");
      }
    } else {
      AppNotification("Chyba", "Chyba při ukládání obrázku", "danger");
    }

    return result;
  }

  /**
   * Save image - Gallery image
   * @param image
   * @param id
   */
  public async saveImageGalleryImage(image: ImageModel, id: number | null) {
    const response = await this._repo.post<any, JsonResulObjectDataDTO<number>>(
      {
        url: process.env.REACT_APP_API_URL ?? "",
        params: new URLSearchParams({
          action: "image",
          type: "saveimagegalleryimage",
        }),
        data: {
          image: image,
          id: id,
        },
      }
    );

    let result: number | null = null;

    if (response.status === HttpStatusCode.Ok) {
      const dataType = typeof response.data;

      if (dataType === "string") {
        AppNotification("Chyba", String(response.data), "danger");
      } else if (dataType === "object") {
        if (response.data?.Success) {
          result = response.data?.Data ?? null;
          AppNotification("Úspěch", "Obrázek uložen", "success");
        } else {
          AppNotification("Chyba", response.data?.ErrMsg ?? "", "danger");
        }
      } else {
        result = response.data?.Data ?? null;
        AppNotification("Úspěch", "Obrázek uložen", "success");
      }
    } else {
      AppNotification("Chyba", "Chyba při ukládání obrázku", "danger");
    }

    return result;
  }

  /**
   * Delete gallery image
   * @param id
   */
  public async deleteGalleryImage(id: number | null) {
    const response = await this._repo.post<any, JsonResulObjectDTO>({
      url: process.env.REACT_APP_API_URL ?? "",
      params: new URLSearchParams({
        action: "image",
        type: "deletegalleryimage",
      }),
      data: {
        id: id,
      },
    });

    if (response.status === HttpStatusCode.Ok) {
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
    } else {
      AppNotification("Chyba", "Chyba při mazání obrázku", "danger");
    }
  }
}
