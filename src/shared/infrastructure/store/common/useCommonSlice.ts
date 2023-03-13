import { useDispatch } from "react-redux";

import { actions, CommonState } from "./commonSlice";

export const useCommonSlice = () => {
  const dispatch = useDispatch();

  const handleCommonUpdate = (commonData: Partial<CommonState>) => {
    dispatch(actions.commonUpdate(commonData));
  };

  return {
    handleCommonUpdate,
  };
};
