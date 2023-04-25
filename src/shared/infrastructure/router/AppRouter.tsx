import Layout from "features/layout/Layout";
import LayoutLogin from "features/layoutLogin/LayoutLogin";
import DashboardPage from "features/pages/DashboardPage";
import LoginPage from "features/pages/LoginPage";
import ActionsPage from "features/pages/webParts/ActionsPage";
import ContactPage from "features/pages/webParts/ContactPage";
import GalleryPage from "features/pages/webParts/GalleryPage";
import GdprPage from "features/pages/webParts/GdprPage";
import HomePage from "features/pages/webParts/HomePage";
import TermsOfConditionsPage from "features/pages/webParts/TermsOfConditionsPage";
import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import RequireAuth from "shared/components/requireAuth/RequireAuth";
import usePrevious from "shared/customHooks/usePrevious/usePrevious";
import { UserRoleEnum } from "shared/enums/UserRoleEnum";

import { AppRoute } from "./appRoutes";

const AppRouter = () => {
  // Constants
  const { pathname } = useLocation();
  const location = useLocation();
  let previousRoute = usePrevious<string | undefined>(pathname);

  // Change route detection
  useEffect(() => {
    if (pathname !== AppRoute.Login) {
      changeMenuActiveButton();
      scrollToTop();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const changeMenuActiveButton = () => {
    // Main menu
    const navLinksWrapper = document.getElementById("nav-links-wrapper");

    if (!!navLinksWrapper) {
      const liCollection = navLinksWrapper?.getElementsByTagName("li");
      const lis = Array.prototype.slice.call(liCollection);

      lis?.forEach((item) => {
        const newItem = item as HTMLLIElement;

        if (newItem.dataset.route === pathname) {
          newItem.classList.add("active");
        } else {
          newItem.classList.remove("active");
        }
      });
    }
  };

  const scrollToTop = () => {
    if (!!previousRoute) window.scrollTo(0, 0);
  };

  return (
    <Routes>
      {/* Public routes */}
      <Route
        path={AppRoute.Base}
        element={
          <Navigate to={AppRoute.Login} state={{ from: location }} replace />
        }
      />
      <Route path={AppRoute.Login} element={<LayoutLogin />}>
        <Route path={AppRoute.Login} element={<LoginPage />} />
      </Route>

      {/* Protected routes */}
      <Route path={AppRoute.Base} element={<Layout />}>
        <Route element={<RequireAuth allowedRoles={[UserRoleEnum.ADMIN]} />}>
          <Route path={AppRoute.Dashboard} element={<DashboardPage />} />
        </Route>
        <Route
          element={
            <RequireAuth
              allowedRoles={[
                UserRoleEnum.ADMIN,
                UserRoleEnum.EDITOR,
                UserRoleEnum.USER,
              ]}
            />
          }
        >
          <Route path={AppRoute.Home} element={<HomePage />} />
          <Route path={AppRoute.Actions} element={<ActionsPage />} />
          <Route path={AppRoute.Gallery} element={<GalleryPage />} />
          <Route path={AppRoute.Contact} element={<ContactPage />} />
          <Route path={AppRoute.Gdpr} element={<GdprPage />} />
          <Route
            path={AppRoute.TermsOfConditions}
            element={<TermsOfConditionsPage />}
          />
        </Route>
      </Route>

      {/* Not found page */}
      <Route path='*' element={<div>NotFound</div>}></Route>
    </Routes>
  );
};

export default AppRouter;
