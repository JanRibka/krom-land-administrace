import HomeModel from "features/home/models/HomeModel";
import { useDispatch } from "react-redux";

import { actions, WebPartsState } from "./webPartsSlice";

export const useWebPartsSlice = () => {
  const dispatch = useDispatch();

  const handleWebPartsUpdate = (webParts: Partial<WebPartsState>) => {
    dispatch(actions.webPartsUpdate(webParts));
  };

  const handleHomeUpdate = (home: Partial<HomeModel>) => {
    dispatch(actions.homeUpdate(home));
  };

  return {
    handleWebPartsUpdate,
    handleHomeUpdate,
  };
};
