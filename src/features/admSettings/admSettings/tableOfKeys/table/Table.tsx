import { useState } from "react";
import TableOfKeysModel from "shared/models/TableOfKeysModel";
import { nameof } from "shared/nameof";
import { v4 as uuidv4 } from "uuid";

import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
  csCZ,
  GridActionsCellItem,
  GridColDef,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModes,
  GridRowModesModel,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid/DataGrid";

import TableStyled from "./TableStyled";

interface IProps {
  isLoading: boolean;
  groupKey: string;
  data: TableOfKeysModel[] | undefined;
}

interface GridRowDataModel extends TableOfKeysModel {
  Uuid: string;
  IsNew: boolean;
}

const Table = (props: IProps) => {
  const [rows, setRows] = useState<GridRowDataModel[]>(
    props.data?.map((item) => {
      return {
        ...item,
        Uuid: uuidv4(),
        IsNew: false,
      } as GridRowDataModel;
    }) ?? []
  );
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.Uuid !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
    const editedRow = rows.find((row) => row.Id === id);
    if (editedRow!.IsNew) {
      setRows(rows.filter((row) => row.Id !== id));
    }
  };

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const processRowUpdate = (newRow: GridRowDataModel) => {
    const updatedRow = {
      ...newRow,
      IsNew: false,
    };

    setRows(rows.map((row) => (row.Id === newRow.Id ? updatedRow : row)));

    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  // Columns definition
  const columns: GridColDef<any>[] = [
    {
      headerName: "Klíč",
      field: nameof<TableOfKeysModel>("Key"),
      width: 150,
      type: "string",
      editable: false,
    },
    {
      headerName: "Popisek",
      field: nameof<TableOfKeysModel>("Name"),
      width: 250,
      flex: 1,
      type: "string",
      editable: true,
    },
    {
      headerName: "Hodnota",
      field: nameof<TableOfKeysModel>("Value"),
      width: 100,
      type: "number",
      editable: true,
    },
    {
      headerName: "Povoleno",
      field: nameof<TableOfKeysModel>("Enabled"),
      width: 100,
      type: "boolean",
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Uložit"
              sx={{
                color: "primary",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Zrušit"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Editovat"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Smazat"
            onClick={handleDeleteClick(id)}
            color="inherit"
            disabled={rows.length <= 1}
          />,
        ];
      },
    },
  ];

  const EditToolbar = () => {
    const handleClick = () => {
      const uuid = uuidv4();

      setRows((oldRows) => [
        ...oldRows,
        {
          Uuid: uuid,
          Id: null,
          GroupKey: oldRows?.[0]?.GroupKey ?? "",
          Key: "",
          Name: "",
          Value: 0,
          Enabled: true,
          IsNew: true,
        } as GridRowDataModel,
      ]);

      setRowModesModel((oldModel) => ({
        ...oldModel,
        [uuid]: {
          mode: GridRowModes.Edit,
          fieldToFocus: nameof<TableOfKeysModel>("Name"),
        },
      }));
    };

    return (
      <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
          Přidat záznam
        </Button>
      </GridToolbarContainer>
    );
  };

  return (
    <TableStyled>
      <Box className="grid-wrapper">
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row: GridRowDataModel) => row.Uuid}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          localeText={csCZ.components.MuiDataGrid.defaultProps.localeText}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
          }
          initialState={{
            pagination: {
              paginationModel: {
                page: 1,
                pageSize: 5,
              },
            },
          }}
          slots={{ toolbar: EditToolbar }}
        />
      </Box>
    </TableStyled>
  );
};

export default Table;
