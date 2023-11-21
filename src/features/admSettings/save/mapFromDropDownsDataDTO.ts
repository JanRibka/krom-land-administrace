import {
  AdmSettingsState,
  DropDownsDataType,
} from "shared/infrastructure/store/admSettings/admSettingsSlice";
import TableOfKeysModel from "shared/models/TableOfKeysModel";

const mapFromDropDownsDataDTO = (
  dropDownsDataDTO: TableOfKeysModel[] | null
) => {
  let dropDownsData: DropDownsDataType = {};

  dropDownsDataDTO?.forEach((item) => {
    if (!dropDownsData[item.GroupKey]) {
      dropDownsData[item.GroupKey] = [];
    }

    dropDownsData[item.GroupKey].push(item);
  });

  const result: Partial<AdmSettingsState> = {
    DropDownsData: dropDownsData,
  };

  return result;
};

export default mapFromDropDownsDataDTO;
