import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import usePrevious from "shared/customHooks/usePrevious/usePrevious";

import { Box } from "@mui/material";

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
    const navLinksWrapper = document.getElementById("nav-links-inner-wrapper");

    navLinksWrapper?.childNodes.forEach((item) => {
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
      <Route
        path={AppRoute.Dashboard}
        element={<Box sx={{ flexGrow: 1, p: 3 }}>asdfasdf</Box>}
      />
    </Routes>
  );
};

export default AppRouter;
