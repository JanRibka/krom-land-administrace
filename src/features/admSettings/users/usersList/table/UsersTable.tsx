import UserModel from 'features/admSettings/models/UserModel';
import { mapFromUsersDTO } from 'features/admSettings/save/mapFromUsersDTO';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import AppNotification from 'shared/components/notification/AppNotification';
import { usersGridName } from 'shared/constants/gridNames';
import { useRequest } from 'shared/dataAccess/useRequest';
import JsonResulObjectDataDTO from 'shared/DTOs/JsonResulObjectDataDTO';
import UserDTO from 'shared/DTOs/UserDTO';
import { toAppDateFormat } from 'shared/helpers/dateTimeHelpers';
import { selectAdmSettings } from 'shared/infrastructure/store/admSettings/admSettingsSlice';
import { useAdmSettingsSlice } from 'shared/infrastructure/store/admSettings/useAdmSettingsSlice';
import {
    selectAuthentication
} from 'shared/infrastructure/store/authentication/authenticationSlice';
import { nameof } from 'shared/nameof';
import * as XLSX from 'xlsx';

import EditIcon from '@mui/icons-material/Edit';
import { ButtonProps } from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/system/Box';
import {
    csCZ, DataGrid, GridActionsCellItem, GridColDef, GridExportMenuItemProps,
    gridFilteredSortedRowIdsSelector, GridPrintExportMenuItem, GridRowId, GridRowParams,
    GridToolbarColumnsButton, GridToolbarContainer, GridToolbarContainerProps,
    GridToolbarDensitySelector, GridToolbarExportContainer, GridToolbarFilterButton,
    gridVisibleColumnFieldsSelector, useGridApiRef
} from '@mui/x-data-grid';
import { GridInitialStateCommunity } from '@mui/x-data-grid/models/gridStateCommunity';

import EditUserDialog from './editUserDIalog/EditUserDialog';
import UsersTableStyled from './styledComponents/UsersTableStyled';

const UsersTable = () => {
  // References
  const refApi = useGridApiRef();

  // State
  const [dialogOpenData, setDialogOpenData] = useState<{
    id: number;
    open: boolean;
  }>({ id: 0, open: false });

  // Constants
  const initialState: GridInitialStateCommunity = {
    pagination: { paginationModel: { pageSize: 5 } },
  };
  const gridSettingsName = usersGridName;
  const gridInitialState = JSON.parse(
    localStorage.getItem(gridSettingsName) ?? JSON.stringify(initialState)
  );

  // Store
  const admSettings = useSelector(selectAdmSettings);
  const authentication = useSelector(selectAuthentication);

  // Constants
  const { handleAdmSettingsUpdate } = useAdmSettingsSlice();

  // Other

  /**
   * Get data
   */
  const { isLoading } = useRequest<JsonResulObjectDataDTO<UserDTO[]>>(
    {
      url: (process.env.REACT_APP_API_URL ?? "") + "AdmSettingsController.php",
      params: new URLSearchParams({
        function: "getUsers",
        idLoggedUser: authentication.UserId.toString(),
      }),
    },
    {
      Success: false,
      ErrMsg: "",
      Data: [],
    },
    [admSettings._usersLoaded],
    {
      apply: true,
      condition: () =>
        admSettings._usersLoaded === false && !!authentication.UserName,
    },
    (data) => {
      const dataType = typeof data;

      if (dataType === "string") {
        AppNotification("Chyba", String(data), "danger");
      } else {
        if (data.Success) {
          handleAdmSettingsUpdate(mapFromUsersDTO(data?.Data));
        } else {
          AppNotification("Chyba", data.ErrMsg ?? "", "danger");
        }
      }
    }
  );

  // ColumnDefinition
  const columns: GridColDef<any>[] = [
    {
      field: "actions",
      type: "actions",
      width: 50,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          icon={<EditIcon color='secondary' titleAccess='Editovat uživatele' />}
          label='Editovat uživatele'
          onClick={() => handleOnClickEditUser(params.id)}
        />,
      ],
    },
    {
      headerName: "Uživatelské jméno",
      field: nameof<UserModel>("UserName"),
      width: 250,
      type: "string",
      editable: false,
      sortable: true,
      resizable: true,
    },
    {
      headerName: "Datum vytvoření",
      field: nameof<UserModel>("DateCreated"),
      width: 160,
      type: "string",
      editable: false,
      sortable: true,
      resizable: true,
      valueGetter: (params) => {
        return toAppDateFormat(params.value);
      },
    },
    {
      headerName: "Poslední přihlášení",
      field: nameof<UserModel>("LastLogin"),
      width: 160,
      type: "string",
      editable: false,
      sortable: true,
      resizable: true,
      valueGetter: (params) => {
        return toAppDateFormat(params.value);
      },
    },
    {
      headerName: "Poslední pokus o přihlášení",
      field: nameof<UserModel>("LastLoginAttempt"),
      width: 200,
      type: "string",
      editable: false,
      sortable: true,
      resizable: true,
      valueGetter: (params) => {
        return toAppDateFormat(params.value);
      },
    },
    {
      headerName: "Počet přihlášení",
      field: nameof<UserModel>("LoginCount"),
      width: 150,
      type: "number",
      editable: false,
      sortable: true,
      resizable: true,
    },
    {
      headerName: "Počet pokusů o přihlášení",
      field: nameof<UserModel>("LoginAttemptCount"),
      width: 200,
      type: "number",
      editable: false,
      sortable: true,
      resizable: true,
    },
    {
      headerName: "Role",
      field: nameof<UserModel>("UserRoleName"),
      width: 170,
      minWidth: 170,
      flex: 1,
      type: "string",
      editable: false,
      sortable: true,
      resizable: true,
    },
  ];

  const handleOnClickEditUser = (rowId: GridRowId) => {
    setDialogOpenData({ id: rowId as number, open: true });
  };

  const handleOnStateChange = () => {
    const newState: GridInitialStateCommunity = refApi.current.exportState();

    localStorage.setItem(gridSettingsName, JSON.stringify(newState));
  };

  const getDataForXlsx = () => {
    const visibleColumnFields = gridVisibleColumnFieldsSelector(refApi);
    const filteredSortedRowIds = gridFilteredSortedRowIdsSelector(refApi);
    let data: string[][] = [];

    const columnHeaders = visibleColumnFields.map((column) => {
      return (
        refApi.current.getColumnHeaderParams(column).colDef.headerName ?? ""
      );
    });

    data.push(columnHeaders);

    filteredSortedRowIds.forEach((id) => {
      const column = visibleColumnFields.map((field) => {
        return refApi.current.getCellParams(id, field).value as string;
      });

      data.push(column);
    });

    return data;
  };

  const createXlsxFile = (data: string[][]) => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(data);

    XLSX.utils.book_append_sheet(workbook, worksheet, "Uživatelé");

    return workbook;
  };

  const exportBlob = (blob: Blob, filename: string) => {
    // Save the blob in a json file
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();

    setTimeout(() => {
      URL.revokeObjectURL(url);
    });
  };

  const XlsxExportMenuItem = (props: GridExportMenuItemProps<{}>) => {
    const { hideMenu } = props;

    return (
      <MenuItem
        onClick={() => {
          const dataForXlsx = getDataForXlsx();
          const workbook = createXlsxFile(dataForXlsx);
          const blob = new Blob(
            [XLSX.write(workbook, { bookType: "xlsx", type: "array" })],
            {
              type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            }
          );
          exportBlob(blob, "Uživatelé.xlsx");

          // Hide the export menu after the export
          hideMenu?.();
        }}
      >
        Stáhnout jako XLSX
      </MenuItem>
    );
  };

  const CustomExportButton = (props: ButtonProps) => {
    return (
      <GridToolbarExportContainer {...props}>
        <XlsxExportMenuItem />
        <GridPrintExportMenuItem />
      </GridToolbarExportContainer>
    );
  };

  const CustomToolbar = (props: GridToolbarContainerProps) => {
    return (
      <GridToolbarContainer {...props}>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <CustomExportButton />
      </GridToolbarContainer>
    );
  };

  return (
    <>
      <UsersTableStyled>
        <Box className='grid-wrapper'>
          <DataGrid
            apiRef={refApi}
            columns={columns}
            rows={admSettings.Users}
            getRowId={(row) => row.Id}
            loading={isLoading}
            localeText={csCZ.components.MuiDataGrid.defaultProps.localeText}
            slots={{ toolbar: CustomToolbar }}
            initialState={
              Object.keys(gridInitialState).length > 0
                ? gridInitialState
                : undefined
            }
            pageSizeOptions={[5, 10, 15]}
            onStateChange={handleOnStateChange}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
            }
          />
        </Box>
      </UsersTableStyled>
      <EditUserDialog
        open={dialogOpenData.open}
        setOpen={() => {
          setDialogOpenData({ id: 0, open: false });
        }}
        id={dialogOpenData.id}
      />
    </>
  );
};

export default UsersTable;
