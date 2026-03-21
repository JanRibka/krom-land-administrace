import { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import {
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModes,
  GridRowModesModel,
} from "@mui/x-data-grid";

import { AppDataGridProps } from "../types/AppDataGridProps";
import { AppDataGridRowModel } from "../types/AppDataGridRowModel";

export function useAppDataGrid<T extends Record<string, any>>(
  props: AppDataGridProps<T>,
) {
  const [rows, setRows] = useState<AppDataGridRowModel[]>(
    props.data?.map((item) => ({
      ...item,
      uuid: uuidv4(),
      isNew: false,
    })) ?? [],
  );
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const handleEditClick = useCallback(
    (id: GridRowId) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    },
    [rowModesModel],
  );

  const handleSaveClick = useCallback(
    (id: GridRowId) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    },
    [rowModesModel],
  );

  const handleDeleteClick = useCallback(
    (id: GridRowId) => () => {
      const newRows = rows.filter((row) => row.uuid !== id);
      setRows(newRows);
      props.onUpdate(newRows as unknown as T[]);
    },
    [rows, props],
  );

  const handleCancelClick = useCallback(
    (id: GridRowId) => () => {
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      });
      const editedRow = rows.find((row) => row.uuid === id);
      if (editedRow?.isNew) {
        setRows(rows.filter((row) => row.uuid !== id));
      }
    },
    [rowModesModel, rows],
  );

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event,
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const processRowUpdate = (newRow: AppDataGridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    const newRows = rows.map((row) =>
      row.uuid === newRow.uuid ? updatedRow : row,
    );

    setRows(newRows);
    props.onUpdate(newRows as unknown as T[]);

    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleAddRow = () => {
    const uuid = uuidv4();
    const newRow = {
      ...props.getNewRow(),
      uuid,
      isNew: true,
    };

    setRows((oldRows) => [...oldRows, newRow]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [uuid]: { mode: GridRowModes.Edit },
    }));
  };

  return {
    rows,
    rowModesModel,
    handleEditClick,
    handleSaveClick,
    handleDeleteClick,
    handleCancelClick,
    handleRowEditStop,
    processRowUpdate,
    handleRowModesModelChange,
    handleAddRow,
  };
}
