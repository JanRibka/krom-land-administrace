import { mapFromRegistrationsDTO } from "features/dashboard/save/mapFromRegistrationsDTO";
import { useSelector } from "react-redux";
import AppNotification from "shared/components/notification/AppNotification";
import { registrationsGrindName } from "shared/constants/gridNames";
import { useRequest } from "shared/dataAccess/useRequest";
import JsonResulObjectDataDTO from "shared/DTOs/JsonResulObjectDataDTO";
import RegistrationDTO from "shared/DTOs/RegistrationDTO";
import { toAppDateFormat } from "shared/helpers/dateTimeHelpers";
import { selectDashboard } from "shared/infrastructure/store/dashboard/dashboardSlice";
import { useDashboardSlice } from "shared/infrastructure/store/dashboard/useDashboardSlice";

import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/system/Box";
import {
  csCZ,
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridColumnGroupingModel,
  GridRowId,
  GridRowParams,
  GridToolbar,
  useGridApiRef,
} from "@mui/x-data-grid";
import { GridInitialStateCommunity } from "@mui/x-data-grid/models/gridStateCommunity";

import RegistrationsTableStyled from "./styledComponents/RegistrationsTableStyled";
import TableFilterDate, {
  IGridSettingsDateFilter,
} from "./tableFilterDate/TableFilterDate";

const RegistrationsTable = () => {
  // References
  const refApi = useGridApiRef();

  // Constants
  const gridSettingsName = "_grid-settings-" + registrationsGrindName;
  const gridInitialState = JSON.parse(
    localStorage.getItem(gridSettingsName) ?? "{}"
  );
  // Constants
  const gridSettingsDateFilterName =
    "_grid-settings-date-filter-" + registrationsGrindName;
  const gridSettingsDateFilter = JSON.parse(
    localStorage.getItem(gridSettingsDateFilterName) ?? "{}"
  );
  const gridDateFilter: IGridSettingsDateFilter =
    Object.keys(gridSettingsDateFilter).length > 0
      ? (gridSettingsDateFilter as IGridSettingsDateFilter)
      : ({ from: null, to: null } as IGridSettingsDateFilter);

  // Store
  const dashboard = useSelector(selectDashboard);

  // Constants
  const { handleDashboardUpdate } = useDashboardSlice();

  // Other
  // useEffect(() => {
  //   console.log(refApi.current.state);
  //   console.log(
  //     gridPaginationModelSelector(
  //       refApi.current.state,
  //       refApi.current.instanceId
  //     )
  //   );
  //   console.log(
  //     gridFilterableColumnLookupSelector(
  //       refApi.current.state,
  //       refApi.current.instanceId
  //     )
  //   );
  //   console.log(refApi.current.exportState());
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [refApi.current]);

  const handleOnClickEditRegistration = (id: GridRowId) => {
    // const stitekEmlpty: StitekModel = {
    //   IdStitek: null,
    //   TypKod: "",
    //   Poznamka: "",
    //   ZdaVerejny: false,
    //   ZdaDeleted: false,
    //   _Id: uuidv4(),
    // };
    // const newStitek = prehledSmluv.Stitky.find((f) => f._Id === id);
    // handleStitekEditUpdate(!!newStitek ? newStitek : stitekEmlpty);
    // handlePrehledSmluvUpdate({ _ZdaStitekEdit: true });
  };

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
    [],
    {
      apply: true,
      condition: () => dashboard._registrationsLoaded === false,
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

    {
      field: "actions",
      type: "actions",
      width: 50,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          icon={
            <EditIcon color='secondary' titleAccess='Editovat registraci' />
          }
          label='Editovat registraci'
          onClick={() => handleOnClickEditRegistration(params.id)}
        />,
      ],
    },
  ];

  const handleOnStateChange = () => {
    const newState: GridInitialStateCommunity = refApi.current.exportState();

    localStorage.setItem(gridSettingsName, JSON.stringify(newState));
  };

  return (
    <RegistrationsTableStyled>
      <TableFilterDate />
      <Box className='grid-wrapper'>
        <DataGrid
          apiRef={refApi}
          columns={columns}
          rows={dashboard.Registrations}
          getRowId={(row) => row.id}
          loading={isLoading}
          localeText={csCZ.components.MuiDataGrid.defaultProps.localeText}
          slots={{ toolbar: GridToolbar }}
          initialState={
            Object.keys(gridInitialState).length > 0
              ? gridInitialState
              : undefined
          }
          pageSizeOptions={[25, 50, 75, 100]}
          onStateChange={handleOnStateChange}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
          }
        />
      </Box>
    </RegistrationsTableStyled>
  );
};

export default RegistrationsTable;
