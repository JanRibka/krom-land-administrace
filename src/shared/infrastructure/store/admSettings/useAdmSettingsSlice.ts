import { useDispatch } from "react-redux";

import { actions, AdmSettingsState } from "./admSettingsSlice";

export const useAdmSettingsSlice = () => {
  const dispatch = useDispatch();

  const handleAdmSettingsUpdate = (admSettings: Partial<AdmSettingsState>) => {
    dispatch(actions.admSettingsUpdate(admSettings));
  };

  return {
    handleAdmSettingsUpdate,
  };
};
