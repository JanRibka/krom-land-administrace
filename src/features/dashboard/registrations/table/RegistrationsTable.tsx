import { mapFromRegistrationsDTO } from "features/dashboard/save/mapFromRegistrationsDTO";
import { useState } from "react";
import { useSelector } from "react-redux";
import AppNotification from "shared/components/notification/AppNotification";
import { registrationsGridName } from "shared/constants/gridNames";
import { useRequest } from "shared/dataAccess/useRequest";
import JsonResulObjectDataDTO from "shared/DTOs/JsonResulObjectDataDTO";
import RegistrationDTO from "shared/DTOs/RegistrationDTO";
import { toAppDateFormat } from "shared/helpers/dateTimeHelpers";
import { selectAuthentication } from "shared/infrastructure/store/authentication/authenticationSlice";
import { selectDashboard } from "shared/infrastructure/store/dashboard/dashboardSlice";
import { useDashboardSlice } from "shared/infrastructure/store/dashboard/useDashboardSlice";
import * as XLSX from "xlsx";

import EditIcon from "@mui/icons-material/Edit";
import { ButtonProps } from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/system/Box";
import {
  csCZ,
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridExportMenuItemProps,
  gridFilteredSortedRowIdsSelector,
  GridPrintExportMenuItem,
  GridRowId,
  GridRowParams,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarContainerProps,
  GridToolbarDensitySelector,
  GridToolbarExportContainer,
  GridToolbarFilterButton,
  gridVisibleColumnFieldsSelector,
  useGridApiRef,
} from "@mui/x-data-grid";
import { GridInitialStateCommunity } from "@mui/x-data-grid/models/gridStateCommunity";

import EditRegistrationDialog from "./editRegistrationDIalog/EditRegistrationDialog";
import RegistrationsTableStyled from "./styledComponents/RegistrationsTableStyled";
import TableFilterDate, {
  IGridSettingsDateFilter,
} from "./tableFilterDate/TableFilterDate";

const RegistrationsTable = () => {
  // References
  const refApi = useGridApiRef();

  // State
  const [dialogOpenData, setDialogOpenData] = useState<{
    id: number;
    open: boolean;
  }>({ id: 0, open: false });

  // Constants
  const initialState: GridInitialStateCommunity = {
    pagination: { paginationModel: { pageSize: 50 } },
  };
  const gridSettingsName = registrationsGridName;
  const gridInitialState = JSON.parse(
    localStorage.getItem(gridSettingsName) ?? JSON.stringify(initialState)
  );
  const gridSettingsDateFilterName = registrationsGridName + "-settings";
  const gridSettingsDateFilter = JSON.parse(
    localStorage.getItem(gridSettingsDateFilterName) ?? "{}"
  );
  const gridDateFilter: IGridSettingsDateFilter =
    Object.keys(gridSettingsDateFilter).length > 0
      ? (gridSettingsDateFilter as IGridSettingsDateFilter)
      : ({ from: null, to: null } as IGridSettingsDateFilter);
  const { handleDashboardUpdate } = useDashboardSlice();

  // Store
  const dashboard = useSelector(selectDashboard);
  const authentication = useSelector(selectAuthentication);

  // Other

  /**
   * Get data
   */
  const { isLoading } = useRequest<JsonResulObjectDataDTO<RegistrationDTO[]>>(
    {
      url: (process.env.REACT_APP_API_URL ?? "") + "DashboardController.php",
      params: new URLSearchParams({
        function: "getRegistrations",
        dateFrom: gridDateFilter.from?.toString() ?? "null",
        dateTo: gridDateFilter.to?.toString() ?? "null",
      }),
    },
    {
      Success: false,
      ErrMsg: "",
      Data: [],
    },
    [dashboard._registrationsLoaded],
    {
      apply: true,
      condition: () =>
        dashboard._registrationsLoaded === false && !!authentication.UserName,
    },
    (data) => {
      const dataType = typeof data;

      if (dataType === "string") {
        AppNotification("Chyba", String(data), "danger");
      } else {
        if (data.Success) {
          handleDashboardUpdate(mapFromRegistrationsDTO(data?.Data));
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
          icon={
            <EditIcon color="secondary" titleAccess="Editovat registraci" />
          }
          label="Editovat registraci"
          onClick={() => handleOnClickEditRegistration(params.id)}
        />,
      ],
    },
    {
      headerName: "Název akce",
      field: "action_name",
      width: 250,
      type: "string",
      editable: false,
      sortable: true,
      resizable: true,
    },
    {
      headerName: "Email",
      field: "user_email",
      width: 250,
      type: "string",
      editable: false,
      sortable: true,
      resizable: true,
    },
    {
      headerName: "Jméno dítěte",
      field: "child_name",
      width: 150,
      type: "string",
      editable: false,
      sortable: true,
      resizable: true,
    },
    {
      headerName: "Příjmení dítěte",
      field: "child_last_name",
      width: 150,
      type: "string",
      editable: false,
      sortable: true,
      resizable: true,
    },
    {
      headerName: "Datum narození dítěte",
      field: "child_birthday",
      width: 170,
      type: "string",
      editable: false,
      sortable: true,
      resizable: true,
    },
    {
      headerName: "Jméno ZZ",
      field: "first_representative_name",
      width: 150,
      type: "string",
      editable: false,
      sortable: true,
      resizable: true,
    },
    {
      headerName: "Příjmení ZZ",
      field: "first_representative_last_name",
      width: 150,
      type: "string",
      editable: false,
      sortable: true,
      resizable: true,
    },
    {
      headerName: "Telefon ZZ",
      field: "first_representative_phone_number",
      width: 150,
      type: "string",
      editable: false,
      sortable: true,
      resizable: true,
    },
    {
      headerName: "Jméno druhého ZZ",
      field: "second_representative_name",
      width: 150,
      type: "string",
      editable: false,
      sortable: true,
      resizable: true,
    },
    {
      headerName: "Příjmení druhého ZZ",
      field: "second_representative_last_name",
      width: 150,
      type: "string",
      editable: false,
      sortable: true,
      resizable: true,
    },
    {
      headerName: "Telefon druhého ZZ",
      field: "second_representative_phone_number",
      width: 150,
      type: "string",
      editable: false,
      sortable: true,
      resizable: true,
    },
    {
      headerName: "Adresa - Jméno",
      field: "address_name",
      width: 150,
      type: "string",
      editable: false,
      sortable: true,
      resizable: true,
    },
    {
      headerName: "Adresa - Příjmení",
      field: "address_last_name",
      width: 150,
      type: "string",
      editable: false,
      sortable: true,
      resizable: true,
    },
    {
      headerName: "Adresa - Ulice, čp",
      field: "address_street_cp",
      width: 150,
      type: "string",
      editable: false,
      sortable: true,
      resizable: true,
    },
    {
      headerName: "Adresa - Obec",
      field: "address_city",
      width: 200,
      type: "string",
      editable: false,
      sortable: true,
      resizable: true,
    },
    {
      headerName: "Adresa - PSČ",
      field: "address_psc",
      width: 100,
      type: "string",
      editable: false,
      sortable: true,
      resizable: true,
    },
    {
      headerName: "Zdravotní omezení",
      field: "other_hendicap",
      width: 250,
      type: "string",
      editable: false,
      sortable: true,
      resizable: true,
    },
    {
      headerName: "Souhlasí s focením",
      field: "other_photos",
      width: 150,
      type: "boolean",
      editable: false,
      sortable: true,
      resizable: true,
    },
    {
      headerName: "Jak bude dítě docházet",
      field: "other_how_children_arrives_name",
      width: 270,
      type: "string",
      editable: false,
      sortable: true,
      resizable: true,
    },
    {
      headerName: "Osoby pro vyzvednutí",
      field: "other_pickup_person",
      width: 250,
      type: "string",
      editable: false,
      sortable: true,
      resizable: true,
    },
    {
      headerName: "Platební metoda",
      field: "other_pay_method_name",
      width: 180,
      type: "string",
      editable: false,
      sortable: true,
      resizable: true,
    },
    {
      headerName: "Další informace",
      field: "other_other_info",
      width: 250,
      type: "string",
      editable: false,
      sortable: true,
      resizable: true,
    },
    {
      headerName: "Velikost trika",
      field: "other_t_shirt_size",
      width: 150,
      type: "string",
      editable: false,
      sortable: true,
      resizable: true,
    },
    {
      headerName: "Datum registrace",
      field: "registration_date",
      width: 150,
      type: "string",
      editable: false,
      sortable: true,
      resizable: true,
      valueGetter: (params) => {
        return toAppDateFormat(params.value);
      },
    },
    {
      headerName: "Stav registrace",
      field: "state_name",
      width: 150,
      type: "string",
      editable: false,
      sortable: true,
      resizable: true,
    },
    {
      headerName: "Číslo objednávky",
      field: "variable_symbol_name",
      width: 150,
      type: "string",
      editable: false,
      sortable: true,
      resizable: true,
    },
    {
      headerName: "Cena [Kč]",
      field: "action_price",
      width: 100,
      type: "string",
      editable: false,
      sortable: true,
      resizable: true,
    },
  ];

  const handleOnClickEditRegistration = (rowId: GridRowId) => {
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

    XLSX.utils.book_append_sheet(workbook, worksheet, "Rezervace");

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
          exportBlob(blob, "Rezervace.xlsx");

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
      <RegistrationsTableStyled>
        <TableFilterDate />
        <Box className="grid-wrapper">
          <DataGrid
            apiRef={refApi}
            columns={columns}
            rows={dashboard.Registrations}
            getRowId={(row) => row.id}
            loading={isLoading}
            localeText={csCZ.components.MuiDataGrid.defaultProps.localeText}
            slots={{ toolbar: CustomToolbar }}
            initialState={
              Object.keys(gridInitialState).length > 0
                ? gridInitialState
                : initialState
            }
            pageSizeOptions={[25, 50, 75, 100]}
            onStateChange={handleOnStateChange}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
            }
          />
        </Box>
      </RegistrationsTableStyled>
      <EditRegistrationDialog
        open={dialogOpenData.open}
        setOpen={() => {
          setDialogOpenData({ id: 0, open: false });
        }}
        id={dialogOpenData.id}
      />
    </>
  );
};

export default RegistrationsTable;
