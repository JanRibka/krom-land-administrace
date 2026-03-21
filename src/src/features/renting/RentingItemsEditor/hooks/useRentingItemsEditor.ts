import { RentingItem, useRentingSlice } from "entities/renting";

import { useRentingItemsColumns } from "./useRentingItemsColumns";

export function useRentingItemsEditor() {
  const { rentingUpdate } = useRentingSlice();
  const { columns } = useRentingItemsColumns();

  const handleOnUpdate = (rows: RentingItem[]) => {
    rentingUpdate({ items: rows });
  };

  const getNewRow = (): RentingItem => ({
    idRentingItem: 0,
    name: "",
    code: "",
    isActive: true,
  });

  return {
    columns,
    handleOnUpdate,
    getNewRow,
  };
};
