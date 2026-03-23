import { RentingDecorationTheme, useRentingSlice } from "entities/renting";

import { useRentingDecorationThemesColumns } from "./useRentingDecorationThemesColumns";

export function useRentingDecorationThemesEditor() {
  const { rentingUpdate } = useRentingSlice();
  const { columns } = useRentingDecorationThemesColumns();

  const handleOnUpdate = (rows: RentingDecorationTheme[]) => {
    rentingUpdate({ decorationThemes: rows });
  };

  const getNewRow = (): RentingDecorationTheme => ({
    idRentingDecorationTheme: 0,
    name: "",
    code: "",
    isActive: true,
    price: 0,
    remark: "",
  });

  return {
    columns,
    handleOnUpdate,
    getNewRow,
  };
};
