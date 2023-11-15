import AdmSettingsDTO from "shared/DTOs/AdmSettingsDTO";
import {
  AdmSettingsState,
  DropDownsDataType,
} from "shared/infrastructure/store/admSettings/admSettingsSlice";

export const mapFromAdmSettingsDTO = (admSettings: AdmSettingsDTO | null) => {
  let dropDownsData: DropDownsDataType = {};

  admSettings?.DropDownsData?.forEach((item) => {
    if (!dropDownsData[item.GroupKey]) {
      dropDownsData[item.GroupKey] = {};
    }

    if (!dropDownsData[item.GroupKey][item.Key]) {
      dropDownsData[item.GroupKey][item.Key] = [];
    }

    dropDownsData[item.GroupKey][item.Key].push(item);
  });

  const result: Partial<AdmSettingsState> = {
    DropDownsData: dropDownsData,
  };

  return result;
};
