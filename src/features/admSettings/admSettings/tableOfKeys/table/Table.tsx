import TableOfKeysModel from "shared/models/TableOfKeysModel";
import { nameof } from "shared/nameof";

import Box from "@mui/material/Box";
import { csCZ, GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid/DataGrid";

import TableStyled from "./TableStyled";

interface IProps {
  isLoading: boolean;
  groupKey: string;
  data: TableOfKeysModel[] | undefined;
}

const Table = (props: IProps) => {
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
      editable: false,
    },
    {
      headerName: "Hodnota",
      field: nameof<TableOfKeysModel>("Value"),
      width: 100,
      type: "string",
      editable: false,
    },
    {
      headerName: "Povoleno",
      field: nameof<TableOfKeysModel>("Enabled"),
      width: 100,
      type: "boolean",
      editable: false,
    },
  ];

  return (
    <TableStyled>
      <Box className="grid-wrapper">
        <DataGrid
          rows={props.data ?? []}
          columns={columns}
          getRowId={(row) => row.Id}
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
        />
      </Box>
    </TableStyled>
  );
};

export default Table;
