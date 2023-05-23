import WebLogosDTO from "shared/DTOs/WebLogosDTO";

import WebLogosModel from "../models/WebLogosModel";

export const mapFromWebLogosDTO = (webLogosDTO?: WebLogosDTO | null) => {
  const result: WebLogosModel = {
    Id: webLogosDTO?.Id ?? 0,
    HeaderLogo: webLogosDTO?.HeaderLogo ?? null,

    _dataLoaded: true,
  };

  return result;
};
