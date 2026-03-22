import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { csCZ, GridToolbarContainer } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid/DataGrid";

import AppDataGridStyled from "./components/AppDataGridStyled";
import { useAppDataGrid } from "./hooks/useAppDataGrid";
import { useAppDataGridColumns } from "./hooks/useAppDataGridColumns";
import { AppDataGridProps } from "./types/AppDataGridProps";

const EditToolbar = ({ handleAddRow }: { handleAddRow: () => void }) => {
  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleAddRow}>
        Přidat záznam
      </Button>
    </GridToolbarContainer>
  );
};

const AppDataGrid = <T extends Record<string, any>>(
  props: AppDataGridProps<T>,
) => {
  const {
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
  } = useAppDataGrid(props);

  const { actionColumn } = useAppDataGridColumns({
    handleEditClick,
    handleSaveClick,
    handleDeleteClick,
    handleCancelClick,
    rowModesModel,
    rows,
  });

  return (
    <AppDataGridStyled>
      <Box className="grid-wrapper">
        <DataGrid
          rows={rows}
          columns={[...props.columns, actionColumn]}
          getRowId={getRowId}
          editMode="row"
          loading={props.loading}
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
                page: 0,
                pageSize: 10,
              },
            },
          }}
          slots={{
            toolbar: EditToolbar,
          }}
          slotProps={{
            toolbar: { handleAddRow },
          }}
        />
      </Box>
    </AppDataGridStyled>
  );
};

export default AppDataGrid;
