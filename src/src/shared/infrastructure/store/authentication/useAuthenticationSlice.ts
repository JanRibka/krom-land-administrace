import { useDispatch } from 'react-redux';

import { actions, AuthenticationState } from './authenticationSlice';

export const useAuthenticationSlice = () => {
  const dispatch = useDispatch();

  const handleAuthenticationUpdate = (
    authentication: Partial<AuthenticationState>
  ) => {
    dispatch(actions.authenticationUpdate(authentication));
  };

  const handleAuthenticationReset = () => {
    dispatch(actions.authenticationReset());
  };

  return {
    handleAuthenticationUpdate,
    handleAuthenticationReset,
  };
};
