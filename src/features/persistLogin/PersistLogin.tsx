import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import useRefreshToken from "shared/customHooks/useRefreshToken";
import { selectAuthentication } from "shared/infrastructure/store/authentication/authenticationSlice";

import Loading from "./loading/Loading";

const PersistLogin = () => {
  // State
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Constants
  const refresh = useRefreshToken();
  const authentication = useSelector(selectAuthentication);

  // Other
  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !authentication.AccessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => {
      isMounted = false;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!authentication.Persist ? (
        <Outlet />
      ) : isLoading ? (
        <Loading />
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
