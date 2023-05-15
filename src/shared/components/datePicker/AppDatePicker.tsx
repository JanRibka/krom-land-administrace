import 'dayjs/locale/cs';

import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect } from 'react';
import { addTimeZoneOffset } from 'shared/helpers/dateTimeHelpers';

import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import AppDatePickerStyled from './styledComponents/AppDatePickerStyled';

interface IProps {
  label: string;
  value: Date | null;
  name: string;
  error?: boolean;
  helperText?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  autoComplete?: "off";
  onChange: (
    name: string,
    date: Date | null,
    keyboardInputValue?: string
  ) => void;
}

const AppDatePicker = (props: IProps) => {
  const [value, setValue] = React.useState<Dayjs | null>(null);

  useEffect(() => {
    setValue(dayjs(props.value));
  }, [props.value]);

  const handleOnBlur = (
    e: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement, Element>
  ) => {
    console.log(value);
    if (!value) return;
    props.onChange(props.name, value?.toDate());
  };

  const handleOnAccept = (val: unknown) => {
    const newValue = val as Dayjs;
    console.log(newValue);
    if (!newValue) return;

    props.onChange(props.name, newValue?.toDate());
  };

  const handleOnChange = (val: unknown) => {
    const newValue = val as Dayjs;
    let date = newValue?.toDate();
    console.log(date);
    // date = addTimeZoneOffset(date);
    setValue(dayjs(date));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='cs'>
      {/* <DemoContainer components={["DatePicker"]}> */}
      <AppDatePickerStyled
        label={props.label}
        minDate={dayjs("1901-01-01")}
        maxDate={dayjs("2099-12-31")}
        value={value}
        disabled={props.disabled}
        onChange={handleOnChange}
        onAccept={handleOnAccept}
        slotProps={{
          textField: {
            helperText: props.helperText,
            onBlur: handleOnBlur,
            autoComplete: props.autoComplete,
          },
        }}
        // renderInput={(params: any) => {
        //   const newParams = {
        //     ...params,
        //     error: props.error,
        //   };

        //   return (
        //     <TextField
        //       fullWidth
        //       helperText={props.helperText}
        //       required={props.required}
        //       disabled={props.disabled}
        //       onBlur={handleOnBlur}
        //       autoComplete={props.autoComplete}
        //       {...newParams}
        //     />
        //   );
        // }}
      />
      {/* </DemoContainer> */}
    </LocalizationProvider>
  );
};

export default AppDatePicker;
