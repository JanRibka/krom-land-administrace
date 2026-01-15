import AppNotification from "shared/components/notification/AppNotification";
import JsonResulObjectDataDTO from "shared/DTOs/JsonResulObjectDataDTO";
import JsonResulObjectDTO from "shared/DTOs/JsonResulObjectDTO";
import Repository from "shared/infrastructure/repositiory/Repository";
import DocumentModel from "shared/models/DocumentModel";

export default class DocumentService {
  private _repo = new Repository();

  /**
   * Upload document on server
   * @param formData
   */
  public async documentUpload(formData: FormData) {
    const response = await this._repo.post<any, JsonResulObjectDataDTO<string>>(
      {
        baseUrl: process.env.REACT_APP_API_BASE_URL,
        url: (process.env.REACT_APP_API_URL ?? "") + "DocumentController.php",
        params: new URLSearchParams({
          function: "documentUpload",
        }),
        data: formData,
      }
    );

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
  }

  /**
   * Delete document
   * @param documentName
   * @param directory
   */
  public async documentDelete(
    documentName: string,
    directory: string,
    id: number | null
  ) {
    const response = await this._repo.post<any, JsonResulObjectDTO>({
      baseUrl: process.env.REACT_APP_API_BASE_URL,
      url: (process.env.REACT_APP_API_URL ?? "") + "DocumentController.php",
      params: new URLSearchParams({
        function: "documentDelete",
      }),
      data: {
        documentName: documentName,
        directory: directory,
        id: id,
      },
    });

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
  }

  /**
   * Save document
   * @param document
   * @param index
   */
  public async documentSave(document: DocumentModel, id: number | null) {
    const response = await this._repo.post<any, JsonResulObjectDataDTO<number>>(
      {
        baseUrl: process.env.REACT_APP_API_BASE_URL,
        url: (process.env.REACT_APP_API_URL ?? "") + "DocumentController.php",
        params: new URLSearchParams({
          function: "documentSave",
        }),
        data: {
          document: document,
          id: id,
        },
      }
    );

    let result: number | null = null;
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

    return result;
  }
}
