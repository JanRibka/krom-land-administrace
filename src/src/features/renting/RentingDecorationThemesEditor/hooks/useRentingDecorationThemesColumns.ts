import { GridColDef } from "@mui/x-data-grid";

import { RentingDecorationTheme } from "entities/renting";
import { nameof } from "shared/nameof";

export function useRentingDecorationThemesColumns() {
  const columns: GridColDef[] = [
    {
      field: nameof<RentingDecorationTheme>("name"),
      headerName: "Název tématu",
      flex: 1,
      editable: true,
    },
    {
      field: nameof<RentingDecorationTheme>("code"),
      headerName: "Kód",
      width: 150,
      editable: true,
    },
    {
      field: nameof<RentingDecorationTheme>("isActive"),
      headerName: "Aktivní",
      type: "boolean",
      width: 100,
      editable: true,
    },
    {
      field: nameof<RentingDecorationTheme>("price"),
      headerName: "Cena",
      type: "number",
      width: 120,
      editable: true,
    },
    {
      field: nameof<RentingDecorationTheme>("remark"),
      headerName: "Poznámka",
      type: "string",
      flex: 2,
      minWidth: 200,
      editable: true,
    },
  ];

  return { columns };
};
