import { GridColDef } from "@mui/x-data-grid";

export interface AppDataGridProps<T> {
  data: T[] | undefined;
  columns: GridColDef[];
  loading?: boolean;
  onUpdate: (rows: T[]) => void;
  getNewRow: () => T;
  idField: keyof T;
}
