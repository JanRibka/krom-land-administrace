import WebLogosDTO from "shared/DTOs/WebLogosDTO";
import ImageModel from "shared/models/ImageModel";

import WebLogosModel from "../models/WebLogosModel";

export const mapFromWebLogosDTO = (webLogosDTO?: WebLogosDTO | null) => {
  const result: WebLogosModel = {
    Id: webLogosDTO?.Id ?? 0,
    HeaderLogo: !!webLogosDTO?.HeaderLogo
      ? JSON.parse(webLogosDTO?.HeaderLogo)
      : new ImageModel(),

    _dataLoaded: true,
  };

  return result;
};
