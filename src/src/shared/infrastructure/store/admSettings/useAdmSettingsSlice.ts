import { GridRowDataModel } from "features/admSettings/admSettings/tableOfKeys/table/Table";
import { useDispatch } from "react-redux";

import { actions, AdmSettingsState } from "./admSettingsSlice";

export const useAdmSettingsSlice = () => {
  const dispatch = useDispatch();

  const handleAdmSettingsUpdate = (admSettings: Partial<AdmSettingsState>) => {
    dispatch(actions.admSettingsUpdate(admSettings));
  };

  const handleTableOfKeysUpdate = (data: GridRowDataModel[]) => {
    dispatch(actions.tableOfKeyUpdate(data));
  };

  return {
    handleAdmSettingsUpdate,
    handleTableOfKeysUpdate,
  };
};
