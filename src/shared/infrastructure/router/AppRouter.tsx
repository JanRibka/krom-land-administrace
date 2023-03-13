import ActionsPage from "features/pages/ActionsPage";
import ContactPage from "features/pages/ContactPage";
import DashboardPage from "features/pages/DashboardPage";
import GalleryPage from "features/pages/GalleryPage";
import HomePage from "features/pages/HomePage";
import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import usePrevious from "shared/customHooks/usePrevious/usePrevious";

import { AppRoute } from "./appRoutes";

const AppRouter = () => {
  // Constants
  const { pathname } = useLocation();
  let previousRoute = usePrevious<string | undefined>(pathname);

  // Change route detection
  useEffect(() => {
    changeMenuActiveButton();
    scrollToTop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const changeMenuActiveButton = () => {
    // Main menu
    const navLinksWrapper = document.getElementById("nav-links-wrapper");
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
  };

  const scrollToTop = () => {
    if (!!previousRoute) window.scrollTo(0, 0);
  };

  return (
    <Routes>
      <Route path={AppRoute.Dashboard} element={<DashboardPage />} />
      <Route path={AppRoute.Home} element={<HomePage />} />
      <Route path={AppRoute.Actions} element={<ActionsPage />} />
      <Route path={AppRoute.Gallery} element={<GalleryPage />} />
      <Route path={AppRoute.Contact} element={<ContactPage />} />
    </Routes>
  );
};

export default AppRouter;
