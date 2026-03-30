import { useCallback, useMemo, useState } from "react";

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
  // Pouze nové (dosud nepotvrzené v gridu) řádky jsou v lokálním state
  const [newRows, setNewRows] = useState<AppDataGridRowModel[]>([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const idField = props.idField as string;

  // Sestaví finální pole řádků
  const rows: AppDataGridRowModel[] = useMemo(() => {
    const storeRows: AppDataGridRowModel[] = (props.data ?? []).map((item) => ({
      ...item,
      isNew: false,
    }));

    // Pouze nové řádky, které ještě nejsou v props.data (podle ID)
    const filteredNewRows = newRows.filter(
      (nr) => !storeRows.some((sr) => sr[idField] === nr[idField]),
    );

    return [...storeRows, ...filteredNewRows];
  }, [props.data, newRows, idField]);

  // Vrátí ID řádku
  const getRowId = useCallback(
    (row: AppDataGridRowModel): GridRowId => {
      return row[idField];
    },
    [idField],
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
      const isNew = newRows.some((row) => row[idField] === id);
      if (isNew) {
        setNewRows((prev) => prev.filter((row) => row[idField] !== id));
      } else {
        const updated = (props.data ?? []).filter((item) => item[idField] !== id);
        props.onUpdate(updated);
      }
    },
    [newRows, props, idField],
  );

  const handleCancelClick = useCallback(
    (id: GridRowId) => () => {
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      });
      setNewRows((prev) => prev.filter((row) => row[idField] !== id));
    },
    [rowModesModel, idField],
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

    // Zjistíme, jestli záznam už v props.data existuje
    const existsInStore = (props.data ?? []).some(
      (item) => item[idField] === newRow[idField],
    );

    if (existsInStore) {
      // Existující záznam — aktualizujeme v store
      const updated = (props.data ?? []).map((item) =>
        item[idField] === newRow[idField] ? ({ ...item, ...newRow } as T) : item,
      );
      props.onUpdate(updated);
    } else {
      // Zcela nový záznam — přidáme do store
      props.onUpdate([...(props.data ?? []), newRow as unknown as T]);
    }

    // Vymažeme z lokálního state nových řádků
    setNewRows((prev) => prev.filter((row) => row[idField] !== newRow[idField]));

    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleAddRow = () => {
    // Generování unikátního negativního ID
    const currentIds = rows.map((r) => r[idField] as number);
    const minId = Math.min(0, ...currentIds);
    const newId = minId - 1;

    const newRow: AppDataGridRowModel = {
      ...props.getNewRow(),
      [idField]: newId,
      isNew: true,
    };

    setNewRows((prev) => [...prev, newRow]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [newId]: { mode: GridRowModes.Edit },
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
