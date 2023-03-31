import { mapFromWebPartsDTO } from "features/webParts/save/mapFromWebPartsDTO";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import AppNotification from "shared/components/notification/AppNotification";
import { useRequest } from "shared/dataAccess/useRequest";
import JsonResulObjectDTO from "shared/DTOs/JsonResulObjectDataDTO";
import KromLandDTO from "shared/DTOs/KromLandDTO";
import WebPartsDTO from "shared/DTOs/WebPartsDTO";
import { selectCommon } from "shared/infrastructure/store/common/commonSlice";
import { useCommonSlice } from "shared/infrastructure/store/common/useCommonSlice";
import { useWebPartsSlice } from "shared/infrastructure/store/webParts/useWebPartsSlice";

import Footer from "./footer/Footer";
import NavBar from "./navBar/NavBar";
import SideBar from "./sideBar/SideBar";
import LayoutStyled from "./styledComponents/LayoutStyled";

interface IProps {
  children: ReactNode;
}

const Layout = (props: IProps) => {
  // Store
  const common = useSelector(selectCommon);

  // Constants
  const sideBarWidth: number = 240;
  const { handleWebPartsUpdate } = useWebPartsSlice();
  const { handleCommonUpdate } = useCommonSlice();

  /**
   * Get data for web
   */
  useRequest<JsonResulObjectDTO<KromLandDTO>>(
    {
      url: process.env.REACT_APP_API_URL ?? "",
      params: new URLSearchParams({
        action: "webcontent",
        type: "getall",
      }),
    },
    {
      Success: false,
      ErrMsg: "",
      Data: {
        WebParts: new WebPartsDTO(),
      },
    },
    [],
    {
      apply: true,
      condition: () => common._dataLoaded === false,
    },
    (data) => {
      const dataType = typeof data;
      console.log(data);
      if (dataType === "string") {
        AppNotification("Chyba", String(data), "danger");
      } else {
        if (data.Success) {
          handleWebPartsUpdate(mapFromWebPartsDTO(data?.Data?.WebParts));
          handleCommonUpdate({ _dataLoaded: true });
        } else {
          AppNotification("Chyba", data.ErrMsg ?? "", "danger");
        }
      }
    }
  );

  return (
    <LayoutStyled>
      <NavBar />
      <SideBar width={sideBarWidth} />
      {props.children}
      <Footer paddingLeft={sideBarWidth + 32} />
    </LayoutStyled>
  );
};

export default Layout;
