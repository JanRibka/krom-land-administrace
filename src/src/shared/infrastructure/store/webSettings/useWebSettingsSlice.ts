import WebLogosModel from "features/webSettings/webLogos/models/WebLogosModel";
import WebSettingsModel from "features/webSettings/webSettings/models/WebSettingsModel";
import { useDispatch } from "react-redux";

import { actions } from "./webSettingsSlice";

export const useWebSettingsSlice = () => {
  const dispatch = useDispatch();

  const handleWebSettingsUpdate = (webSettings: Partial<WebSettingsModel>) => {
    dispatch(actions.webSettingsUpdate(webSettings));
  };

  const handleLogosUpdate = (logos: Partial<WebLogosModel>) => {
    dispatch(actions.webLogosUpdate(logos));
  };

  return {
    handleWebSettingsUpdate,
    handleLogosUpdate,
  };
};
