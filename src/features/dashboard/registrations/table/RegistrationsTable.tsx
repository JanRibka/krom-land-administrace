import { useSelector } from "react-redux";
import { registrationsGrindName } from "shared/constants/gridNames";
import { selectDashboard } from "shared/infrastructure/store/dashboard/dashboardSlice";

import EditIcon from "@mui/icons-material/Edit";
import {
  csCZ,
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
  GridRowParams,
  GridToolbar,
  useGridApiRef,
} from "@mui/x-data-grid";
import { GridInitialStateCommunity } from "@mui/x-data-grid/models/gridStateCommunity";

import RegistrationsTableStyled from "./styledComponents/RegistrationsTableStyled";

interface IProps {
  loading: boolean;
}

const RegistrationsTable = (props: IProps) => {
  // References
  const refApi = useGridApiRef();

  // Constants
  const gridSettingsName = "_grid-settings-" + registrationsGrindName;
  const gridInitialState = JSON.parse(
    localStorage.getItem(gridSettingsName) ?? "{}"
  );
  console.log(gridInitialState);
  // Store
  const dashboard = useSelector(selectDashboard);

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
      width: 200,
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
    // {
    //   headerName: "Jměno ZZ",
    //   field: "other_how_children_arrives",
    //   width: 100,
    //   type: "string",
    //   editable: false,
    //   sortable: true,
    //   resizable: true,
    // },
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
      field: "other_pay_method",
      width: 120,
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
    },
    // {
    //   headerName: "Stav registrace",
    //   field: "state",
    //   width: 100,
    //   type: "string",
    //   editable: false,
    //   sortable: true,
    //   resizable: true,
    // },
    // {
    //   headerName: "Jměno ZZ",
    //   field: "user_email",
    //   width: 100,
    //   type: "string",
    //   editable: false,
    //   sortable: true,
    //   resizable: true,
    // },
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
      <DataGrid
        apiRef={refApi}
        columns={columns}
        rows={dashboard.Registrations}
        getRowId={(row) => row.id}
        loading={props.loading}
        localeText={csCZ.components.MuiDataGrid.defaultProps.localeText}
        slots={{ toolbar: GridToolbar }}
        initialState={
          Object.keys(gridInitialState).length > 0
            ? gridInitialState
            : undefined
        }
        pageSizeOptions={[25, 50, 75, 100]}
        onStateChange={handleOnStateChange}
      />
    </RegistrationsTableStyled>
  );
};

export default RegistrationsTable;
