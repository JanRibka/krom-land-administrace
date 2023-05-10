import { useSelector } from "react-redux";
import { selectDashboard } from "shared/infrastructure/store/dashboard/dashboardSlice";

import EditIcon from "@mui/icons-material/Edit";
import {
  csCZ,
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
  GridRowParams,
} from "@mui/x-data-grid";

import ReservationsTableStyled from "./styledComponents/ReservationsTableStyled";

interface IProps {
  loading: boolean;
}

const ReservationsTable = (props: IProps) => {
  // Store
  const dashboard = useSelector(selectDashboard);

  // Other
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
      field: "ff",
      headerName: "sd",
      width: 50,
      type: "string",
      editable: false,
      sortable: true,
    },
    {
      field: "asfd",
      headerName: "fff",
      width: 50,
      // flex: 1,
      type: "string",
      editable: false,
      sortable: true,
    },
    {
      field: "actions",
      type: "actions",
      width: 50,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          icon={<EditIcon color='secondary' />}
          label='Editovat registraci'
          onClick={() => handleOnClickEditRegistration(params.id)}
        />,
      ],
    },
  ];

  return (
    <ReservationsTableStyled>
      <DataGrid
        columns={columns}
        rows={dashboard.Reservations}
        loading={props.loading}
        localeText={csCZ.components.MuiDataGrid.defaultProps.localeText}
      />
    </ReservationsTableStyled>
  );
};

export default ReservationsTable;
