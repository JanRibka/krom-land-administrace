import CiselnikDdlModel from "shared/models/CiselnikDdlModel";

import IAppSelectMenuItem from "./IAppSelectMenuItem";

export const mapFromCiselnikDdlModel = (
  data: CiselnikDdlModel[]
): IAppSelectMenuItem[] => {
  return data.map((val, i) => {
    return {
      label: val.nazev,
      value: val.kod,
    } as IAppSelectMenuItem;
  });
};
