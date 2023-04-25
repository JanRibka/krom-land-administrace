import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import {
    selectAuthentication
} from 'shared/infrastructure/store/authentication/authenticationSlice';

interface IProps {
  allowedRoles: number[];
}

const RequireAuth = (props: IProps) => {
  // Store
  const authentication = useSelector(selectAuthentication);

  // Constants
  const location = useLocation();

  return props.allowedRoles.includes(authentication.UserRole) ? (
    <Outlet />
  ) : authentication.UserName ? (
    <Navigate to='/unauthorized' />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
};

export default RequireAuth;
