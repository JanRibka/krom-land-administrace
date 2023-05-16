import React from 'react';
import AppDatePicker from 'shared/components/datePicker/AppDatePicker';

import Stack from '@mui/system/Stack';

import TableFilterDateStyled from './styledComponents/TableFilterDateStyled';

const TableFilterDate = () => {
  const [value, setValue] = React.useState<Date | null>(new Date("2022-04-17"));
  console.log(value);
  return (
    <TableFilterDateStyled>
      <Stack direction='row' spacing={2}>
        <AppDatePicker
          name=''
          label='Datum od'
          value={value}
          onChange={(name, val) => setValue(val)}
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
