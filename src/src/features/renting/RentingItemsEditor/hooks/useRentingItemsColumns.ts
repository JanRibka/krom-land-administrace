import { GridColDef } from "@mui/x-data-grid";

import { RentingItem } from "entities/renting";
import { nameof } from "shared/nameof";

export function useRentingItemsColumns() {
  const columns: GridColDef[] = [
    {
      field: nameof<RentingItem>("name"),
      headerName: "Název",
      flex: 1,
      editable: true,
    },
    {
      field: nameof<RentingItem>("code"),
      headerName: "Kód",
      width: 150,
      editable: true,
    },
    {
      field: nameof<RentingItem>("isActive"),
      headerName: "Aktivní",
      type: "boolean",
      width: 100,
      editable: true,
    },
    {
      field: nameof<RentingItem>("price"),
      headerName: "Cena",
      type: "number",
      width: 120,
      editable: true,
    },
    {
      field: nameof<RentingItem>("remark"),
      headerName: "Poznámka",
      type: "string",
      flex: 2,
      minWidth: 200,
      editable: true,
    },
  ];

  return { columns };
};
