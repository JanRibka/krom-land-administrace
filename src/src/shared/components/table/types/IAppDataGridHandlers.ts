import { GridRowId } from "@mui/x-data-grid/models";

import { AppDataGridRowModel } from "./AppDataGridRowModel";

export interface IAppDataGridHandlers {
  handleEditClick: (id: GridRowId) => () => void;
  handleSaveClick: (id: GridRowId) => () => void;
  handleDeleteClick: (id: GridRowId) => () => void;
  handleCancelClick: (id: GridRowId) => () => void;
  rows: AppDataGridRowModel[];
  rowModesModel: any; // GridRowModesModel
}
