import { Navigate, Outlet, useLocation } from "react-router-dom";
import { store } from "shared/infrastructure/store/store";

interface IProps {
  allowedRoles: number[];
}

const RequireAuth = (props: IProps) => {
  // Store
  const _store = store.getState();
  const authentication = _store.authentication;
  console.log(authentication);
  // Constants
  const location = useLocation();

  return props.allowedRoles.includes(authentication.UserRole) ? (
    <Outlet />
  ) : !!authentication.UserName ? (
    <Navigate to='/admin/unauthorized' />
  ) : (
    <Navigate to='/admin/login' state={{ from: location }} replace />
  );
};

export default RequireAuth;
