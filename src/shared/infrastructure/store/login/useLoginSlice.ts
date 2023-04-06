import { useDispatch } from "react-redux";

import { actions, LoginState } from "./loginSlice";

export const useLoginSlice = () => {
  const dispatch = useDispatch();

  const handleLoginUpdate = (login: Partial<LoginState>) => {
    dispatch(actions.loginUpdate(login));
  };

  return {
    handleLoginUpdate,
  };
};
