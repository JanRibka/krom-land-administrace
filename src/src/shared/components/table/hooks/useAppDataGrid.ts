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
  // Pouze nové (dosud neuložené) řádky jsou v lokálním state
  const [newRows, setNewRows] = useState<AppDataGridRowModel[]>([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  // Sestaví finální pole řádků: existující data ze store + nové neuložené řádky
  const storeRows: AppDataGridRowModel[] = (props.data ?? []).map((item) => ({
    ...item,
    _tempId: undefined,
    isNew: false,
  }));
  const rows: AppDataGridRowModel[] = [...storeRows, ...newRows];

  // Vrátí ID řádku — pro nové řádky _tempId, pro existující idField
  const getRowId = useCallback(
    (row: AppDataGridRowModel): GridRowId => {
      return row._tempId ?? row[props.idField as string];
    },
    [props.idField],
  );

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
      // Zkusit smazat z nových řádků
      const isNew = newRows.some((row) => row._tempId === id);
      if (isNew) {
        setNewRows((prev) => prev.filter((row) => row._tempId !== id));
      } else {
        // Smazat z store dat a odeslat do store
        const updated = (props.data ?? []).filter(
          (item) => item[props.idField as string] !== id,
        );
        props.onUpdate(updated);
      }
    },
    [newRows, props],
  );

  const handleCancelClick = useCallback(
    (id: GridRowId) => () => {
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      });
      // Pokud je to nový řádek, odstraníme ho
      setNewRows((prev) => prev.filter((row) => row._tempId !== id));
    },
    [rowModesModel],
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

    if (newRow._tempId) {
      // Nový řádek — přesuneme ze newRows do store
      const { _tempId, isNew, ...rowData } = updatedRow;
      setNewRows((prev) => prev.filter((row) => row._tempId !== newRow._tempId));
      props.onUpdate([...(props.data ?? []), rowData as unknown as T]);
    } else {
      // Existující řádek — aktualizujeme v store
      const updated = (props.data ?? []).map((item) =>
        item[props.idField as string] === newRow[props.idField as string]
          ? ({ ...item, ...newRow } as T)
          : item,
      );
      props.onUpdate(updated);
    }

    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleAddRow = () => {
    const tempId = uuidv4();
    const newRow: AppDataGridRowModel = {
      ...props.getNewRow(),
      _tempId: tempId,
      isNew: true,
    };

    setNewRows((prev) => [...prev, newRow]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [tempId]: { mode: GridRowModes.Edit },
    }));
  };

  return {
    rows,
    getRowId,
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
