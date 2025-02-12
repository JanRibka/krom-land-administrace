import Layout from "features/layout/Layout";
import LayoutLogin from "features/layoutLogin/LayoutLogin";
import AdmSettingsPage from "features/pages/admSettings/AdmSettingsPage";
import UsersPage from "features/pages/admSettings/UsersPage";
import DashboardPage from "features/pages/DashboardPage";
import LoginPage from "features/pages/LoginPage";
import NotFoundPage from "features/pages/NotFoundPage";
import PersistLoginPage from "features/pages/PersistLoginPage";
import UnauthorizedPage from "features/pages/UnauthorizedPage";
import ActionsPage from "features/pages/webParts/ActionsPage";
import ContactPage from "features/pages/webParts/ContactPage";
import GalleryPage from "features/pages/webParts/GalleryPage";
import GdprPage from "features/pages/webParts/GdprPage";
import HomePage from "features/pages/webParts/HomePage";
import TermsOfConditionsPage from "features/pages/webParts/TermsOfConditionsPage";
import WebLogosPage from "features/pages/webSettings/WebLogosPage";
import WebSettingsPage from "features/pages/webSettings/WebSettingsPage";
import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import RequireAuth from "shared/components/requireAuth/RequireAuth";
import usePrevious from "shared/customHooks/usePrevious";
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
          <Navigate
            to={AppRoute.Dashboard}
            state={{ from: location }}
            replace
          />
        }
      />
      <Route path={AppRoute.Login} element={<LayoutLogin />}>
        <Route path={AppRoute.Login} element={<LoginPage />} />
      </Route>
      {/* Protected routes */}
      <Route element={<PersistLoginPage />}>
        <Route path={AppRoute.Base} element={<Layout />}>
          {/* Dashboard */}
          <Route
            element={
              <RequireAuth
                allowedRoles={[UserRoleEnum.ADMIN, UserRoleEnum.EDITOR]}
              />
            }
          >
            <Route path={AppRoute.Dashboard} element={<DashboardPage />} />
          </Route>

          {/* Web parts */}
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

          {/* Web settings */}
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
            <Route path={AppRoute.WebSettings} element={<WebSettingsPage />} />
            <Route path={AppRoute.Logos} element={<WebLogosPage />} />
          </Route>

          {/* Administrations settings */}
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
            <Route path={AppRoute.AdmSettings} element={<AdmSettingsPage />} />
            <Route path={AppRoute.Users} element={<UsersPage />} />
          </Route>

          {/* Unathorized */}
          <Route path={AppRoute.Unauthorized} element={<UnauthorizedPage />} />

          {/* Not found page */}
          <Route path="*" element={<NotFoundPage />}></Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;
