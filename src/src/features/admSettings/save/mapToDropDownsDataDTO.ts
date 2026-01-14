import { DropDownsDataType } from "shared/infrastructure/store/admSettings/admSettingsSlice";
import TableOfKeysModel from "shared/models/TableOfKeysModel";

const mapToDropDownsDataDTO = (dropDownsData: DropDownsDataType) => {
  const result: TableOfKeysModel[] = [];

  Object.keys(dropDownsData).forEach((key) => {
    result.push(...(dropDownsData[key] ?? []));
  });

  return result;
};

export default mapToDropDownsDataDTO;
