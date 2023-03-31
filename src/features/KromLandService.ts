import { HttpStatusCode } from "axios";
import AppNotification from "shared/components/notification/AppNotification";
import JsonResulObjectDataDTO from "shared/DTOs/JsonResulObjectDataDTO";
import JsonResulObjectDTO from "shared/DTOs/JsonResulObjectDTO";
import KromLandDTO from "shared/DTOs/KromLandDTO";
import Repository from "shared/infrastructure/repositiory/Repository";
import { store } from "shared/infrastructure/store/store";
import DocumentModel from "shared/models/DocumentModel";
import ImageModel from "shared/models/ImageModel";

import { mapToWebPartsDTO } from "./webParts/save/mapToWebPartsDTO";

export default class KromLandService {
  private _repo = new Repository();

  /**
   * Save store
   */
  public async saveStore() {
    const state = store.getState();
    const storeToSave: KromLandDTO = {
      WebParts: mapToWebPartsDTO(state.webParts),
    };

    const response = await this._repo.post<any, JsonResulObjectDTO>({
      url: process.env.REACT_APP_API_URL ?? "",
      params: new URLSearchParams({
        action: "webcontent",
        type: "saveall",
      }),
      data: storeToSave,
    });

    if (response.status === HttpStatusCode.Ok) {
      const dataType = typeof response.data;

      if (dataType === "string") {
        AppNotification("Chyba", String(response.data), "danger");
      } else if (dataType === "object") {
        if (response.data?.Success) {
          AppNotification("Úspěch", "Úspěšně uloženo", "success");
        } else {
          AppNotification("Chyba", response.data?.ErrMsg ?? "", "danger");
        }
      } else {
        AppNotification("Úspěch", "Úspěšně uloženo", "success");
      }
    } else {
      AppNotification("Chyba", "Chyba při ukládání dat", "danger");
    }
  }

  /**
   * Upload image on server
   * @param formData
   */
  public async uploadImage(formData: FormData) {
    const response = await this._repo.post<any, JsonResulObjectDataDTO<string>>(
      {
        url: process.env.REACT_APP_API_URL ?? "",
        params: new URLSearchParams({
          action: "image",
          type: "uploadimage",
        }),
        data: formData,
      }
    );

    if (response.status === HttpStatusCode.Ok) {
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
    } else {
      AppNotification("Chyba", "Chyba při nahrávání obrázku", "danger");
    }
  }

  /**
   * Delete image
   * @param imageName
   * @param directory
   */
  public async deleteImage(imageName: string, directory: string) {
    const response = await this._repo.post<any, JsonResulObjectDTO>({
      url: process.env.REACT_APP_API_URL ?? "",
      params: new URLSearchParams({
        action: "image",
        type: "deleteimage",
      }),
      data: {
        imageName: imageName,
        directory: directory,
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

  /**
   * Save image
   * @param image
   * @param name
   */
  public async saveImage(
    image: ImageModel,
    name: string,
    method:
      | "saveimagehome"
      | "saveimageactions"
      | "saveimagegallery"
      | "saveimagecontact"
      | "saveimageteammember"
  ) {
    const response = await this._repo.post<any, JsonResulObjectDTO>({
      url: process.env.REACT_APP_API_URL ?? "",
      params: new URLSearchParams({
        action: "image",
        type: method,
      }),
      data: {
        image: image,
        name: name,
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

  /**
   * Upload document on server
   * @param formData
   */
  public async uploadDocument(formData: FormData) {
    const response = await this._repo.post<any, JsonResulObjectDataDTO<string>>(
      {
        url: process.env.REACT_APP_API_URL ?? "",
        params: new URLSearchParams({
          action: "document",
          type: "uploaddocument",
        }),
        data: formData,
      }
    );

    if (response.status === HttpStatusCode.Ok) {
      const dataType = typeof response.data;

      if (dataType === "string") {
        AppNotification("Chyba", String(response.data), "danger");
      } else if (dataType === "object") {
        if (response.data?.Success) {
          AppNotification("Úspěch", "Dokument nahrán", "success");
        } else {
          AppNotification("Chyba", response.data?.ErrMsg ?? "", "danger");
        }
      } else {
        AppNotification("Úspěch", "Dokument nahrán", "success");
      }
    } else {
      AppNotification("Chyba", "Chyba při nahrávání dokumentu", "danger");
    }
  }

  /**
   * Delete document
   * @param documentName
   * @param directory
   */
  public async deleteDocument(
    documentName: string,
    directory: string,
    id: number | null
  ) {
    const response = await this._repo.post<any, JsonResulObjectDTO>({
      url: process.env.REACT_APP_API_URL ?? "",
      params: new URLSearchParams({
        action: "document",
        type: "deletedocument",
      }),
      data: {
        documentName: documentName,
        directory: directory,
        id: id,
      },
    });

    if (response.status === HttpStatusCode.Ok) {
      const dataType = typeof response.data;

      if (dataType === "string") {
        AppNotification("Chyba", String(response.data), "danger");
      } else if (dataType === "object") {
        if (response.data?.Success) {
          AppNotification("Úspěch", "Dokument smazán", "success");
        } else {
          AppNotification("Chyba", response.data?.ErrMsg ?? "", "danger");
        }
      } else {
        AppNotification("Úspěch", "Dokument smazán", "success");
      }
    } else {
      AppNotification("Chyba", "Chyba při mazání dokumentu", "danger");
    }
  }

  /**
   * Save document
   * @param document
   * @param index
   */
  public async saveDocument(document: DocumentModel, id: number | null) {
    const response = await this._repo.post<any, JsonResulObjectDataDTO<number>>(
      {
        url: process.env.REACT_APP_API_URL ?? "",
        params: new URLSearchParams({
          action: "document",
          type: "savedocument",
        }),
        data: {
          document: document,
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
          AppNotification("Úspěch", "Dokument uložen", "success");
        } else {
          AppNotification("Chyba", response.data?.ErrMsg ?? "", "danger");
        }
      } else {
        result = response.data?.Data ?? null;
        AppNotification("Úspěch", "Dokument uložen", "success");
      }
    } else {
      AppNotification("Chyba", "Chyba při mazání dokumentu", "danger");
    }

    return result;
  }
}
