import AdmSettingsDTO from "shared/DTOs/AdmSettingsDTO";
import { AdmSettingsState } from "shared/infrastructure/store/admSettings/admSettingsSlice";

import DropDownsDataModel from "../models/DropDownsDataModel";

export const mapFromAdmSettingsDTO = (
  admSettingsDTO?: AdmSettingsDTO | null
) => {
  const result: Partial<AdmSettingsState> = {
    DropDownsData: admSettingsDTO?.DropDownsData ?? new DropDownsDataModel(),
  };
  return result;
};
