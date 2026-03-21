import CancelIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import {
  GridActionsCellItem,
  GridColDef,
  GridRowModes,
} from "@mui/x-data-grid";

import { IAppDataGridHandlers } from "../types/IAppDataGridHandlers";

export function useAppDataGridColumns(handlers: IAppDataGridHandlers) {
  const {
    handleEditClick,
    handleSaveClick,
    handleDeleteClick,
    handleCancelClick,
    rowModesModel,
    rows,
  } = handlers;

  const actionColumn: GridColDef = {
    field: "actions",
    type: "actions",
    headerName: "Akce",
    width: 100,
    cellClassName: "actions",
    getActions: ({ id }) => {
      const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

      if (isInEditMode) {
        return [
          <GridActionsCellItem
            key="save"
            icon={<SaveIcon />}
            label="Uložit"
            sx={{ color: "primary" }}
            onClick={handleSaveClick(id)}
          />,
          <GridActionsCellItem
            key="cancel"
            icon={<CancelIcon />}
            label="Zrušit"
            onClick={handleCancelClick(id)}
            color="inherit"
          />,
        ];
      }

      return [
        <GridActionsCellItem
          key="edit"
          icon={<EditIcon />}
          label="Editovat"
          onClick={handleEditClick(id)}
          color="inherit"
        />,
        <GridActionsCellItem
          key="delete"
          icon={<DeleteIcon />}
          label="Smazat"
          onClick={handleDeleteClick(id)}
          color="inherit"
          disabled={rows.length <= 1}
        />,
      ];
    },
  };

  return { actionColumn };
}
