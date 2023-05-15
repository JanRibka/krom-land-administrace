import AppDatePicker from "shared/components/datePicker/AppDatePicker";

import Stack from "@mui/system/Stack";

import TableFilterDateStyled from "./styledComponents/TableFilterDateStyled";

const TableFilterDate = () => {
  return (
    <TableFilterDateStyled>
      <Stack direction='row' spacing={2}>
        <AppDatePicker
          name=''
          label='Datu od'
          value={new Date()}
          onChange={() => {}}
        />
        <AppDatePicker
          name=''
          label='Datum do'
          value={new Date()}
          onChange={() => {}}
        />
      </Stack>
    </TableFilterDateStyled>
  );
};

export default TableFilterDate;
