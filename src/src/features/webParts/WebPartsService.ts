import AppNotification from "shared/components/notification/AppNotification";
import ActionDetailDTO from "shared/DTOs/ActionDetailDTO";
import ActionsDTO from "shared/DTOs/ActionsDTO";
import ConditionsDTO from "shared/DTOs/ConditionsDTO";
import ContactDTO from "shared/DTOs/ContactDTO";
import GalleryDTO from "shared/DTOs/GalleryDTO";
import HomeDTO from "shared/DTOs/HomeDTO";
import JsonResulObjectDataDTO from "shared/DTOs/JsonResulObjectDataDTO";
import JsonResulObjectDTO from "shared/DTOs/JsonResulObjectDTO";
import TeamMemberDTO from "shared/DTOs/TeamMemberDTO";
import Repository from "shared/infrastructure/repositiory/Repository";
import { store } from "shared/infrastructure/store/store";
import ImageModel from "shared/models/ImageModel";

import ActionDetailModel from "./actions/models/ActionDetailModel";
import { mapToActionsDTO } from "./actions/save/mapToActionsDTO";
import { mapToContactDTO } from "./contact/save/mapToContactDTO";
import { mapToGalleryDTO } from "./gallery/save/mapToGalleryDTO";
import { mapToGdprDTO } from "./gdpr/save/mapToGdprDTO";
import TeamMemberModel from "./home/models/TeamMemberModel";
import { mapToHomeDTO } from "./home/save/mapToHomeDTO";
import { mapToTermsOfConditionsDTO } from "./termsOfConditions/save/mapToTermsOfConditionsDTO";

export default class WebPartsService {
  private _repo = new Repository();

  /**
   * Home update
   */
  public async homeUpdate() {
    const state = store.getState();
    const conditions: HomeDTO = mapToHomeDTO(state.webParts.Home);

    const response = await this._repo.post<any, JsonResulObjectDTO>({
      baseUrl: process.env.REACT_APP_API_BASE_URL,
      url: (process.env.REACT_APP_API_URL ?? "") + "WebPartsController.php",
      params: new URLSearchParams({
        function: "homeUpdate",
      }),
      data: conditions,
    });

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
  }

  public async getTeamMembers() {
    let result: TeamMemberModel[] | null = null;

    const response = await this._repo.get<
      JsonResulObjectDataDTO<TeamMemberDTO[]>
    >({
      baseUrl: process.env.REACT_APP_API_BASE_URL,
      url: (process.env.REACT_APP_API_URL ?? "") + "WebPartsController.php",
      params: new URLSearchParams({
        function: "getTeamMembers",
      }),
      returnError: true,
    });

    result =
      response.Data?.map(
        (member) =>
          new TeamMemberModel({
            Id: member.Id ?? 0,
            Image: !!member.Image ? JSON.parse(member.Image) : new ImageModel(),
            Name: member.Name ?? "",
            Description: member.Description ?? "",
            Delete: false,
          })
      ) ?? [];

    return result;
  }

  /**
   * Actions update
   */
  public async actionsUpdate() {
    const state = store.getState();
    const actions: ActionsDTO = mapToActionsDTO(state.webParts.Actions);
    console.log(actions);
    const response = await this._repo.post<any, JsonResulObjectDTO>({
      baseUrl: process.env.REACT_APP_API_BASE_URL,
      url: (process.env.REACT_APP_API_URL ?? "") + "WebPartsController.php",
      params: new URLSearchParams({
        function: "actionsUpdate",
      }),
      data: actions,
    });

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
  }

  /**
   * Get action details
   * @returns
   */
  public async getActionDetails() {
    let result: ActionDetailModel[] | null = null;

    const response = await this._repo.get<
      JsonResulObjectDataDTO<ActionDetailDTO[]>
    >({
      baseUrl: process.env.REACT_APP_API_BASE_URL,
      url: (process.env.REACT_APP_API_URL ?? "") + "WebPartsController.php",
      params: new URLSearchParams({
        function: "getActionDetails",
      }),
      returnError: true,
    });

    result =
      response.Data?.map(
        (item) =>
          new ActionDetailModel({
            Id: item.Id ?? item.Id ?? 0,
            ActionOrder: item.ActionOrder ?? 0,
            MonthName: item.MonthName ?? "",
            Image: !!item?.Image ? JSON.parse(item.Image) : new ImageModel(),
            ActionName: item.ActionName ?? "",
            ActionDescritption: item.ActionDescritption ?? "",
            VideoLink: item.VideoLink ?? "",
            Price: item.Price ?? "",
            IsPriceRemark: item.IsPriceRemark === "1",
            PriceRemark: item.PriceRemark ?? "",
            Place: item.Place ?? "",
            Date: item.Date ?? "",
            CapacityFull: item.CapacityFull === "1",
            DisplayTShirtSize: item.DisplayTShirtSize === "1",
          })
      ) ?? [];

    return result;
  }

  /**
   * Gallery update
   */
  public async galleryUpdate() {
    const state = store.getState();
    const gallery: GalleryDTO = mapToGalleryDTO(state.webParts.Gallery);

    const response = await this._repo.post<any, JsonResulObjectDTO>({
      baseUrl: process.env.REACT_APP_API_BASE_URL,
      url: (process.env.REACT_APP_API_URL ?? "") + "WebPartsController.php",
      params: new URLSearchParams({
        function: "galleryUpdate",
      }),
      data: gallery,
    });

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
  }

  /**
   * Contact update
   */
  public async contactUpdate() {
    const state = store.getState();
    const contact: ContactDTO = mapToContactDTO(state.webParts.Contact);

    const response = await this._repo.post<any, JsonResulObjectDTO>({
      baseUrl: process.env.REACT_APP_API_BASE_URL,
      url: (process.env.REACT_APP_API_URL ?? "") + "WebPartsController.php",
      params: new URLSearchParams({
        function: "contactUpdate",
      }),
      data: contact,
    });

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
  }

  /**
   * GDPR update
   */
  public async gdprUpdate() {
    const state = store.getState();
    const conditions: ConditionsDTO = mapToGdprDTO(state.webParts.Conditions);

    const response = await this._repo.post<any, JsonResulObjectDTO>({
      baseUrl: process.env.REACT_APP_API_BASE_URL,
      url: (process.env.REACT_APP_API_URL ?? "") + "WebPartsController.php",
      params: new URLSearchParams({
        function: "gdprUpdate",
      }),
      data: conditions,
    });

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
  }

  /**
   * Term of conditions update
   */
  public async termsOfConditionsUpdate() {
    const state = store.getState();
    const conditions: ConditionsDTO = mapToTermsOfConditionsDTO(
      state.webParts.Conditions
    );

    const response = await this._repo.post<any, JsonResulObjectDTO>({
      baseUrl: process.env.REACT_APP_API_BASE_URL,
      url: (process.env.REACT_APP_API_URL ?? "") + "WebPartsController.php",
      params: new URLSearchParams({
        function: "termsOfConditionsUpdate",
      }),
      data: conditions,
    });

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
  }
}
